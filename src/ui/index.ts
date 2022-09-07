import './css/style.less';

class UI {
	app: HTMLElement;

	ref: HTMLElement;

	canvas: HTMLCanvasElement;

	background: HTMLElement;

	darkMode: boolean;

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
		this.darkMode = localStorage.getItem('darkMode') === 'true';
	}

	setAppTop(pre: number) {
		this.app.style.top = `-${pre}px`;
	}

	setBackgroundRotate(pre?: number) {
		if (pre === undefined) {
			if (/([0-9.]+)deg/.test(this.background.style.background))
				pre =
					(+this.background.style.background.match('([0-9.]+)deg')![1] - 135) /
					180;
			else pre = 0;
		}
		this.background.style.background = `linear-gradient(${
			135 + 180 * pre
		}deg, ${
			this.darkMode ? '#002424 45%,#24001e 85%' : '#a0eee1 25%, #ffe3ec 75%'
		})`;
	}

	setDarkMode(v?: boolean, keep = false) {
		if (!keep) this.darkMode = v === undefined ? !this.darkMode : v;
		if (this.darkMode) document.body.classList.add('dark-mode-enable');
		else document.body.classList.remove('dark-mode-enable');
		this.setBackgroundRotate();
		localStorage.setItem('darkMode', `${this.darkMode}`);
	}
}

export default UI;
