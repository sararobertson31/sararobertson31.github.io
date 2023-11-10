import { useCallback, useEffect, useState } from "react";
import computeShaders from "./shaders/compute-stars.wgsl?raw";
import renderShaders from "./shaders/render.wgsl?raw";
import { Texture } from "./texture";

interface StarProps {
  nStars: number;
}

const Stars = (props: StarProps) => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gpuInfo, setGpuInfo] = useState<any>(null);
  const [animationResources, setAnimationResources] = useState<any>(null);

  const starCoords = new Float32Array([
    // 1, 0, 1, 1, 0, 1,

    // 0, 1, 1, 0, 0, 0,
    0, 0.5, 0.5, 0.75, 0.5, 0.25,

    0.5, 0.75, 0.5, 0.25, 1, 0.5,

    0.5, 0, 0.75, 0.5, 0.25, 0.5,

    0.75, 0.5, 0.25, 0.5, 0.5, 1,
  ]);
  const nStarBytes =
    2 * 4 + // pos
    1 * 4 + // brightness
    1 * 4; // size
  const createAnimationResources = useCallback(
    async (device: any, format: any, canvas: HTMLCanvasElement) => {
      // init stars list and create buffer for them.
      const starBuffer = device.createBuffer({
        size: props.nStars * nStarBytes,
        usage:
          GPUBufferUsage.VERTEX |
          GPUBufferUsage.STORAGE |
          GPUBufferUsage.COPY_DST,
      });
      const stars = new Float32Array((props.nStars * nStarBytes) / 4);
      for (let i = 0; i < stars.length; ++i) {
        switch (i % (nStarBytes / 4)) {
          // pos
          case 0:
          case 1:
            stars[i] = Math.random() * 2 - 1;
            break;
          // brightness
          case 2:
            stars[i] = Math.random() / 2 + 0.5;
            break;
          // size
          case 3:
            stars[i] = (Math.random() + 1) * 10;
            break;
        }
      }
      device.queue.writeBuffer(starBuffer, 0, stars);

      // create layout for binding star buffer to render pipeline
      const bindGroupLayout = device.createBindGroupLayout({
        label: "Render Bind Group Layout",
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.VERTEX,
            buffer: {},
          },
        ],
      });
      const pipelineLayout = device.createPipelineLayout({
        label: "render pipeline layout",
        bindGroupLayouts: [bindGroupLayout],
      });
      const renderPipeline = device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: {
          module: device.createShaderModule({
            code: renderShaders,
          }),
          entryPoint: "vs_main",
          buffers: [
            {
              // instanced particles buffer
              arrayStride: nStarBytes,
              stepMode: "instance",
              attributes: [
                {
                  // position
                  shaderLocation: 0,
                  offset: 0,
                  format: "float32x2",
                },
                {
                  //brightness
                  shaderLocation: 1,
                  offset: 4 * 2,
                  format: "float32",
                },
                {
                  //size
                  shaderLocation: 2,
                  offset: 4 * 3,
                  format: "float32",
                },
              ],
            },
            {
              // quad vertex buffer
              arrayStride: 2 * 4, // vec2<f32>
              stepMode: "vertex",
              attributes: [
                {
                  // vertex positions
                  shaderLocation: 3,
                  offset: 0,
                  format: "float32x2",
                },
              ],
            },
          ],
        },
        fragment: {
          module: device.createShaderModule({
            code: renderShaders,
          }),
          entryPoint: "fs_main",
          targets: [
            {
              format: format,
              blend: {
                color: {
                  srcFactor: "src-alpha",
                  dstFactor: "one",
                  operation: "add",
                },
                alpha: {
                  srcFactor: "zero",
                  dstFactor: "one",
                  operation: "add",
                },
              },
            },
            {
              format: format,
              blend: {
                color: {
                  srcFactor: "src-alpha",
                  dstFactor: "one",
                  operation: "add",
                },
                alpha: {
                  srcFactor: "zero",
                  dstFactor: "one",
                  operation: "add",
                },
              },
            },
          ],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

      // create uniforms for render pipeline
      const pageSizeUniformBuffer = device.createBuffer({
        size: 2 * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(
        pageSizeUniformBuffer,
        0,
        new Float32Array([canvas.offsetWidth ?? 0, canvas.offsetHeight ?? 0])
      );
      const pageSizeUniformBindGroup = device.createBindGroup({
        layout: renderPipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: {
              buffer: pageSizeUniformBuffer,
            },
          },
        ],
      });

      const computePipeline = device.createComputePipeline({
        layout: "auto",
        compute: {
          module: device.createShaderModule({
            code: computeShaders,
          }),
          entryPoint: "simulate_step",
        },
      });
      const computeBindGroup = device.createBindGroup({
        layout: computePipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: {
              buffer: starBuffer,
              offset: 0,
              size: stars.byteLength,
            },
          },
        ],
      });

      const vertexBuffer = device.createBuffer({
        size: starCoords.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(vertexBuffer, 0, starCoords);

      const destinationTexture = await Texture.createEmptyTexture(
        device,
        canvas.width,
        canvas.height,
        format,
        "destination_texture1"
      );
      const destinationTexture2 = await Texture.createEmptyTexture(
        device,
        canvas.width,
        canvas.height,
        format,
        "destination_texture2"
      );

      setAnimationResources({
        computePipeline,
        computeBindGroup,
        renderPipeline,
        pageSizeUniformBindGroup,
        starBuffer,
        vertexBuffer,
        destinationTexture,
        destinationTexture2,
      });
    },
    []
  );

  const init = useCallback(async (canvas: HTMLCanvasElement) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    if (!navigator.gpu) {
      throw new Error("WebGPU not supported on this browser.");
    }
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("No appropriate GPUAdapter found.");
    }
    const device: GPUAdapter = await adapter.requestDevice();
    const context = canvas.getContext("webgpu");
    if (!context) {
      throw new Error("Can't create context");
    }
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format,
    });
    await createAnimationResources(device, format, canvas);
    setGpuInfo({
      device,
      format,
      context,
      adapter,
    });
    // requestAnimationFrame(() => frame(gpuInfo, animationResources));
  }, []);

  const frame = () => {
    const { device, context } = gpuInfo;
    const {
      computePipeline,
      computeBindGroup,
      renderPipeline,
      pageSizeUniformBindGroup,
      starBuffer,
      vertexBuffer,
      destinationTexture,
      destinationTexture2,
    } = animationResources;

    const commandEncoder = device.createCommandEncoder();
    // simulation
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(computePipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(props.nStars / 64));
      passEncoder.end();
    }
    // create scene
    {
      const textureView =
        destinationTexture?.getCurrentTexture().createView() ??
        context.getCurrentTexture().createView();
      const textureView2 =
        destinationTexture2?.getCurrentTexture().createView() ??
        context.getCurrentTexture().createView();
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: textureView,
            loadOp: "clear",
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
          },
          {
            view: textureView2,
            loadOp: "clear",
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
          },
        ],
      });
      passEncoder.setPipeline(renderPipeline);
      passEncoder.setBindGroup(0, pageSizeUniformBindGroup);
      passEncoder.setVertexBuffer(0, starBuffer);
      passEncoder.setVertexBuffer(1, vertexBuffer);
      passEncoder.draw(starCoords.length / 2, props.nStars);
      passEncoder.end();
    }

    device.queue.submit([commandEncoder.finish()]);

    requestAnimationFrame(frame);
  };

  useEffect(() => {
    if (gpuInfo && animationResources) {
      frame();
    }
  }, [gpuInfo, animationResources]);

  return (
    <canvas
      ref={init}
      style={{ width: "100vw", height: "100vh", position: "fixed" }}
    />
  );
};

export default Stars;
