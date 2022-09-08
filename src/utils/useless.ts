/* eslint-disable */

{
	const year = new Date().getFullYear();
	const yearInv = `${year}`.split('').reverse().join('');
	const lang = /^\/en/.test(document.location.pathname) ? 'en' : 'cn';
	const noTrackConsole = function (texts: string[], cmd = 'log') {
		setTimeout(() => console[cmd](...texts), 0);
	};
	const e1 = ['e', 'a', 's', 't', 'e', 'r'].reduce((pre, cur) =>
		Math.random() > 1 ? '' : pre + cur
	);
	const e2 = ['e', 'g', 'g'].reduce((pre, cur) =>
		Math.random() > 1 ? '' : pre + cur
	);
	const ee = ['E', 'a', 's', 't', 'e', 'r', 'E', 'g', 'g'].reduce((pre, cur) =>
		Math.random() > 1 ? '' : pre + cur
	);

	if (lang === 'cn') {
		// EGG 00
		noTrackConsole(['%c🥚', 'font-size: 96px'], 'log');
		noTrackConsole([`🎊 哇哦, 你发现了一枚隐藏彩蛋 (#0)`], 'log');
		noTrackConsole([], 'clear');
		noTrackConsole(
			[`都 ${yearInv} 年了, 谁还在控制台里藏彩蛋啊 ┑(￣Д ￣)┍`],
			'groupCollapsed'
		);

		// EGG 01
		noTrackConsole(['%c🥚', 'font-size: 96px;'], 'log');
		noTrackConsole([`嘻嘻, 你发现了一颗平平无奇的彩蛋 (#1)`], 'log');
		noTrackConsole([], 'groupEnd');
	} else {
		// EGG 00
		noTrackConsole(['%c🥚', 'font-size: 96px'], 'log');
		noTrackConsole([`🎊 Wow, you found a hidden ${e1} ${e2} (#0)`], 'log');
		noTrackConsole([], 'clear');
		noTrackConsole(
			[
				`It's ${yearInv}, who still hides ${e1} ${e2} in the console? ┑(￣Д ￣)┍`,
			],
			'groupCollapsed'
		);

		// EGG 01
		noTrackConsole(['%c🥚', 'font-size: 96px;'], 'log');
		noTrackConsole([`Hee, you found an unremarkable ${e1} ${e2} (#1)`], 'log');
		noTrackConsole([], 'groupEnd');
	}

	// EGG 02
	fetch(
		`${window.location.protocol}//${window.location.host}/${e1}_${e2}`
	).catch(Function.prototype);

	// EGG 03

	let t = null;
	eval(`
		const ${ee} = function () {
			this.cn = '🥚 真不错, 埋的这么深都能被发现 (#3)';
			this.en = '🥚 Nice, hiding so deep still be found (#3)';
			this.keepAlive = Math.random();
		};
		t = new ${ee}()
	`);
	setTimeout(() => {
		if (t.keepAlive > 1) {
			if (lang === 'cn')
				noTrackConsole(['🥚 理论上这是一颗永远都不会触发的彩蛋 (#-1)'], 'log');
			else
				noTrackConsole(
					[`🥚 In theory this is an ${e1} ${e2} that will never trigger (#-1)`],
					'log'
				);
		}
		t = null;
	}, 120000);

	// EGG 04
	setTimeout(() => {
		sessionStorage.setItem(`${e1}_${e2}_cn`, '🥚 一颗稀松平常的彩蛋 (#4)');
		sessionStorage.setItem(`${e1}_${e2}_en`, `🥚 an ordinary ${e2} (#4)`);
	});

	// EGG 05
	// IN HTML
}
