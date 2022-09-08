import Core from '../core';
import UI from '../ui';
import { lerpBezier, lerpPageOffset } from '../utils/lerp';

class Controller {
	app: HTMLElement;

	ref: HTMLElement;

	threeEl: HTMLElement;

	background: HTMLElement;

	core: Core;

	ui: UI;

	constructor(
		app: HTMLElement,
		background: HTMLElement,
		ref: HTMLElement,
		threeEl: HTMLElement
	) {
		this.app = app;
		this.ref = ref;
		this.threeEl = threeEl;
		this.background = background;
		this.core = new Core(threeEl);
		this.ui = new UI(app, background, ref, threeEl);
		this.listen();
	}

	listen() {
		this.scrollHandler();
		document.addEventListener('scroll', this.scrollHandler.bind(this));
		this.app
			.querySelector('#lang')
			?.addEventListener('click', this.langHandler.bind(this));
		this.ui.setDarkMode(undefined, true);
		this.app
			.querySelector('#dark')
			?.addEventListener('click', this.darkModeHandler.bind(this));
		this.resizeHandler();
		window.addEventListener('resize', this.resizeHandler.bind(this));
		[...this.app.querySelectorAll('#page3 .workItem')].forEach(
			(d: HTMLElement) => {
				const preview = d.getElementsByClassName('preview')[0];
				const title = d.getElementsByClassName('item-title')[0];
				title.addEventListener(
					'mouseenter',
					this.projectPreviewEnterHandler.bind(this, preview)
				);
				title.addEventListener(
					'mouseout',
					this.projectPreviewOutHandler.bind(this, preview)
				);
				title.addEventListener(
					'mousemove',
					this.projectPreviewHandler.bind(this, preview)
				);
			}
		);
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

	resizeHandler() {
		const canvas = this.threeEl.querySelector('canvas');
		if (!canvas) return;
		if (window.innerHeight > window.innerWidth) {
			canvas.style.opacity = `${
				1 -
				lerpBezier(1 - window.innerWidth / window.innerHeight, 0, 0.5, 0.5, 1).y
			}`;
		} else {
			canvas.style.opacity = '1';
		}
	}

	darkModeHandler() {
		this.ui.setDarkMode();
	}

	projectPreviewEnterHandler(preview: HTMLElement, e) {
		preview.style.opacity = '0.8';
		this;
	}

	projectPreviewOutHandler(preview: HTMLElement, e) {
		preview.style.opacity = '0';
		this;
	}

	projectPreviewHandler(preview: HTMLElement, e) {
		preview.style.top = `${e.offsetY}px`;
		preview.style.left = `${e.offsetX}px`;
		this;
	}
}

export default Controller;
