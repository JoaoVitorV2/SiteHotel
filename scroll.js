document.addEventListener('DOMContentLoaded', scrollInitialize);
window.addEventListener('scroll', scrollDecideShowScrollToTop);
window.addEventListener('scroll', scrollDecideShowPagesIndicator);

var scrollToTopButton;
var scrollPagesIndicator;
var scrollPages;

function scrollInitialize() {
	scrollToTopButton = document.getElementById('scrollToTopButton');
	scrollPagesIndicator = document.getElementById('currentPageIndicator');
	scrollPages = document.getElementsByClassName('page');
}

function scrollDecideShowScrollToTop() {
	if (document.getElementById('navbar').getBoundingClientRect().bottom < 0) {
		scrollToTopButton.style.setProperty('display', 'flex');
	} else {
		scrollToTopButton.style.setProperty('display', 'none');
	}
}
function scrollDecideShowPagesIndicator() {
	if (scrollPages[0].getBoundingClientRect().bottom < window.innerHeight) {
		scrollCheckCurrentPage();
		scrollPagesIndicator.style.setProperty('display', 'flex');
	} else {
		scrollPagesIndicator.style.setProperty('display', 'none');
	}
}

var SCROLL_TOLERANCE = window.innerHeight * 0.25;
function scrollCheckCurrentPage() {
	for (var i = 0; i < scrollPages.length; i++) {
		if (scrollPages[i].getBoundingClientRect().top+SCROLL_TOLERANCE > 0 && scrollPages[i].getBoundingClientRect().bottom-SCROLL_TOLERANCE < window.innerHeight) {
			scrollSetCurrentPage(i);
			break;
		}
	}
}
var scrollCurrentPage = 0;
function scrollSetCurrentPage(page) {
	if (page != scrollCurrentPage) {
		scrollPagesIndicator.children[scrollCurrentPage].children[0].style.setProperty('border-color', '#FFFFFF');
		scrollPagesIndicator.children[page].children[0].style.setProperty('border-color', '#C0C0C0');
		scrollCurrentPage = page;
	}
}