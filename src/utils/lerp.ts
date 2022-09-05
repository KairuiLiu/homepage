export function lerpBezier(
	t: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number
) {
	return {
		x: 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t,
		y: 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t,
	};
}

export function lerpPageOffset(top: number) {
	const { clientHeight } = document.body;
	const pageOffset = top % clientHeight;
	const pageHeight = Math.floor(top / clientHeight);
	return pageHeight + lerpBezier(pageOffset / clientHeight, 0.8, 0, 0.8, 0).y;
}
