import './style.css'
import * as THREE from 'three';


// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 2, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x6347FF, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate() {
  // 60 times per second
  requestAnimationFrame(animate);
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  renderer.render(scene, camera);
}

animate();
