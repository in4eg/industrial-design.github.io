document.addEventListener("DOMContentLoaded", function() {
	const ACTIVE_TAB_CLASS = 'active';
	const ACTIVE_MENU_CLASS = 'active';

	const TOUCH_ACTIVE_TAB_CLASS = 'touch-active';
	const TOUCH_ACTIVE_MENU_CLASS = 'touch-active';
	const TOUCH_SELECTED_MENU_CLASS = 'touch-offset';

	let select = function(selector, parent){
		return (parent || document).querySelector(selector);
	};
	let selectAll = function(selector, parent){
		return [].slice.call((parent || document).querySelectorAll(selector));
	};
	let navigations = selectAll('[data-hover-show]');

	let buttons = selectAll(".main-catalog-toggle");
	let catalog = select("#catalogMainMenu");

	for (let i = 0; i < navigations.length; i++) {
		let navigation = navigations[i];

		let escapeContainer = select(navigation.dataset.escapeContainer);
		let buttons = selectAll('li', navigation);

		let targetId = navigation.dataset.hoverShow;

		let tabsContainer = select(targetId);

		if (escapeContainer) {
			escapeContainer.addEventListener('mouseleave', function(){
				tabsContainer.classList.remove(ACTIVE_MENU_CLASS);
			});
		}

		let tabs = selectAll(`${targetId} .tab-content`);

		let hideAll = function(collection){
			collection.forEach(function(item){
				item.classList.remove(ACTIVE_TAB_CLASS);
			});
		};

		let show = function(collection, index) {
			tabsContainer.classList.add(ACTIVE_MENU_CLASS);
			collection[index].classList.add(ACTIVE_TAB_CLASS);
		};

		for (let i = 0; i < buttons.length; i++) {
			let button = buttons[i];
			button.addEventListener('mouseenter', function(e){
				e.preventDefault();
				hideAll(buttons);
				show(buttons, i);
				hideAll(tabs);
				show(tabs, i);
			});
			button.addEventListener('touchstart', function(e){
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				hideAll(buttons);
				show(buttons, i);
				hideAll(tabs);
				show(tabs, i);
				navigation.classList.add(TOUCH_ACTIVE_MENU_CLASS);
				tabsContainer.classList.add(TOUCH_ACTIVE_MENU_CLASS);
				catalog.classList.add(TOUCH_SELECTED_MENU_CLASS);
			});
		};

		let backButtons = selectAll(`.back-button`);
		for (let i = 0; i < backButtons.length; i++) {
			let backButton = backButtons[i];
			backButton.addEventListener('touchstart', function(e){
				console.log(e)
				e.preventDefault();
				navigation.classList.remove(TOUCH_ACTIVE_MENU_CLASS);
				tabsContainer.classList.remove(TOUCH_ACTIVE_MENU_CLASS);
				catalog.classList.remove(TOUCH_SELECTED_MENU_CLASS);
			});
		}
	}

	// main menu toggle (desktop / main catalog)

	function ShowCatalogMenu(){
		buttons.forEach(function(button){
			button.classList.add("active");
		});
		// also hide mobile menu
		HideMobileMenu();

		catalog.classList.add("active");
		if (window.innerWidth <= 968){
			document.body.classList.add("overlayed");
		}
	}

	function HideCatalogMenu(){
		buttons.forEach(function(button){
			button.classList.remove("active");
		});
		catalog.classList.remove("active");
		document.body.classList.remove("overlayed");
	}

	buttons.forEach(function(button){
		button.addEventListener("click", function(e){
			e.preventDefault();
			console.log(button, catalog);

			let isMenuOpened = catalog.classList.contains("active");

			!isMenuOpened ? ShowCatalogMenu() : HideCatalogMenu();

		})
	});

	document.body.addEventListener("click", function(e){
		// for desktop only
		if (window.innerWidth <= 968) return;

		if (!e.target.closest("[main-catalog-container]") && !e.target.closest(".main-catalog-toggle")){
			HideCatalogMenu();
		}
	});

	let mainCatalogClose = selectAll(".main-catalog-close");
	mainCatalogClose.forEach(function(button){
		button.addEventListener("click", function(e){
			e.preventDefault();
			HideCatalogMenu();
		});
	});

	let mobileMenuBack = selectAll(".mobile-menu-back");
	mobileMenuBack.forEach(function(button){
		button.addEventListener("click", function(e){
			e.preventDefault();
			catalog.classList.remove(TOUCH_SELECTED_MENU_CLASS);
		});
	});


	// mobile menu toggle (mobile / mobile menu without catalog. Catalog is separated)

	let mobileButtons = selectAll(".mobile-menu-toggle");
	let mobileMenu = select("#mobileMenu");

	function ShowMobileMenu(){
		mobileButtons.forEach(function(button){
			button.classList.add("active");
		});
		mobileMenu.classList.add("active");
		document.body.classList.add("overlayed");
	}

	function HideMobileMenu(){
		mobileButtons.forEach(function(button){
			button.classList.remove("active");
		});
		mobileMenu.classList.remove("active");
		document.body.classList.remove("overlayed");
	}

	mobileButtons.forEach(function(button){
		button.addEventListener("click", function(e){
			e.preventDefault();
			console.log(button, mobileMenu);

			let isMenuOpened = mobileMenu.classList.contains("active");

			!isMenuOpened ? ShowMobileMenu() : HideMobileMenu();

		})
	});


	let mobileMenuClose = selectAll(".mobile-menu-close");
	mobileMenuClose.forEach(function(button){
		button.addEventListener("click", function(e){
			e.preventDefault();
			HideMobileMenu();
		});
	});

});
