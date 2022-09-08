import * as THREE from 'three';
import Ball from './ball';

class Core {
	threeEl: HTMLElement;

	camera: THREE.PerspectiveCamera;

	scene: THREE.Scene;

	renderer: THREE.WebGLRenderer;

	ball?: Ball;

	constructor(el: HTMLElement) {
		this.threeEl = el;
		this.camera = new THREE.PerspectiveCamera();
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.reload();
		this.initScene();
		el.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.reload.bind(this));
		console.log(this.scene);
		this.tryRender();
	}

	initScene() {
		debugger;
		this.ball = new Ball(this.scene);
	}

	reload() {
		this.camera.fov = 80;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.near = 0.01;
		this.camera.far = 233;
		this.camera.updateProjectionMatrix();
		this.camera.position.z = 200;
		// this.scene.fog = new THREE.FogExp2(backgroundColor, config.renderer.fog);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	tryRender() {
		requestAnimationFrame(this.tryRender.bind(this));
		this.ball?.update();
		this.renderer.render(this.scene, this.camera);
	}
}

export default Core;
