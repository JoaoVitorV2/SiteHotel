var scrollToTopButton = (function () {
	var element = document.getElementById('scrollToTopButton');
	var navbar = document.getElementById('navbar');

	var decideShow = function () {
		if (navbar.getBoundingClientRect().bottom < 0 && (window.innerWidth > 1300 && window.innerWidth / window.innerHeight>10/8)) {
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
	var container = document.getElementById('currentPageIndicator');
	var element = document.getElementById('currentPageIndicatorBody');
	var arrow = document.getElementById('currentPageIndicatorShow');
	var pages = document.getElementsByClassName('page');
	var tolerance = window.innerHeight * 0.25;
	var currentPage = 0;
	var manualHidden = true;//independent from scroll, dependent from user interaction on small screens

	var decideShow = function () {
		if (pages[0].getBoundingClientRect().bottom < window.innerHeight) {
			checkCurrentPage();
			container.style.setProperty('display', 'flex');
		} else {
			container.style.setProperty('display', 'none');
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

	var slide = function () {
		if (manualHidden) {
			container.style.width = "min-content";
			element.style.flex="1";
			arrow.style.transform="scaleX(-1)";
		} else {
			element.style.flex = "0";
			arrow.style.transform = "scaleX(1)";
			setTimeout(function () {
				container.style.width = "1em";
			}, 1000);
		}
		manualHidden = !manualHidden;
	}

	return {
		decideShow: decideShow,
		slide: slide
	}
})();

function scrollToPage(page){
	var OFFSET = 35;
	var current = document.documentElement.scrollTop;
	var target = document.documentElement.scrollTop + page.getBoundingClientRect().y - OFFSET;
	window.scrollTo({ top: target, behavior:"smooth", block: "start" });
}

window.addEventListener('scroll', scrollToTopButton.decideShow);
window.addEventListener('scroll', scrollPagesIndicator.decideShow);
window.addEventListener('resize', scrollToTopButton.decideShow);