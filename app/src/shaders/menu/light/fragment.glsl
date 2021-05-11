varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 fresnelColor;
uniform vec3 baseColor;
uniform float powerOfFactor;
uniform vec3 cameraPositionModel;
uniform float alpha;

void main() {
  vec3 viewDirection = normalize(cameraPositionModel - vec3(vPosition.x, vPosition.y, vPosition.z));
  float fresnelFactor = dot(viewDirection, vNormal);

  float inversefresnelFactor = clamp(1. - fresnelFactor, 0.0, 1.);

	// Shaping function
  fresnelFactor = pow(fresnelFactor, powerOfFactor);
  inversefresnelFactor = pow(inversefresnelFactor, powerOfFactor);
  
  gl_FragColor = vec4(fresnelFactor * baseColor + fresnelColor * inversefresnelFactor, alpha);
}