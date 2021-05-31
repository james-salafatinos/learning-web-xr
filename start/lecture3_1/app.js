import * as THREE from '../../libs/three/three.module.js';
import { VRButton } from '../../libs/three/jsm/VRButton.js';
import { XRControllerModelFactory } from '../../libs/three/jsm/XRControllerModelFactory.js';
import { BoxLineGeometry } from '../../libs/three/jsm/BoxLineGeometry.js';
import { Stats } from '../../libs/stats.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div')
        document.body.appendChild(container)

        this.clock = new THREE.Clock()

        //Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, .1, 1000)
        this.camera.position.set(0,1,3)

        //Scene
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x887766)
        
        //Light
        const hemLight = new THREE.HemisphereLight(0xffff33, 0x1134dd)
        const dirLight = new THREE.DirectionalLight(0xffffff)
        dirLight.position.set(4,4,4)
        this.scene.add(hemLight, dirLight)

        //Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.encoding = THREE.sRGBEncoding
        container.appendChild(this.renderer.domElement)

        //Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target.set(0,1,0)
        this.controls.update()

        //Stats
        this.stats = new Stats();
        container.appendChild(this.stats.dom)

        //Start Scripts
        this.initScene();
        this.setupXR();
        window.addEventListener('resize', this.resize.bind(this))
        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    random(min,max){
        return Math.random()* (max-min) +min
    }

    initScene() {
        //Build main visuals

        this.radius = 0.08

        this.room = new THREE.LineSegments(
            new BoxLineGeometry(6,6,6,10,10,10),
            new THREE.LineBasicMaterial({color:0xaabb33})
        )
        // this.room.geometry.translate(0,3,0)
        this.scene.add(this.room)

        const geometry = new THREE.IcosahedronBufferGeometry(this.radius, 1)
        for(let i =0; i<2000; i++){
            const object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: Math.random() * 0xFFFFFF
            }));

            object.position.x = this.random(-10,10)
            object.position.y = this.random(-10,10)
            object.position.z = this.random(-10,10)
            this.room.add(object)
        }

        this.room2 = new THREE.LineSegments(
            new BoxLineGeometry(12,12,12,20,20,20),
            new THREE.LineBasicMaterial({color:0xaabb33})
        )
        // this.room.geometry.translate(0,3,0)
        this.scene.add(this.room2)




    }

    setupXR() {
        //Enable VR
        this.renderer.xr.enabled = true;
        document.body.appendChild(VRButton.createButton(this.renderer))

    }

    resize() {
        //Continuous resizing
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }

    render() {
        //Render method
        this.stats.update();
   
        this.room.rotateY( 0.005 );
        this.room2.rotateZ( 0.005 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };