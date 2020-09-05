var comida = (function () {
	var image = document.getElementById("comidaImage");
	var text = document.getElementById("comidaText");
	var buttonList = document.getElementById("comidaButtonList");
	var Category = function (images, text) {
		this.images = images;
		this.text = text;
	};
	var categories = [
		new Category(new ImageSwitcher(image, imageCache.list.cafe), ""),
		new Category(new ImageSwitcher(image, imageCache.list.janta), "O restaurante do Hotel Alvi oferece uma janta especial, exclusiva para hóspedes e reconhecida como uma das melhores da cidade.")
	];

	var currentCategory = -1;
	var queuedCategory = -1;

	var imageSwitch = function (direction) {
		categories[currentCategory].images.switch(direction);
	};

	var ANIMATION_TIME = 1000;
	var categorySwitch = async function (selected) {
		document.getElementById("comidaButtonListMenu").style.setProperty("display", "none");
		if (window.innerWidth / window.innerHeight <= 10 / 8) {
			buttonList.scrollTo({ left: buttonList.clientWidth * selected, top: 0, behavior: "smooth" });
		}
		if (image.style.getPropertyValue('animation') != 0) { //if animating, queue for execution when animation is done
			queuedCategory = selected;
			return;
		} else {
			if (currentCategory == selected) return;
			image.style.setProperty('animation', 'flip ' + ANIMATION_TIME/1000 + 's 1');
			text.style.setProperty('animation', 'fade ' + ANIMATION_TIME/1000 + 's 1');
			currentCategory = selected;
			setTimeout(function () {
				categories[currentCategory].images.switch(0);
				text.innerHTML = categories[currentCategory].text;
			}, ANIMATION_TIME/2);
			document.getElementsByClassName("comidaImageButton")[0].style.setProperty("display", "none");
			document.getElementsByClassName("comidaImageButton")[1].style.setProperty("display", "none");
			setTimeout(function () {
				document.getElementsByClassName("comidaImageButton")[0].style.setProperty("display", "initial");
				document.getElementsByClassName("comidaImageButton")[1].style.setProperty("display", "initial");
			}, ANIMATION_TIME);
		}
		setTimeout(function () { image.style.removeProperty('animation'); }, ANIMATION_TIME);
		setTimeout(function () { text.style.removeProperty('animation'); }, ANIMATION_TIME);
		setTimeout(function () { //check for and execute queued animation after current is done
			if (queuedCategory == -1) {
				return;
			} else {
				var queuedTemp = queuedCategory;
				queuedCategory = -1;
				categorySwitch(queuedTemp);
			}
		}, ANIMATION_TIME+50);
	};

	var aspectRatioTall = false;
	var aspectRatioCheck = function () {
		var newAspectRatioTall = window.innerWidth / window.innerHeight <= 10 / 8;
		if (aspectRatioTall != newAspectRatioTall) {
			aspectRatioTall = newAspectRatioTall;
			if (aspectRatioTall == false) {
				for (element of document.querySelectorAll("#comidaButtonList > div")) {
					element.setAttribute("onclick", "comida.categorySwitch(" + element.dataset.categoryId+ ");");
				}
			} else {
				for (element of document.querySelectorAll("#comidaButtonList > div")) {
					element.removeAttribute("onclick");
				}
				if (currentCategory >= 0) {
					categorySwitch(0);
				}
			}
		}
	};

	return {
		imageSwitch: imageSwitch,
		categorySwitch: categorySwitch,
		aspectRatioCheck: aspectRatioCheck
	}
})();

window.addEventListener("resize", comida.aspectRatioCheck);
comida.aspectRatioCheck();