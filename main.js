import * as THREE from 'three';
import gsap from 'gsap'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
camera.position.z = 50

// light
const light1 = new THREE.DirectionalLight(0xffffff, 1)
light1.position.set(0, 1, 1)
scene.add(light1)

const planeGeometry = new THREE.PlaneGeometry(400, 400, 60, 60)
const planeMaterial = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	flatShading: true,
	vertexColors: true
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

// vertice position randomization
const { array } = planeMesh.geometry.attributes.position
const randomValues = []
for (let i = 0; i < array.length; i+=3) {
	const x = array[i]
	const y = array[i+1]
	const z = array[i+2]

	array[i] = x + (Math.random() - 0.5)*3
	array[i + 1] = y + (Math.random() - 0.5)*3
	array[i + 2] = z + (Math.random() - 0.5)*3

	randomValues.push(Math.random() * Math.PI * 2)
	randomValues.push(Math.random() * Math.PI * 2)
	randomValues.push(Math.random() * Math.PI * 2)
}
planeMesh.geometry.attributes.position.randomValues = randomValues
planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array

// color attribute addition
const colors = []
for (let i = 0; i<planeMesh.geometry.attributes.position.count; i++){
	colors.push(1, 1, 1)
}
planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
scene.add(planeMesh)




const mouse = {
	x: undefined,
	y: undefined
}

let frame = 0
function animate() {
	requestAnimationFrame(animate)
	frame += 0.01
	renderer.render(scene, camera)

	const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position
	for (let i = 0; i < array.length; i += 3) {
		array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.007
		array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.007
	}
	
	planeMesh.geometry.attributes.position.needsUpdate = true
	

	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObject(planeMesh)
	if (intersects.length > 0) {
		const {color, position} = intersects[0].object.geometry.attributes

		color.setX(intersects[0].face.a, 0.1)
		color.setX(intersects[0].face.b, 0.1)
		color.setX(intersects[0].face.c, 0.1)

		color.setY(intersects[0].face.a, 0.5)
		color.setY(intersects[0].face.b, 0.5)
		color.setY(intersects[0].face.c, 0.5)

		color.setZ(intersects[0].face.a, 1)
		color.setZ(intersects[0].face.b, 1)
		color.setZ(intersects[0].face.c, 1)

		position.setX(intersects[0].point.x, 12)

		intersects[0].object.geometry.attributes.color.needsUpdate = true

		const initialColor = {r: 1, g: 1, b: 1}
		const hoverColor = {r: .5, g: .5, b: 0.5}
		gsap.to(hoverColor, {
			r: initialColor.r,
			g: initialColor.g,
			b: initialColor.b,
			onUpdate: () => {
				color.setX(intersects[0].face.a, hoverColor.r)
				color.setX(intersects[0].face.b, hoverColor.r)
				color.setX(intersects[0].face.c, hoverColor.r)
		
				color.setY(intersects[0].face.a, hoverColor.g)
				color.setY(intersects[0].face.b, hoverColor.g)
				color.setY(intersects[0].face.c, hoverColor.g)
		
				color.setZ(intersects[0].face.a, hoverColor.b)
				color.setZ(intersects[0].face.b, hoverColor.b)
				color.setZ(intersects[0].face.c, hoverColor.b)

			}
		})

	}
}

//-------------------------------------------------------------------------------------------------------------------------

// Create a sine-like wave
const curve = new THREE.SplineCurve( [
	new THREE.Vector2( -10, 0 ),
	new THREE.Vector2( -5, 5 ),
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 5, -5 ),
	new THREE.Vector2( 10, 0 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );
scene.add(splineObject)



animate()

addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / innerWidth) * 2 - 1
	mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / innerWidth) * 2 - 1
	mouse.y = -(event.clientY / innerHeight) * 2 + 1
})