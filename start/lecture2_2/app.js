import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App {
	constructor() {
		const container = document.createElement('div');
		document.body.appendChild(container);

		//Camera, 0,0,0
		//Frustrum = clipping plane. 
		this.camera = new THREE.PerspectiveCamera(60, window.innerHeight / window.innerWidth, 0.1, 100);
		this.camera.position.set(0, 0, 4);

		//Scene
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0xaaaaaa)
	
		//Lights
		this.ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3)
		this.scene.add(this.ambient)

		const light = new THREE.DirectionalLight()
		light.position.set(.2,4,4)
		this.scene.add(light)


		//Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		
		//Prevents jagged edges
		this.renderer.setPixelRatio(window.devicePixelRatio)
		//Prevents blurring
		this.renderer.setSize(window.innerHeight, window.innerWidth)
		//Add to div
		container.appendChild(this.renderer.domElement)
		this.renderer.setAnimationLoop(this.render.bind(this))

		//Helpers
		const lightHelper = new THREE.PointLightHelper(light)
		const gridHelper = new THREE.GridHelper(200,50);
		this.scene.add(lightHelper, gridHelper)


		//Box
		const geometry = new THREE.BoxBufferGeometry();
		const material = new THREE.MeshStandardMaterial({
			color: 0xff0000
		})
		this.mesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.mesh)
		const controls = new OrbitControls(this.camera, this.renderer.domElement)
		window.addEventListener('resize', this.resize.bind(this));

		function addStar(scene){
			const geometry = new THREE.SphereGeometry(.25,24,24);
			const material = new THREE.MeshStandardMaterial({color:0xffffff})
			const star = new THREE.Mesh(geometry,material)

			const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
			star.position.set(x,y,z)
			scene.add(star)
		}

		Array(200).fill().forEach(addStar)
	}

	resize() {
		this.camera.aspect = window.innerWidth/window.innerHeight
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	render() {
		this.mesh.rotateY(-.01)
		this.mesh.rotateZ(-.005)
		this.renderer.render(this.scene, this.camera)

	}
}

export { App };