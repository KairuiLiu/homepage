import * as THREE from 'three';
import { s2w } from '../utils/screenWorldCoordTrans';
import Ball from './ball';

class Core {
	threeEl: HTMLElement;

	camera: THREE.PerspectiveCamera;

	scene: THREE.Scene;

	renderer: THREE.WebGLRenderer;

	ball?: Ball;

	getPagePercentage: () => number;

	constructor(el: HTMLElement, getPagePercentage: () => number) {
		this.threeEl = el;
		this.getPagePercentage = getPagePercentage;
		this.camera = new THREE.PerspectiveCamera();
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.reload(false);
		this.initScene();
		el.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.reload.bind(this, true));
		this.tryRender();
		this.tryResize();
	}

	initScene() {
		this.ball = new Ball(this.scene, this.camera);
	}

	reload(relocate = true) {
		this.camera.near = 0.1;
		this.camera.far = 1000;
		this.camera.fov = 75;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.position.z = 31;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		if (relocate) this.tryResize();
	}

	tryRender() {
		requestAnimationFrame(this.tryRender.bind(this));
		this.ball!.animate();
		this.renderer.render(this.scene, this.camera);
	}

	tryResize() {
		const range = s2w(
			this.camera,
			new THREE.Vector3(window.innerWidth, 0, 0),
			0
		);
		this.ball?.tryResize(range!.x, range!.y);

		this.tryRelocate();
	}

	tryRelocate() {
		this.ball?.tryRelocate(this.getPagePercentage());
	}
}

export default Core;
