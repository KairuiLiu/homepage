import {
	Scene,
	Mesh,
	ShaderMaterial,
	IcosahedronBufferGeometry,
	Vector3,
	PlaneBufferGeometry,
	MeshBasicMaterial,
	Vector2,
} from 'three';
import * as vertexShader from './shaders/vertexShader.shader';
import * as fragmentShader from './shaders/fragmentShader.shader';

class Ball {
	private geometry: IcosahedronBufferGeometry;

	private material: ShaderMaterial;

	private mesh: Mesh;

	private scene: Scene;

	private seed: number;

	constructor(scene: Scene) {
		this.scene = scene;
		this.seed = Math.random() * 123456;
		this.geometry = new IcosahedronBufferGeometry(10, 50);
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
}

export default Ball;
