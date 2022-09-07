import * as THREE from 'three';

class Core {
	threeEl: HTMLElement;

	camera: THREE.PerspectiveCamera;

	scene: THREE.Scene;

	renderer: THREE.WebGLRenderer;

	constructor(el: HTMLElement) {
		this.threeEl = el;
		this.camera = new THREE.PerspectiveCamera();
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.init();
		el.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.init.bind(this));
		this.tryRender();
	}

	init() {
		this.camera.fov = 80;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.near = 0.01;
		this.camera.far = 233;
		this.camera.updateProjectionMatrix();
		// this.scene.fog = new THREE.FogExp2(backgroundColor, config.renderer.fog);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	tryRender() {
		requestAnimationFrame(this.tryRender);
		this.renderer.render(this.scene, this.camera);
	}
}

export default Core;
