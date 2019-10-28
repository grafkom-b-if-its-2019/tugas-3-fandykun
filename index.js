(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
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

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
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

    gl.useProgram(program);

    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

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
    }

    document.addEventListener('keypress', onKeyPress);

    function render() {
      
      theta[axis] += 0.5;
      gl.uniform3fv(thetaLoc, theta);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      gl.drawArrays(gl.LINES, 0, 48);
      requestAnimationFrame(render); 
    }
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();
  }

})();
