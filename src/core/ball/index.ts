import {
	Scene,
	Mesh,
	ShaderMaterial,
	IcosahedronBufferGeometry,
	Box3,
	CatmullRomCurve3,
	Vector3,
	BufferGeometry,
	LineBasicMaterial,
	Color,
	Line,
	Curve,
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

	private basicScale: number;

	private worldWidth: number;

	private worldHeight: number;

	private curve: Curve;

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
		this.basicScale = 1;
		this.worldWidth = 1;
		this.worldHeight = 1;
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

	tryResize(halfWidth: number, halfHeight: number) {
		this.worldWidth = halfWidth * 2;
		this.worldHeight = halfHeight * 2;
		if (halfWidth > halfHeight) {
			const delta = halfWidth - halfHeight;
			const centerX = 0.6 * delta;
			const scaleY = halfHeight / this.maxRadius;
			const scaleX = (halfWidth - centerX) / this.maxRadius;
			this.basicScale = Math.min(scaleY, scaleX, 1);
			this.mesh.scale.set(this.basicScale, this.basicScale, this.basicScale);
			// this.mesh.position.set(centerX, 0, 0);
		} else {
			// this.mesh.position.set(0, 0, 0);
		}
		this.generateCurve();
	}

	generateCurve() {
		const delta = this.worldWidth - this.worldHeight;
		const centerX = 0.3 * delta;
		this.curve = new CatmullRomCurve3(
			[
				// 起点
				new Vector3(centerX, 0, 0),

				new Vector3(-this.worldWidth / 4, -this.worldHeight / 4, -20),
				new Vector3(
					(-this.worldWidth / 4) * 3,
					(-this.worldHeight / 4) * 3,
					-10
				),
				new Vector3((-this.worldHeight / 8) * 3, 0, 0),

				new Vector3(0, 0, 40),
				new Vector3((this.worldWidth * 3) / 8, (-this.worldHeight * 3) / 8, 0),
			],
			false
		);
		// const geometry = new BufferGeometry().setFromPoints(
		// 	this.curve.getSpacedPoints(100)
		// );
		// const material = new LineBasicMaterial({
		// 	color: new Color().setHSL(Math.random(), 0.5, 0.5),
		// });
		// const curveObject = new Line(geometry, material);
		// this.scene.add(curveObject);
	}

	tryRelocate(pagePercentage: number) {
		if (this.worldWidth > this.worldHeight) {
			const pos = this.curve.getPointAt(pagePercentage / 3);
			this.mesh.position.set(pos.x, pos.y, pos.z);
		} else {
			this.mesh.position.set(0, 0, 0);
		}
		switch (true) {
			case pagePercentage <= 1:
				this.mesh.scale.set(
					this.basicScale * (0.2 + 0.8 * (1 - pagePercentage)),
					this.basicScale * (0.2 + 0.8 * (1 - pagePercentage)),
					this.basicScale * (0.2 + 0.8 * (1 - pagePercentage))
				);
				break;
			case pagePercentage <= 2:
				this.mesh.scale.set(
					this.basicScale * (0.2 + 5.8 * (pagePercentage - 1)),
					this.basicScale * (0.2 + 5.8 * (pagePercentage - 1)),
					this.basicScale * (0.2 + 5.8 * (pagePercentage - 1))
				);
				break;
			case pagePercentage <= 3:
				this.mesh.scale.set(
					this.basicScale * (6 - 5.8 * (pagePercentage - 2)),
					this.basicScale * (6 - 5.8 * (pagePercentage - 2)),
					this.basicScale * (6 - 5.8 * (pagePercentage - 2))
				);
				break;
			default:
				break;
		}
	}
}

export default Ball;
