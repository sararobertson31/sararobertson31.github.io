struct RenderParams {
  right: f32,
  up: f32,
}

@binding(0) @group(0) var<uniform> render_params : RenderParams;

struct VertexInput {
  @location(0) star_position : vec2<f32>,
  @location(1) brightness : f32,
  @location(2) size : f32,
  @location(3) vertex : vec2<f32>, // -1..+1
}

struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0) brightness: f32,
}

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var position = in.star_position.xy + in.vertex.xy / vec2f(render_params.right, render_params.up) * in.size;

  var out : VertexOutput;
  out.position = vec4(position, 0, 1);
  out.brightness = in.brightness;
  return out;
}


// FRAGMENT
@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4<f32> {
  return vec4f(in.brightness);
}