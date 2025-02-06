document.addEventListener("DOMContentLoaded", function() {
	let lastWindowWidth = 0;
	let tabletBrakepoint = 1440;
	let mobileBrakepoint = 768;
	(teleport = function() {
		if (window.innerWidth === lastWindowWidth){
			return;
		} else {
			lastWindowWidth = window.innerWidth;
		}
		let tabletElemens = document.querySelectorAll('[data-tablet]');
		for (let i = 0, element; element = tabletElemens[i]; i++) {
			let elem = tabletElemens[i];
			let parent = elem.dataset.desktop;
			let destination = elem.dataset.tablet;
			if (window.innerWidth <= tabletBrakepoint) {
				if (elem.dataset.tabletBefore) {
					let before = elem.dataset.tabletBefore;
					document.getElementById(destination).insertBefore(elem, document.getElementById(before));
				} else {
					document.getElementById(destination).append(elem);
				}
			} else {
				document.getElementById(parent).append(elem);
			}
		};
		let mobileElements = document.querySelectorAll('[data-mobile]');
		for (let i = 0, element; element = mobileElements[i]; i++) {
			let elem = mobileElements[i];
			let parent = elem.dataset.desktop;
			let destination = elem.dataset.mobile;
			if (window.innerWidth <= tabletBrakepoint) {
				document.getElementById(destination).append(elem);
			} else {
				document.getElementById(parent).append(elem);
			}
		};
	})();
	window.onresize = teleport;
})