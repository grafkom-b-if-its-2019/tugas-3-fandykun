precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform mat4 projection;
uniform mat4 view;
uniform float scale;
uniform vec3 trans;
uniform float middleX;

void main() {
  fColor = vColor;
  mat4 translate = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0         // Kita geser setiap verteks sejau 2 unit menjauhi kamera, untuk memastikan seluruh bagian kubus ada di antara near dan far.
  );

  mat4 translateObject = mat4(
    1.0, 0.0, 0.0, 0.325 + trans.x,
    0.0, 1.0, 0.0, trans.y,
    0.0, 0.0, 1.0, trans.z,
    0.0, 0.0, 0.0, 1.0
  );

  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);

  mat4 rx = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 skalasi = mat4(
    scale * 0.6, 0.0, 0.0, (- middleX * scale + middleX) * 0.6,
    0.0, 0.6, 0.0, 0.0,
    0.0, 0.0, 0.6, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * translateObject * skalasi;
  gl_Position = projection * view * translate * gl_Position;
}
