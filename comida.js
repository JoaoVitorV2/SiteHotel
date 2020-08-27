var comida = (function () {
	var image = document.getElementById("comidaImage");
	var text = document.getElementById("comidaText");
	var buttonList = document.getElementById("comidaButtonList");
	var categories = [
		[new ImageSwitcher(image,["imagens/restaurante.jpg"]), "TEXTO RESTAURANTE"],
		[new ImageSwitcher(image,["imagens/cafe.jpg", "imagens/cafe2.jpg"]), "TEXTO CAFE"],
		[new ImageSwitcher(image,["imagens/janta.jpg", "imagens/janta2.jpg"]), "TEXTO JANTA"]
	];

	var currentCategory = 0;
	var queuedCategory = -1;

	var imageSwitch = function (direction) {
		if (currentCategory == 0) {
			console.error("Multiple images disabled for current item.");
		} else {
			categories[currentCategory][0].switch(direction);
		}
	};

	var ANIMATION_TIME = 1000;
	var categorySwitch = async function (selected) {
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
				categories[currentCategory][0].switch(0);
				text.innerHTML = categories[currentCategory][1];
			}, 500);
			document.getElementsByClassName("comidaImageButton")[0].style.setProperty("display", "none");
			document.getElementsByClassName("comidaImageButton")[1].style.setProperty("display", "none");
			if (selected != 0) { //selected=0 has only one image
				setTimeout(function () {
					document.getElementsByClassName("comidaImageButton")[0].style.setProperty("display", "initial");
					document.getElementsByClassName("comidaImageButton")[1].style.setProperty("display", "initial");
				}, 1000);
			}
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
		if (!(aspectRatioTall == newAspectRatioTall)) {
			aspectRatioTall = newAspectRatioTall;
			if (aspectRatioTall == false) {
				for (element of document.querySelectorAll("#comidaButtonList > div")) {
					element.setAttribute("onclick", "comida.categorySwitch(" + element.dataset.categoryId+ ");");
				}
			} else {
				for (element of document.querySelectorAll("#comidaButtonList > div")) {
					element.removeAttribute("onclick");
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