var quartos = (function () {
	var page = document.getElementById("quartos");
	var slideButtons = [document.getElementById("quartosSlideButtonLeft"), document.getElementById("quartosSlideButtonRight")];
	var images = [
		new ImageSwitcher(page.children[0].children[1].children[2], ["imagens/apartamento_cama.jpg", "imagens/apartamento_banheiro_temp.jpg", "imagens/apartamento.jpg", "imagens/apartamento_frigobar.jpg", "imagens/apartamento_ar.jpg"]),
		new ImageSwitcher(page.children[1].children[1].children[2], ["imagens/quarto.jpg", "imagens/quarto_tv.jpg"])
	];

	var imageSwitch = function (type, direction) {
		images[type].switch(direction);
	}
	var imageSet = function (type, image) {
		if (image == images[type].images.length) {
			page.children[type].children[1].children[2].src = "imagens/cafe.jpg"; //café is a special case, to be skipped on imageSwitch
		} else {
			if (image == -1) {
				images[type].restore();
			} else {
				images[type].set(image);
			}
		}
	}
	var imageFix = function (type, image) {
		if (image == images[type].images.length) {
			comida.categorySwitch(0);
			setTimeout(function () { document.getElementById("comida").scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
			setTimeout(restore, 300);
		} else {
			images[type].fix(image);
			expand(type);
		}
	}
	var imageReset = function () {
		for (var i = 0; i < images.length; i++) {
			images[i].reset();
		}
	}

	var expand = function (side) {
		if (window.innerWidth <= 810) return;
		page.parentElement.children[0].style.setProperty("display", "flex");
		for (var i = 0; i < page.children.length; i++) {
			var currentDiv = page.children[i];
			if (i == side) {
				currentDiv.style.setProperty("min-width", "100%");
				currentDiv.style.setProperty("flex-direction", "row");
				currentDiv.style.setProperty("border-style", "none");
				currentDiv.children[1].style.setProperty("width", "initial");
				currentDiv.children[1].style.setProperty("height", "100%");
				currentDiv.children[1].style.borderLeft = "solid medium";
				currentDiv.children[1].children[2].style.setProperty("cursor", "initial");
				currentDiv.children[0].children[1].style.setProperty("columns", "1");
			} else {
				currentDiv.style.setProperty("display", "none");
			}
		}
	}
	var restore = function () {
		imageReset();
		if (window.innerWidth <= 810) return;
		page.parentElement.children[0].style.setProperty("display", "none");
		for (var i = 0; i < page.children.length; i++) {
			var currentDiv = page.children[i];
			currentDiv.style.setProperty("display", "flex");
			currentDiv.style.setProperty("min-width", "50%");
			currentDiv.style.setProperty("flex-direction", "column");
			currentDiv.style.setProperty("border-left-style", "solid");
			currentDiv.style.setProperty("border-right-style", "solid");
			currentDiv.children[1].style.setProperty("width", "100%");
			currentDiv.children[1].style.setProperty("height", "initial");
			currentDiv.children[1].style.borderLeft= "none";
			currentDiv.children[1].children[2].style.setProperty("cursor", "pointer");
			currentDiv.children[0].children[1].style.setProperty("columns", "2");
		}
	}

	var slide = function (side) {
		slideButtons[side].style.display = "none";
		slideButtons[(side - 1) * -1].style.display = "flex"; //(side-1)*-1 = opposite side
		page.children[side].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}

	return {
		imageSwitch: imageSwitch,
		imageSet: imageSet,
		imageFix: imageFix,
		expand: expand,
		restore: restore,
		slide: slide
	}
})();