// menu hover navigation
document.addEventListener("DOMContentLoaded", function() {
	const ACTIVE_HEADER_CLASS = 'menu-active';

	const ACTIVE_TAB_CLASS = 'active';
	const ACTIVE_MENU_CLASS = 'active';

	const TOUCH_ACTIVE_TAB_CLASS = 'touch-active';
	const TOUCH_ACTIVE_MENU_CLASS = 'touch-active';
	const TOUCH_SELECTED_MENU_CLASS = 'touch-offset';

	const headerContainer = document.getElementById('mainHeader');

	let select = function(selector, parent){
		return (parent || document).querySelector(selector);
	};
	let selectAll = function(selector, parent){
		return [].slice.call((parent || document).querySelectorAll(selector));
	};
	let navigations = selectAll('[data-hover-show]');

	for (let i = 0; i < navigations.length; i++) {
		let navigation = navigations[i];
		let escapeContainer = select(navigation.dataset.escapeContainer);
		let buttons = selectAll('li', navigation);
		let targetId = navigation.dataset.hoverShow;

		let tabsContainer = select(targetId);

		if (escapeContainer) {
			escapeContainer.addEventListener('mouseleave', function(){
				tabsContainer.classList.remove(ACTIVE_MENU_CLASS);
				headerContainer.classList.remove(ACTIVE_HEADER_CLASS);
			});
		};

		let tabs = selectAll(`${targetId} .menu-tab`);

		let hideAll = function(collection){
			headerContainer.classList.remove(ACTIVE_HEADER_CLASS);
			collection.forEach(function(item){
				item.classList.remove(ACTIVE_TAB_CLASS);
			});
		};

		let show = function(collection, targetIndex) {
			for (let i = 0; i < collection.length; i++) {
				let tabItem = collection[i];
				let tabHoverIndex = tabItem.dataset.tabIndex;
				if (!targetIndex || !tabHoverIndex) return;
				if (targetIndex == tabHoverIndex) {
					headerContainer.classList.add(ACTIVE_HEADER_CLASS);
					tabsContainer.classList.add(ACTIVE_MENU_CLASS);
					tabItem.classList.add(ACTIVE_TAB_CLASS);
					break;
				}
			}
		};

		for (let i = 0; i < buttons.length; i++) {
			let button = buttons[i];
			button.addEventListener('mouseenter', function(e){
				e.preventDefault();
				let targetIndex = button.dataset.tabHover;
				hideAll(tabs);
				show(tabs, targetIndex);
			});
			button.addEventListener('touchstart', function(e){
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				let targetIndex = button.dataset.tabHover;
				hideAll(tabs);
				show(tabs, targetIndex);
				navigation.classList.add(TOUCH_ACTIVE_MENU_CLASS);
				tabsContainer.classList.add(TOUCH_ACTIVE_MENU_CLASS);
				catalog.classList.add(TOUCH_SELECTED_MENU_CLASS);
			});
		};



	}

});
