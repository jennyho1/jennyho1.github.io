import * as THREE from 'three';
import gsap from 'gsap'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );


const planeGeometry = new THREE.PlaneGeometry(400, 400, 50, 50)
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
	colors.push(0, 0.01, 0.12)
}
planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
scene.add(planeMesh)

// light
const light1 = new THREE.DirectionalLight(0xffffff, 1)
light1.position.set(0, 1, 1)
scene.add(light1)
camera.position.z = 50

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
		if (frame < 0.1){
			console.log(intersects[0])
		}

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

		const initialColor = {r: 0, g: .01, b: .12}
		const hoverColor = {r: 0, g: .026, b: 0.26}
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
// const x = 0, y = 0;

// const heartShape = new THREE.Shape();

// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// const geometry = new THREE.ShapeGeometry( heartShape );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const mesh = new THREE.Mesh( geometry, material ) ;

// scene.add( mesh );

// mesh.position.set(0, 0, 4);


const loader = new FontLoader();
loader.load(
	'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
	(droidFont) => {
		const geometry = new TextGeometry( 'Hello', {
			font: droidFont,
			size: 10,
			height: 2
		} );
		const material = new THREE.MeshNormalMaterial;
		const mesh = new THREE.Mesh( geometry, material ) ;
		mesh.position.x = -36
		mesh.position.y = 5
		mesh.position.z = 10
		scene.add( mesh );
	}
)



animate()

addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / innerWidth) * 2 - 1
	mouse.y = -(event.clientY / innerHeight) * 2 + 1
})