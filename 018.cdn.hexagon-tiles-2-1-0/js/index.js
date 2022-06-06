setTimeout(() => {
  ReactDOM.render(
  React.createElement(Shader,
  {
    vertexShader,
    fragmentShader }),


  document.getElementById('js-app'));
}, 0);

const vertexShader = `

void main () {
  gl_Position = vec4(position, 1.0);
}

`;

const fragmentShader = `
${document.getElementById('noise2d').text}
${document.getElementById('hsv2rgb').text}

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

const float viewportSize = 200.0;
const float noiseResolution = 50.0;
const float noiseSpeed = 1.0 / 120.0;
const float magFactor = 1.0;
const float magRadius = viewportSize * 40.0;
const float tileSize = 5.0;

const float EPSILON = 0.01;

vec3 color0 = vec3(234.0/255.0,242.0/255.0,227.0/255.0);
vec3 color1 = vec3(97.0/255.0,232.0/255.0,225.0/255.0);
vec3 color2 = vec3(242.0/255.0,87.0/255.0,87.0/255.0);
vec3 color3 = vec3(242.0/255.0,232.0/255.0,99.0/255.0);
vec3 color4 = vec3(242.0/255.0,205.0/255.0,96.0/255.0);
vec3 color5 = vec3(255.0/255.0,255.0/255.0,255.0/255.0);

vec3 cubeRound (vec3 cube) {
  float rx = floor(cube.x + 0.5);
  float ry = floor(cube.y + 0.5);
  float rz = floor(cube.z + 0.5);
  float xd = abs(rx - cube.x);
  float yd = abs(ry - cube.y);
  float zd = abs(rz - cube.z);
  if (xd > yd && xd > zd) {
    rx = -ry - rz;
  } else if (yd > zd) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }
  return vec3(rx, ry, rz);
}

vec2 cubeToAxial (vec3 cube) {
  return cube.xz;
}

vec3 axialToCube (vec2 hex) {
  float x = hex.x;
  float z = hex.y;
  float y = -x - z;
  return vec3(x, y, z);
}

vec2 hexRound (vec2 hex) {
  return cubeToAxial(cubeRound(axialToCube(hex)));
}

vec3 mono (vec3 color) {
  return vec3((0.2125 * color.r) + (0.7154 * color.g) + (0.0721 * color.b));
}

vec2 pixelToAxial (vec2 point) {
  float q = (sqrt(3.0) / 3.0 * point.x - 1.0 / 3.0 * point.y);
  float r = (                            2.0 / 3.0 * point.y);
  return vec2(q, r);
}

vec2 pixelToHex (vec2 point, float size) {
  vec2 qr = pixelToAxial(point) / size;
  return hexRound(vec3(qr.x, qr.y, 5625463739.0).xy);
}

float circle (vec2 pos, float r) {
	return 1.0 - smoothstep(r - (r * EPSILON), r + (r * EPSILON), dot(pos, pos) * 4.0);
}

vec2 convertPoint (vec2 point) {
  vec2 pt = point.xy / min(uResolution.x, uResolution.y);
  pt = (pt * 2.0) - 1.0;
  return pt;
}

vec2 getMagPos () {
  return convertPoint(uMouse);
}

vec3 terrainColor (float elevation) {
  if (elevation >= 5.0) {
    return color5;
  }
  if (elevation >= 4.0) {
    return color4;
  }
  if (elevation >= 3.0) {
    return color1;
  }
  if (elevation >= 2.0) {
    return color0;
  }
  if (elevation >= 1.0) {
    return color2;
  }
  return color3;
}

void main () {
  vec2 pt = convertPoint(gl_FragCoord.xy);
  vec2 magPos = getMagPos(); // convertPoint(uMouse);
  float magnification = circle(((pt - magPos) / 2.0) * viewportSize, magRadius);
  vec2 hexPt = pt;
  vec3 color = vec3(0.0);
  vec2 sample = pixelToAxial(pt * viewportSize / 100.0);
  if (magnification == 0.0) {
    hexPt = (pt + (magPos * magFactor - magPos)) / 2.0 * (viewportSize / (magFactor / 2.0));
    vec2 hex = pixelToHex(hexPt, tileSize) / (noiseResolution / (tileSize / 2.0));
    sample = hex;
  }
  float a = snoise(vec3(sample.x, sample.y, 1.0 * noiseSpeed));
  // color = hsv2rgb(vec3(a, 0.6, 0.6));
  color = terrainColor(abs(a * 6.0));
  float f = (circle(pt - magPos, 0.8) - circle(pt - magPos, 0.75)) / 4.0;
  gl_FragColor = vec4(color, 1.0) + f;
}

`;

class Shader extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const uniforms = {
      uTime: {
        type: "f",
        value: 1 },

      uResolution: {
        type: "v2",
        value: new THREE.Vector2() },

      uMouse: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) } };


    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: this.props.vertexShader,
      fragmentShader: this.props.fragmentShader });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      canvas: this.canvas });

    // renderer.setPixelRatio(window.devicePixelRatio)
    const handleWindowResize = this.onWindowResize(camera, renderer, uniforms);
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize, false);
    document.onmousemove = e => {
      uniforms.uMouse.value.x = e.clientX; // * window.devicePixelRatio
      uniforms.uMouse.value.y = window.innerHeight - e.clientY; // * window.devicePixelRatio
    };
    this.animate(renderer, scene, camera, uniforms);
  }

  animate(renderer, scene, camera, uniforms) {
    requestAnimationFrame(() => {
      this.animate(renderer, scene, camera, uniforms);
    });
    uniforms.uTime.value += 0.05;
    renderer.render(scene, camera);
  }

  onWindowResize(camera, renderer, uniforms) {
    return () => {
      // const size = Math.min(window.innerWidth, window.innerHeight)
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.x = renderer.domElement.width;
      uniforms.uResolution.value.y = renderer.domElement.height;
    };
  }

  render() {
    return (
      React.createElement("canvas", { ref: c => this.canvas = c }));

  }}