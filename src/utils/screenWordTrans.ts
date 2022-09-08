import { Vector3, Camera } from 'three';

export function w2s(camera: Camera, worldPos: Vector3) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const widthHalf = width / 2;
	const heightHalf = height / 2;
	const pos = worldPos.clone();
	pos.project(camera);
	pos.x = pos.x * widthHalf + widthHalf;
	pos.y = -(pos.y * heightHalf) + heightHalf;
	return pos;
}

export function s2w(camera: Camera, screenPos: Vector3, targetZ: number) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const widthHalf = width / 2;
	const heightHalf = height / 2;
	if (
		Math.isNaN(screenPos.x) ||
		Math.isNaN(screenPos.y) ||
		Math.isNaN(screenPos.z)
	)
		return null;
	const pos = screenPos.clone();
	pos.x = (pos.x - widthHalf) / widthHalf;
	pos.y = -(pos.y - heightHalf) / heightHalf;
	pos.z = 0.5;
	pos.unproject(camera);
	const dir = pos.clone().sub(camera.position);
	return dir
		.clone()
		.multiplyScalar((targetZ - camera.position.z) / dir.z)
		.add(camera.position);
}
