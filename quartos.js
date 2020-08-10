/*document.addEventListener('DOMContentLoaded', quartosInitialize);
function quartosInitialize() {
	quartosPage = document.getElementById("quartos");
}*/ // if execution of script is not deferred

quartosPage = document.getElementById("quartos"); //execution of script is deferred

var quartosOriginalImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"];
var quartosFixedImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"]; //using variable instead of repeating will copy by reference
function quartosImageSwitch(type, image = quartosFixedImage[type]) { //no argument = reset to fixed image
	quartosPage.children[type].children[1].src = image;
}
function quartosImageFix(type, image) {
	if (image == quartosFixedImage[type] && image == 'imagens/cafe.jpg') {
		comidaCategorySwitch(1);
		setTimeout(function () { document.getElementById("comida").scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
		setTimeout(quartosRestore, 300);
		
	} else {
		quartosFixedImage[type] = image;
		quartosImageSwitch(type, image);
		quartosExpand(type);
	}
}
function quartosImageReset() {
	for (var i = 0; i < quartosOriginalImage.length; i++) {
		quartosFixedImage[i] = quartosOriginalImage[i].valueOf();
		quartosImageSwitch(i);
	}
}

var quartosPage;
function quartosExpand(side) {
	quartosPage.parentElement.children[0].style.setProperty("display", "flex");
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