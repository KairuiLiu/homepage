/* eslint-disable */
{
	function noTrackConsole(texts: string[], cmd = 'log') {
		setTimeout(() => console[cmd](...texts), 0);
	}

	const year = new Date().getFullYear();
	const yearInv = `${year}`.split('').reverse().join('');
	const lang = /^\/en/.test(document.location.pathname) ? 'en' : 'cn';

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
		noTrackConsole([`🎊 Wow, you found a hidden easter egg (#0)`], 'log');
		noTrackConsole([], 'clear');
		noTrackConsole(
			[
				`It's ${yearInv}, who still hides easter eggs in the console? ┑(￣Д ￣)┍`,
			],
			'groupCollapsed'
		);

		// EGG 01
		noTrackConsole(['%c🥚', 'font-size: 96px;'], 'log');
		noTrackConsole([`Hee, you found an unremarkable easter egg (#1)`], 'log');
		noTrackConsole([], 'groupEnd');
	}

	// EGG 02
	fetch(`${window.location.href}/easter_egg`).catch(Function.prototype);

	// EGG 03
	const EasterEgg = function () {
		this.cn = '🥚 真不错, 埋的这么深都能被发现 (#3)';
		this.en = '🥚 Nice, hiding so deep still be found (#3)';
		this.keepAlive = Math.random();
	};
	let t = new EasterEgg();
	setTimeout(() => {
		if (t.keepAlive > 1) {
			if (lang === 'cn')
				noTrackConsole(['🥚 理论上这是一颗永远都不会触发的彩蛋 (#-1)'], 'log');
			else
				noTrackConsole(
					['🥚 In theory this is an Easter egg that will never trigger (#-1)'],
					'log'
				);
		}
		t = null;
	}, 120000);

	// EGG 04
	setTimeout(() => {
		sessionStorage.setItem('easter_egg_cn', '🥚 一颗稀松平常的彩蛋 (#4)');
		sessionStorage.setItem('easter_egg_en', '🥚 an ordinary egg (#4)');
	});

	// EGG 05
	// IN HTML
}
