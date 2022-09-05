import Core from '../core';
import UI from '../ui';
import { lerpPageOffset } from '../utils/lerp';

class Controller {
	app: HTMLElement;

	ref: HTMLElement;

	canvas: HTMLCanvasElement;

	background: HTMLElement;

	core: Core;

	ui: UI;

	constructor(
		app: HTMLElement,
		background: HTMLElement,
		ref: HTMLElement,
		canvas: HTMLCanvasElement
	) {
		this.app = app;
		this.ref = ref;
		this.canvas = canvas;
		this.background = background;
		this.core = new Core(canvas);
		this.ui = new UI();
		this.listen();
	}

	listen() {
		this.scrollHandler();
		document.addEventListener('scroll', this.scrollHandler.bind(this));
	}

	scrollHandler() {
		const { clientHeight } = document.body;
		const pagePercentage = lerpPageOffset(
			-this.ref.getBoundingClientRect().top
		);
		this.app.style.top = `-${pagePercentage * clientHeight}px`;
		this.background.style.background = `linear-gradient(${
			135 + 180 * pagePercentage
		}deg, #a0eee1 25%, #ffe3ec 75%)`;
	}
}

export default Controller;
