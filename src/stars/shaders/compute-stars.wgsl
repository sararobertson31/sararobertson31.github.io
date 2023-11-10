struct Star {
  position : vec2<f32>,
  brightness : f32,
  size : f32,
}

struct Stars {
  stars: array<Star>
}


@binding(0) @group(0) var<storage, read_write> data : Stars;

@compute @workgroup_size(64)
fn simulate_step(@builtin(global_invocation_id) global_invocation_id: vec3<u32>) {
  let idx = global_invocation_id.x;
  var particle = data.stars[idx];
}
