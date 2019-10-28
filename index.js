(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);
  var programCube, programName;
  var thetaValue = 0.5;
  var theta = [0.0, 0.0, 0.0];
  var xAxis = 0;
  var yAxis = 1;
  var zAxis = 2;
  var axis = yAxis;
  var scale = 1.0, scaler = -0.0118;
  var x = 0.0, y = 0.0, z = 0.0;
  var trans   = new Float32Array([0.01, 0.01, 0.005]);

  function main() {
    // Inisialisasi shaders dan program untuk cube
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    programCube = glUtils.createProgram(gl, vertexShader, fragmentShader);

    // Inisialisasi shaders dan program untuk huruf depan
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    programName = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    render();
  }

  function render() {
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Bersihkan buffer canvas

    // Cube
    gl.useProgram(programCube);
    initCube();
    gl.drawArrays(gl.LINES, 0, 48);

    // frontName
    gl.useProgram(programName);
    initName();
    theta[axis] += thetaValue;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);

    requestAnimationFrame(render); 
  }

  //==========================CUBE==================
  function initCube() {
    // Definisi verteks dan buffer
    /* 
      A (-0.5, -0.5,  0.5)
      B (-0.5,  0.5,  0.5)
      C ( 0.5,  0.5,  0.5)
      D ( 0.5, -0.5,  0.5)
      E (-0.5, -0.5, -0.5)
      F (-0.5,  0.5, -0.5)
      G ( 0.5,  0.5, -0.5)
      H ( 0.5, -0.5, -0.5)
    */
    var cubeVertices = [
      // x, y, z            r, g, b
      -0.5,  0.5,  0.5,   1.0, 0.0, 0.0,  // Depan (BAD-BDC) Merah
      -0.5, -0.5,  0.5,   1.0, 0.0, 0.0,
      0.5, -0.5,  0.5,   1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,   1.0, 0.0, 0.0,
      0.5, -0.5,  0.5,   1.0, 0.0, 0.0,
      0.5,  0.5,  0.5,   1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,   1.0, 0.0, 0.0,
      0.5,  0.5,  0.5,   1.0, 0.0, 0.0,

      0.5,  0.5,  0.5,   0.0, 1.0, 0.0, // Kanan (CDH-CHG) Hijau
      0.5, -0.5,  0.5,   0.0, 1.0, 0.0,
      0.5, -0.5, -0.5,   0.0, 1.0, 0.0,
      0.5, -0.5,  0.5,   0.0, 1.0, 0.0,
      0.5, -0.5, -0.5,   0.0, 1.0, 0.0,
      0.5,  0.5, -0.5,   0.0, 1.0, 0.0,
      0.5,  0.5,  0.5,   0.0, 1.0, 0.0,
      0.5,  0.5, -0.5,   0.0, 1.0, 0.0,

      0.5, -0.5,  0.5,   0.0, 0.0, 1.0, // Bawah (DAE-DEH) Biru
      -0.5, -0.5,  0.5,   0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 0.0, 1.0,
      -0.5, -0.5,  0.5,   0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 0.0, 1.0,
      0.5, -0.5, -0.5,   0.0, 0.0, 1.0,
      0.5, -0.5,  0.5,   0.0, 0.0, 1.0,
      0.5, -0.5, -0.5,   0.0, 0.0, 1.0,
      
      -0.5, -0.5, -0.5,   1.0, 1.0, 0.0, // Belakang (EFG-EGH) Kuning
      -0.5,  0.5, -0.5,   1.0, 1.0, 0.0,
      0.5,  0.5, -0.5,   1.0, 1.0, 0.0,
      -0.5,  0.5, -0.5,   1.0, 1.0, 0.0,
      0.5,  0.5, -0.5,   1.0, 1.0, 0.0,
      0.5, -0.5, -0.5,   1.0, 1.0, 0.0,
      -0.5, -0.5, -0.5,   1.0, 1.0, 0.0,
      0.5, -0.5, -0.5,   1.0, 1.0, 0.0,
      
      -0.5,  0.5, -0.5,   0.0, 1.0, 1.0, // Kiri (FEA-FAB) Cyan
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5,  0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5,  0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5,  0.5,  0.5,   0.0, 1.0, 1.0,

      0.5,  0.5, -0.5,   1.0, 0.0, 1.0, // Atas (GFB-GBC) Magenta
      -0.5,  0.5, -0.5,   1.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,   1.0, 0.0, 1.0,
      -0.5,  0.5, -0.5,   1.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,   1.0, 0.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 0.0, 1.0,
      0.5,  0.5, -0.5,   1.0, 0.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 0.0, 1.0,
    ];

    var cubeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(programCube, 'vPosition');
    var vColor = gl.getAttribLocation(programCube, 'vColor');
    var thetaLoc = gl.getUniformLocation(programCube, 'theta');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    // Definisi view dan projection
    var vmLoc = gl.getUniformLocation(programCube, 'view');
    var pmLoc = gl.getUniformLocation(programCube, 'projection');
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.75),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);
  }
//==========================================================================================================


  function initName() {
    randomize = Math.random();
    nameVertices = new Float32Array([
      0.55, 0.4, randomize, randomize, randomize,
      0.47, 0.28, randomize, randomize, randomize,
      0.1, 0.4, randomize, randomize, randomize,
      0.2, 0.28, randomize, randomize, randomize,
      0.1, -0.4, randomize, randomize, randomize,
      0.2, -0.4, randomize, randomize, randomize,
      0.2, -0.4, randomize, randomize, randomize,
      0.2, 0.1, randomize, randomize, randomize,
      0.2, 0.1, randomize, randomize, randomize,
      0.55, 0.1, randomize, randomize, randomize,
      0.2, -0.02, randomize, randomize, randomize,
      0.55, -0.02, randomize, randomize, randomize,
    ]);

    var nameVBO = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, nameVBO);
    gl.bufferData(gl.ARRAY_BUFFER, nameVertices, gl.STATIC_DRAW);

    //get attribute aposition
    var vPosition = gl.getAttribLocation(programName, 'vPosition');
    var vColor = gl.getAttribLocation(programName, 'vColor');
    var thetaLoc = gl.getUniformLocation(programName, 'theta');
    var scaleLoc = gl.getUniformLocation(programName, 'scale');
    var transLoc = gl.getUniformLocation(programName, 'trans');
    var midXLoc = gl.getUniformLocation(programName, 'middleX');

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    //Enable assignment to aPosition variable
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.uniform3fv(thetaLoc, theta);

    // Definisi view dan projection
    var vmLoc = gl.getUniformLocation(programName, 'view');
    var pmLoc = gl.getUniformLocation(programName, 'projection');
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, -0.75),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

    if(scale> 1 || scale<-1) scaler *= -1;
    scale += scaler;
      
    r_border = 0.5 - 0.225 * Math.abs(scale);
    l_border = -0.1 + 0.225 * Math.abs(scale);

    if(x >= r_border) trans[0] = -0.005;
    else if(x <= l_border) trans[0] = 0.005;
    
    if(y >= 0.4 || y <= -0.4) trans[1] *= -1;
    if(z >= 0.4 || z <= -0.4) trans[2] *= -1;
    x += trans[0];
    y += trans[1];
    z += trans[2];

    var midX = -0.05 + trans[0];

    gl.uniform3fv(transLoc, [x, y, z]);
    gl.uniform1f(scaleLoc, scale);
    gl.uniform1f(midXLoc, midX);

  }

  function onKeyPress(event) {
    if(event.keyCode == 88 || event.keyCode == 120) {
      axis = xAxis;
    }
    else if(event.keyCode == 89 || event.keyCode == 121) {
      axis = yAxis;
    }
    else if(event.keyCode == 90 || event.keyCode == 122) {
      axis = zAxis;
    }
    else if(event.keyCode == 83 || event.keyCode == 115) {
      thetaValue = 0.0;
    }
    else if(event.keyCode == 32) {
      thetaValue = 0.5;
    }
  }

  document.addEventListener('keypress', onKeyPress);
})();
