{
	const year = new Date().getFullYear();
	const yearInv = `${year}`.split('').reverse().join('');
	const lang = /^\/en/.test(document.location.pathname) ? 'en' : 'cn';

	if (lang === 'cn') {
		// EGG 00
		console.log('%c🥚', 'font-size: 96px');
		console.log(`🎊 哇哦, 你发现了一枚隐藏彩蛋 (#0)`);
		console.clear();
		console.groupCollapsed(
			`都 ${yearInv} 年了, 谁还在控制台里藏彩蛋啊 ┑(￣Д ￣)┍`
		);

		// EGG 01
		console.log('%c🥚', 'font-size: 96px;');
		console.log(`嘻嘻, 你发现了一颗平平无奇的彩蛋 (#1)`);
		console.groupEnd();
	} else {
		// EGG 00
		console.log('%c🥚', 'font-size: 96px');
		console.log(`🎊 Wow, you found a hidden easter egg (#0)`);
		console.clear();
		console.groupCollapsed(
			`It's ${yearInv}, who still hides easter eggs in the console? ┑(￣Д ￣)┍`
		);

		// EGG 01
		console.log('%c🥚', 'font-size: 96px;');
		console.log(`Hee, you found an unremarkable easter egg (#1)`);
		console.groupEnd();
	}

	// EGG 02
	fetch(`${window.location.href}/easter_egg`).catch(Function.prototype);

	// EGG 03
	const EasterEgg = function () {
		this.cn = '🥚 真不错, 埋的这么深都能被发现 (#3)';
		this.en = '🥚 Nice, hiding so deep still be found (#3)';
	};
	let t = new EasterEgg();
	setTimeout(() => {
		t = null;
	}, 120000);

	// EGG 04
	setTimeout(() => {
		sessionStorage.setItem('easter_egg_cn', '🥚 一颗稀松平常的彩蛋(#4)');
		sessionStorage.setItem('easter_egg_en', '🥚 an ordinary egg(#4)');
	});

	// EGG 05
	// IN HTML
}
