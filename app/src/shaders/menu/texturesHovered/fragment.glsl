varying vec2 vUv;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float uOpacity;
uniform float progress;

void main() {

  vec3 img1 = texture2D(uTexture1, vUv).xyz;
  vec3 img2 = texture2D(uTexture2, vUv).xyz;

  vec3 color = mix(img1, img2, progress);
  gl_FragColor = vec4(color, uOpacity);

  // vec4 textureColor = texture2D(uTexture1, vUv);
  // gl_FragColor = textureColor;
  // gl_FragColor.a = uOpacity;
}