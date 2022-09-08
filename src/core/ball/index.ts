import {
	Scene,
	Mesh,
	ShaderMaterial,
	IcosahedronBufferGeometry,
	Box3,
	FogExp2,
} from 'three';
import * as vertexShader from './shaders/vertexShader.shader';
import * as fragmentShader from './shaders/fragmentShader.shader';

class Ball {
	private geometry: IcosahedronBufferGeometry;

	private material: ShaderMaterial;

	mesh: Mesh;

	private scene: Scene;

	private seed: number;

	private maxRadius: number;

	constructor(scene: Scene) {
		this.scene = scene;
		this.seed = Math.random() * 12345;
		this.geometry = new IcosahedronBufferGeometry(15, 50);
		this.material = new ShaderMaterial({
			wireframe: true,
			vertexShader: vertexShader.default,
			fragmentShader: fragmentShader.default,
			uniforms: {
				time: {
					type: 'f',
					value: 0.0,
				},
			},
		});
		this.mesh = new Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
		const bounderBox = new Box3().setFromObject(this.mesh);
		const maxX = Math.max(
			bounderBox.max.x - this.mesh.position.x,
			this.mesh.position.x - bounderBox.min.x
		);
		const maxY = Math.max(
			bounderBox.max.y - this.mesh.position.y,
			this.mesh.position.y - bounderBox.min.y
		);
		const maxZ = Math.max(
			bounderBox.max.z - this.mesh.position.z,
			this.mesh.position.z - bounderBox.min.z
		);
		this.maxRadius = Math.sqrt(maxX * maxX + maxY * maxY + maxZ * maxZ);
	}

	animate() {
		this.material.uniforms.time.value =
			0.025 * window.performance.now() + this.seed;
		this.updateBlob();
	}

	private updateBlob(): void {
		if (this.geometry) {
			this.mesh.rotation.y += 0.001;
			this.mesh.rotation.x -= 0.0005;
		}
	}

	tryRelocate(halfWidth: number, halfHeight: number) {
		if (halfWidth > halfHeight) {
			const delta = halfWidth - halfHeight;
			const centerX = 0.6 * delta;
			const scaleY = halfHeight / this.maxRadius;
			const scaleX = (halfWidth - centerX) / this.maxRadius;
			const scale = Math.min(scaleY, scaleX, 1);
			this.mesh.scale.set(scale, scale, scale);
			this.mesh.position.set(centerX, 0, 0);
		} else {
			this.mesh.position.set(0, 0, 0);
		}
	}
}

export default Ball;
