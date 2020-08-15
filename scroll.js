var scrollToTopButton = (function () {
	var element = document.getElementById('scrollToTopButton');
	var navbar = document.getElementById('navbar');

	var decideShow = function () {
		if (navbar.getBoundingClientRect().bottom < 0) {
			element.style.setProperty('display', 'flex');
		} else {
			element.style.setProperty('display', 'none');
		}
	}
	return {
		decideShow: decideShow
	}
})();

var scrollPagesIndicator = (function () {
	var element = document.getElementById('currentPageIndicator');
	var pages = document.getElementsByClassName('page');
	var tolerance = window.innerHeight * 0.25;
	var currentPage = 0;

	var decideShow = function () {
		if (pages[0].getBoundingClientRect().bottom < window.innerHeight) {
			checkCurrentPage();
			element.style.setProperty('display', 'flex');
		} else {
			element.style.setProperty('display', 'none');
		}
	}
	var checkCurrentPage = function () {
		for (var i = 0; i < pages.length; i++) {
			if (pages[i].getBoundingClientRect().top + tolerance > 0 && pages[i].getBoundingClientRect().bottom - tolerance < window.innerHeight) {
				setPage(i);
				break;
			}
		}
	}
	var setPage = function (page) {
		if (page != currentPage) {
			element.children[currentPage].children[0].style.setProperty('border-color', '#FFFFFF');
			element.children[page].children[0].style.setProperty('border-color', '#C0C0C0');
			currentPage = page;
		}
	}

	return {
		decideShow: decideShow
	}
})();

window.addEventListener('scroll', scrollToTopButton.decideShow);
window.addEventListener('scroll', scrollPagesIndicator.decideShow);