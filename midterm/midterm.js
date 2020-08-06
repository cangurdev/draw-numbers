var canvas;
var gl;

var bufferNum1, bufferNum2, num1Vertices, num2Vertices;
var vPosition;
var transformationMatrix, transformationMatrixLoc;

var colorLoc;
var transformationX = 0,
  transformationY = 0,
  rotation = 0,
  scaleX = 1,
  scaleY = 1;

var red = 1, green = 0, blue = 0;
var number = 16;
var numbers;


window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  num1Vertices = [
    vec2(0.05, 0.25), // v0
    vec2(0.15, 0.25), // v1
    vec2(0.25, 0.25), // v2
    vec2(0.35, 0.25), // v3

    vec2(0.05, 0.15), // v4
    vec2(0.15, 0.15), // v5
    vec2(0.25, 0.15), // v6
    vec2(0.35, 0.15), // v7

    vec2(0.05, 0.05), // v8
    vec2(0.15, 0.05), // v9
    vec2(0.25, 0.05), // v10
    vec2(0.35, 0.05), // v11

    vec2(0.05, -0.05), // v12
    vec2(0.15, -0.05), // v13
    vec2(0.25, -0.05), // v14
    vec2(0.35, -0.05), // v15

    vec2(0.05, -0.15), // v16
    vec2(0.15, -0.15), // v17
    vec2(0.25, -0.15), // v18
    vec2(0.35, -0.15), // v19

    vec2(0.05, -0.25), // v20
    vec2(0.15, -0.25), // v21
    vec2(0.25, -0.25), // v22
    vec2(0.35, -0.25), // v23
  ];
  num2Vertices = [
    vec2(-0.35, 0.25), // v0
    vec2(-0.25, 0.25), // v1
    vec2(-0.15, 0.25), // v2
    vec2(-0.05, 0.25), // v3

    vec2(-0.35, 0.15), // v4
    vec2(-0.25, 0.15), // v5
    vec2(-0.15, 0.15), // v6
    vec2(-0.05, 0.15), // v7

    vec2(-0.35, 0.05), // v8
    vec2(-0.25, 0.05), // v9
    vec2(-0.15, 0.05), // v10
    vec2(-0.05, 0.05), // v11

    vec2(-0.35, -0.05), // v12
    vec2(-0.25, -0.05), // v13
    vec2(-0.15, -0.05), // v14
    vec2(-0.05, -0.05), // v15

    vec2(-0.35, -0.15), // v16
    vec2(-0.25, -0.15), // v17
    vec2(-0.15, -0.15), // v18
    vec2(-0.05, -0.15), // v19

    vec2(-0.35, -0.25), // v20
    vec2(-0.25, -0.25), // v21
    vec2(-0.15, -0.25), // v22
    vec2(-0.05, -0.25), // v23
  ];

  indices = [
    0, 20, 1, 20, 21, 1, 2, 22, 3, 22, 23, 3, 1, 5, 2, 5, 6, 2, 17, 21, 18, 21, 22, 18, //0
    2, 22, 3, 22, 23, 3, //1 
    0, 4, 3, 4, 7, 3, 8, 12, 11, 12, 15, 11, 16, 20, 19, 20, 23, 19, 6, 10, 7, 10, 11, 7, 12, 16, 13, 16, 17, 13, //2
    0, 4, 2, 4, 6, 2, 2, 22, 3, 22, 23, 3, 8, 12, 10, 12, 14, 10, 16, 20, 18, 20, 22, 18, //3
    0, 12, 1, 12, 13, 1, 9, 13, 10, 13, 14, 10, 2, 22, 3, 22, 23, 3, //4
    0, 4, 3, 4, 7, 3, 8, 12, 11, 12, 15, 11, 16, 20, 19, 20, 23, 19, 4, 8, 5, 8, 9, 5, 14, 18, 15, 18, 19, 15, //5
    0, 20, 1, 20, 21, 1, 9, 13, 11, 13, 15, 11, 17, 21, 19, 21, 23, 19, 14, 18, 15, 18, 19, 15, //6
    0, 4, 3, 4, 7, 3, 2, 22, 3, 22, 23, 3, //7
    0, 20, 1, 20, 21, 1, 2, 22, 3, 22, 23, 3, 1, 5, 2, 5, 6, 2, 17, 21, 18, 21, 22, 18, 9, 13, 10, 13, 14, 10, // 8
    0, 4, 2, 4, 6, 2, 2, 22, 3, 22, 23, 3, 4, 12, 5, 12, 13, 5, 9, 13, 10, 13, 14, 10, 16, 20, 18, 20, 22, 18 // 9
  ];
  //numbers[i][0] --> length of index 
  //numbers[i][1] --> offset of index
  numbers = [[24, 0], [6, 24], [30, 30], [24, 60], [18, 84], [30, 102], [24, 132], [12, 156], [30, 168], [30, 198]]

  //index buffer
  var iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint8Array(indices),
    gl.STATIC_DRAW
  );

  // Load the data into the GPU
  bufferNum1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum1);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(num1Vertices), gl.STATIC_DRAW);

  // Load the data into the GPU
  bufferNum2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferNum2);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(num2Vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  transformationMatrixLoc = gl.getUniformLocation(
    program,
    "transformationMatrix"
  );

  document.getElementById("inp_number").oninput = function (event) {
    number = event.srcElement.value;
  };
  document.getElementById("inp_objX").oninput = function (event) {
    transformationX = event.srcElement.value;
  };
  document.getElementById("inp_objY").oninput = function (event) {
    transformationY = event.srcElement.value;
  };
  document.getElementById("inp_obj_scaleX").oninput = function (event) {
    scaleX = event.srcElement.value;
  };
  document.getElementById("inp_obj_scaleY").oninput = function (event) {
    scaleY = event.srcElement.value;
  };
  document.getElementById("inp_rotation").oninput = function (event) {
    rotation = event.srcElement.value;
  };
  document.getElementById("redSlider").oninput = function (event) {
    red = event.srcElement.value;
  };
  document.getElementById("greenSlider").oninput = function (event) {
    green = event.srcElement.value;
  };
  document.getElementById("blueSlider").oninput = function (event) {
    blue = event.srcElement.value;
  };
  colorLoc = gl.getUniformLocation(program, "color");
  render();
};
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  transformationMatrix = mat4();
  transformationMatrix = mult(
    transformationMatrix,
    translate(transformationX, transformationY, 0)
  );
  transformationMatrix = mult(transformationMatrix, rotate(rotation, 0, 0, 1));
  transformationMatrix = mult(transformationMatrix, scalem(scaleX, scaleY, 0));

  gl.uniformMatrix4fv(
    transformationMatrixLoc,
    false,
    flatten(transformationMatrix)
  );
  gl.uniform4fv(
    colorLoc,
    vec4(red, green, blue, 1.0)
  );

	rightDigit = number % 10;
	leftDigit = (number - rightDigit)/10;
	
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.drawElements(gl.TRIANGLES, numbers[rightDigit][0], gl.UNSIGNED_BYTE, numbers[rightDigit][1]);
	
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.drawElements(gl.TRIANGLES, numbers[leftDigit][0], gl.UNSIGNED_BYTE, numbers[leftDigit][1]);

  window.requestAnimFrame(render);
}
