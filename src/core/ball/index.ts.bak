import * as THREE from 'three';

class Ball {
	points: number[];

	geometry?: THREE.BufferGeometry;

	material?: THREE.Material;

	mesh?: THREE.Mesh;

	scene: THREE.Scene;

	near: number;

	rotations: { x: number; y: number; z: number };

	far: number;

	constructor(scene) {
		this.near = 100;
		this.far = 200;
		this.points = [];
		this.scene = scene;
		this.rotations = { x: 0, y: 0, z: 0 };
		this.init();
	}

	init() {
		new THREE.BufferGeometryLoader().load(
			'/WaltHeadLo_buffergeometry.json',
			geometry => {
				geometry.deleteAttribute('normal');
				geometry.deleteAttribute('uv');
				this.setupAttributes(geometry);
				const material1 = new THREE.MeshBasicMaterial({
					color: 0x000,
					wireframe: true,
				});
				this.mesh = new THREE.Mesh(geometry, material1);
				this.mesh.position.set(-40, 0, 0);
				this.scene.add(this.mesh!);
			}
		);
	}

	setupAttributes(geometry) {
		const vectors = [
			new THREE.Vector3(1, 0, 0),
			new THREE.Vector3(0, 1, 0),
			new THREE.Vector3(0, 0, 1),
		];
		const { position } = geometry.attributes;
		const centers = new Float32Array(position.count * 3);
		for (let i = 0, l = position.count; i < l; i += 1) {
			vectors[i % 3].toArray(centers, i * 3);
		}
		geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));
		this;
	}

	update() {
		this.rotations.x += Math.cos(Math.random()) / 10;
		this.rotations.y += Math.cos(Math.random()) / 10;
		this.rotations.z += Math.cos(Math.random()) / 10;
		this.mesh?.setRotationFromEuler(
			new THREE.Euler(
				this.rotations.x,
				this.rotations.y,
				this.rotations.z,
				'XYZ'
			)
		);
	}
}

export default Ball;
