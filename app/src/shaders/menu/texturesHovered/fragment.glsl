varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uOpacity;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
  gl_FragColor.a = uOpacity;
}