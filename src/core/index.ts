import * as THREE from 'three';

class Core {
	canvas: HTMLCanvasElement;

	camera: THREE.PerspectiveCamera;

	scene: THREE.Scene;

	renderer: THREE.WebGLRenderer;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.camera = new THREE.PerspectiveCamera();
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer();
	}
}

export default Core;
