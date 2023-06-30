const gl = document.getElementById("canvas").getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, [
  "vertexShader",
  "fragmentShader"
]);

const textures = twgl.createTextures(gl, {
  gradient: {
    src:
      "./gradient.png"
  }
});

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

let mouseX = 0,
  mouseY = 0;

document.getElementById("canvas").addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function render(time) {
  //Paints only 25% pixels in the screen space,
  //Slightly lower resolution but much better performance!
  //See also: the zoom feature of https://glslsandbox.com/

  twgl.resizeCanvasToDisplaySize(gl.canvas, 0.5);

  //Paints 4x the number of pixels.
  //Very computationally expensive in full screen on desktop devices
  //twgl.resizeCanvasToDisplaySize(gl.canvas, 1.0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    u_time: time * 0.002,
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mouse: [mouseX, mouseY],
    u_gradient: textures.gradient
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);