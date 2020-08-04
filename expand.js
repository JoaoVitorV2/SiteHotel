var quartosPage;

document.addEventListener('DOMContentLoaded', initializeExpand);

function initializeExpand(){
	quartosPage = document.getElementById("quartos");
}

function quartosExpand(side) {
	quartosPage.parentElement.children[0].style.setProperty("display", "initial");
	for (var i = 0; i < quartosPage.children.length; i++) {
		var currentDiv = quartosPage.children[i];
		if (i == side) {
			currentDiv.style.setProperty("width", "100%");
			currentDiv.style.setProperty("flex-direction", "row");
			currentDiv.style.setProperty("border-style", "none");
			currentDiv.children[1].style.setProperty("width", "init");
			currentDiv.children[1].style.setProperty("max-height", "100%");
			currentDiv.children[1].style.setProperty("border-left-style", "solid");
			currentDiv.children[1].style.setProperty("cursor", "initial");
			currentDiv.children[0].children[1].children[0].style.setProperty("columns", "1");
		} else {
			currentDiv.style.setProperty("display", "none");
		}
	}
}

function quartosRestore() {
	quartosPage.parentElement.children[0].style.setProperty("display", "none");
	for (var i = 0; i < quartosPage.children.length; i++) {
		var currentDiv = quartosPage.children[i];
		currentDiv.style.setProperty("display", "flex");
		currentDiv.style.setProperty("width", "50%");
		currentDiv.style.setProperty("flex-direction", "column");
		currentDiv.style.setProperty("border-left-style", "solid");
		currentDiv.style.setProperty("border-right-style", "solid");
		currentDiv.children[1].style.setProperty("width", "100%");
		currentDiv.children[1].style.setProperty("max-height", "init");
		currentDiv.children[1].style.setProperty("border-left-style", "none");
		currentDiv.children[1].style.setProperty("cursor", "pointer");
		currentDiv.children[0].children[1].children[0].style.setProperty("columns", "2");
		
	}
	quartosImageReset();
}