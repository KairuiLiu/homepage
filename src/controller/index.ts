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
		this.ui = new UI(app, background, ref, canvas);
		this.listen();
	}

	listen() {
		this.scrollHandler();
		document.addEventListener('scroll', this.scrollHandler.bind(this));
		this.app
			.querySelector('#lang')
			?.addEventListener('click', this.langHandler.bind(this));
		this.app
			.querySelector('#dark')
			?.addEventListener('click', this.darkModeHandler.bind(this));
		this.ui.setDarkMode(undefined, true);
	}

	scrollHandler() {
		const { clientHeight } = document.body;
		const pagePercentage = lerpPageOffset(
			-this.ref.getBoundingClientRect().top
		);
		this.ui.setAppTop(pagePercentage * clientHeight);
		this.ui.setBackgroundRotate(pagePercentage);
	}

	langHandler() {
		if (/^\/en/.test(document.location.pathname))
			document.location.replace(document.location.origin);
		else document.location.replace(`${document.location.origin}/en`);
		this;
	}

	darkModeHandler() {
		this.ui.setDarkMode();
	}
}

export default Controller;
