import {
	Scene,
	Mesh,
	ShaderMaterial,
	IcosahedronBufferGeometry,
	Box3,
	CatmullRomCurve3,
	Vector3,
	Camera,
} from 'three';
import { lerpBallRun } from '../../utils/lerp';
import { s2w } from '../../utils/screenWorldCoordTrans';
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

	private curve: CatmullRomCurve3[];

	private camera: Camera;

	constructor(scene: Scene, camera: Camera) {
		this.scene = scene;
		this.camera = camera;
		this.curve = [];
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
		} else {
			this.basicScale = 1;
		}
		this.generateCurve();
	}

	generateCurve() {
		const delta = this.worldWidth - this.worldHeight;
		const centerX = 0.3 * delta;
		const page2Anchor = document.getElementById('page2-anchor');
		const v3pos = s2w(
			this.camera,
			new Vector3(
				page2Anchor!.offsetLeft,
				page2Anchor!.offsetTop - window.innerHeight,
				0
			),
			0
		);
		if (this.worldHeight < this.worldWidth) {
			this.curve = [
				new CatmullRomCurve3(
					[
						// 起点
						new Vector3(centerX, 0, 0),
						new Vector3(-this.worldWidth / 4, -this.worldHeight / 4, -20),
						new Vector3(-this.worldWidth, -this.worldHeight, -10),
						new Vector3(0, this.worldHeight * 0.3, -10),
						new Vector3(
							this.maxRadius * 0.3 + v3pos!.x,
							v3pos!.y - this.maxRadius * 0.3,
							0
						),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(
							this.maxRadius * 0.3 + v3pos!.x,
							v3pos!.y - this.maxRadius * 0.3,
							0
						),
						new Vector3(0, 0, 0),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(0, 0, 0),
						new Vector3(this.worldWidth, -this.worldHeight, -10),
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
					],
					false
				),
			];
		} else {
			this.curve = [
				new CatmullRomCurve3(
					[
						// 起点
						new Vector3(0, 0, 0),

						new Vector3(-this.worldWidth / 4, -this.worldHeight / 4, -20),
						new Vector3(-this.worldWidth, -this.worldHeight, -10),
						new Vector3(
							this.maxRadius * 0.2 + v3pos!.x,
							v3pos!.y - this.maxRadius * 0.2,
							0
						),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(
							this.maxRadius * 0.2 + v3pos!.x,
							v3pos!.y - this.maxRadius * 0.2,
							0
						),
						new Vector3(0, 0, 0),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(0, 0, 0),
						new Vector3(this.worldWidth, -this.worldHeight, -10),
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
					],
					false
				),
				new CatmullRomCurve3(
					[
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
						new Vector3(
							(this.worldWidth * 3) / 8,
							(-this.worldHeight * 3) / 8,
							0
						),
					],
					false
				),
			];
		}
	}

	tryRelocate(pagePercentage: number) {
		pagePercentage =
			Math.floor(pagePercentage) +
			lerpBallRun(pagePercentage - Math.floor(pagePercentage));
		const pos = this.curve[Math.floor(pagePercentage)].getPointAt(
			pagePercentage - Math.floor(pagePercentage)
		);
		this.mesh.position.set(pos.x, pos.y, pos.z);

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
					this.basicScale * (6 - 5.9 * (pagePercentage - 2)),
					this.basicScale * (6 - 5.9 * (pagePercentage - 2)),
					this.basicScale * (6 - 5.9 * (pagePercentage - 2))
				);
				break;
			default:
				break;
		}
	}
}

export default Ball;
