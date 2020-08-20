var quartos = (function () {
	var page = document.getElementById("quartos");
	var originalImages = ["imagens/apartamento.jpg", "imagens/quarto.jpg"];
	var fixedImages = ["imagens/apartamento.jpg", "imagens/quarto.jpg"]; //using variable instead of repeating will assign by reference
	var slideButtons = [document.getElementById("quartosSlideButtonLeft"), document.getElementById("quartosSlideButtonRight")];

	var imageSwitch = function (type, image = fixedImages[type]) {
		page.children[type].children[1].src = image;
	}
	var imageFix = function (type, image) {
		if (image == fixedImages[type] && image == 'imagens/cafe.jpg') {
			comida.categorySwitch(1);
			setTimeout(function () { document.getElementById("comida").scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
			setTimeout(restore, 300);
		} else {
			fixedImages[type] = image;
			imageSwitch(type, image);
			expand(type);
		}
	}
	var imageReset = function () {
		for (var i = 0; i < originalImages.length; i++) {
			fixedImages[i] = originalImages[i].valueOf();
			imageSwitch(i);
		}
	}

	var expand = function (side) {
		if (window.innerWidth <= 810) return;
		page.parentElement.children[0].style.setProperty("display", "flex");
		for (var i = 0; i < page.children.length; i++) {
			var currentDiv = page.children[i];
			if (i == side) {
				currentDiv.style.setProperty("width", "100%");
				currentDiv.style.setProperty("flex-direction", "row");
				currentDiv.style.setProperty("border-style", "none");
				currentDiv.children[1].style.setProperty("width", "initial");
				currentDiv.children[1].style.setProperty("height", "100%");
				currentDiv.children[1].style.setProperty("border-left-style", "solid");
				currentDiv.children[1].style.setProperty("cursor", "initial");
				currentDiv.children[0].children[1].style.setProperty("columns", "1");
			} else {
				currentDiv.style.setProperty("display", "none");
			}
		}
	}
	var restore = function () {
		if (window.innerWidth <= 810) return;
		page.parentElement.children[0].style.setProperty("display", "none");
		for (var i = 0; i < page.children.length; i++) {
			var currentDiv = page.children[i];
			currentDiv.style.setProperty("display", "flex");
			currentDiv.style.setProperty("width", "50%");
			currentDiv.style.setProperty("flex-direction", "column");
			currentDiv.style.setProperty("border-left-style", "solid");
			currentDiv.style.setProperty("border-right-style", "solid");
			currentDiv.children[1].style.setProperty("width", "100%");
			currentDiv.children[1].style.setProperty("height", "initial");
			currentDiv.children[1].style.setProperty("border-left-style", "none");
			currentDiv.children[1].style.setProperty("cursor", "pointer");
			currentDiv.children[0].children[1].style.setProperty("columns", "2");
		}
		imageReset();
	}

	var slide = function (side) {
		slideButtons[side].style.display = "none";
		slideButtons[(side - 1) * -1].style.display = "flex"; //(side-1)*-1 = opposite side
		page.children[side].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}

	return {
		imageSwitch: imageSwitch,
		imageFix: imageFix,
		expand: expand,
		restore: restore,
		slide: slide
	}
})();