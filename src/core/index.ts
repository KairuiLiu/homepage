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
		this.tryRender();
	}

	initScene() {
		this.ball = new Ball(this.scene);
	}

	reload() {
		this.camera.near = 0.1;
		this.camera.far = 1000;
		this.camera.fov = 75;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.position.z = 31;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	tryRender() {
		requestAnimationFrame(this.tryRender.bind(this));
		this.ball!.animate();
		this.renderer.render(this.scene, this.camera);
	}
}

export default Core;
