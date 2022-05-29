import './style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui'

// Debug
//const gui = new dat.GUI()

// Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('NormalMap.png')

// Setup
const canvas = document.querySelector('#bg')
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);
const material = new THREE.MeshStandardMaterial()
material. metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

// const light1 = gui.addFolder('Light 1')

const pointLight2 = new THREE.PointLight(0xff6700, 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 10
scene.add(pointLight2)

// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

//light 3
// const light2 = gui.addFolder('Light 2')

const pointLight3 = new THREE.PointLight(0xfff, 2)
pointLight3.position.set(1.86, -1, -1.65)
pointLight3.intensity = 10
scene.add(pointLight3)

// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light2Color = {
//     color: 0xff0000
// }

// light2.addColor(light2Color, 'color').onChange(() => {
//     pointLight3.color.set(light2Color.color)
// })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)


// SIZE
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// CAMERA
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// ANIMATE
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const animate = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()

//renderer.render(scene, camera);

// function animate() {
//   requestAnimationFrame(animate);

//   torus.rotation.x += 0.005;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.005;

//   renderer.render(scene, camera);
// }

// animate();