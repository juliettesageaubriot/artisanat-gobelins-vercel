uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
  gl_FragColor.r = 1.0;
  gl_FragColor.a = 0.5;
}
