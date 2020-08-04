document.addEventListener('DOMContentLoaded', initializeScroll);
window.addEventListener('scroll', decideShowScrollToTop);
window.addEventListener('scroll', decideShowIndicator);

var scrollToTopButton;
var pagesIndicator;
var pages;

function initializeScroll() {
	scrollToTopButton = document.getElementById('scrollToTopButton');
	pagesIndicator = document.getElementById('currentPageIndicator');
	pages = document.getElementsByClassName('page');
}

function decideShowScrollToTop() {
	if (document.getElementById('navbar').getBoundingClientRect().bottom < 0) {
		scrollToTopButton.style.setProperty('display', 'flex');
	} else {
		scrollToTopButton.style.setProperty('display', 'none');
	}
}

function decideShowIndicator() {
	if (pages[0].getBoundingClientRect().bottom < window.innerHeight) {
		checkCurrentPage();
		pagesIndicator.style.setProperty('display', 'flex');
	} else {
		pagesIndicator.style.setProperty('display', 'none');
	}
}

var TOLERANCE = window.innerHeight * 0.25;
function checkCurrentPage() {
	for (var i = 0; i < pages.length; i++) {
		if (pages[i].getBoundingClientRect().top+TOLERANCE > 0 && pages[i].getBoundingClientRect().bottom-TOLERANCE < window.innerHeight) {
			setCurrentPage(i);
			break;
		}
	}
}

var currentPage = 0;
function setCurrentPage(page) {
	if (page != currentPage) {
		pagesIndicator.children[currentPage].children[0].style.setProperty('border-color', '#FFFFFF');
		pagesIndicator.children[page].children[0].style.setProperty('border-color', '#C0C0C0');
		currentPage = page;
	}
}