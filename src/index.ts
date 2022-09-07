import Controller from './controller';
import './utils/useless';

new Controller(
	document.getElementById('app') as HTMLElement,
	document.getElementById('background') as HTMLElement,
	document.getElementById('wapper') as HTMLElement,
	document.getElementById('threejs') as HTMLCanvasElement
);
