var comida = (function (){
	var image = document.getElementById("comidaImage");
	var text = document.getElementById("comidaText");
	var categories = [
		[["imagens/restaurante.jpg"], "TEXTO RESTAURANTE"],
		[["imagens/cafe.jpg", "imagens/cafe2.jpg"], "TEXTO CAFE"],
		[["imagens/janta.jpg", "imagens/janta2.jpg"], "TEXTO JANTA"]
	];

	var currentImage = 0;
	var currentCategory = 0;
	var queuedCategory = -1;

	var imageSwitch = function (direction) {
		if (currentCategory == 0) {
			console.error("Multiple images disabled for current item.");
		} else {
			if (direction != 1 && direction != -1) {
				console.error("Invalid direction.");
				return;
			}
			currentImage += direction;
			if (currentImage > categories[currentCategory][0].length - 1) {
				currentImage = 0;
			} else if (currentImage < 0) {
				currentImage = categories[currentCategory][0].length - 1;
			}
			image.src = categories[currentCategory][0][currentImage];
		}
	};

	var categorySwitch = async function (selected) {
		if (image.style.getPropertyValue('animation') != 0) { //if animating, queue for execution when animation is done
			queuedCategory = selected;
			return;
		} else {
			if (currentCategory == selected) return;
			image.style.setProperty('animation', 'flip 1s 1');
			text.style.setProperty('animation', 'fade 1s 1');
			currentCategory = selected;
			setTimeout(function () {
				image.src = categories[currentCategory][0][0];
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
		setTimeout(function () { image.style.removeProperty('animation'); }, 1000);
		setTimeout(function () { text.style.removeProperty('animation'); }, 1000);
		setTimeout(function () { //check for and execute queued animation after current is done
			if (queuedCategory == -1) {
				return;
			} else {
				var queuedTemp = queuedCategory;
				queuedCategory = -1;
				categorySwitch(queuedTemp);
			}
		}, 1050);
	};

	return {
		imageSwitch: imageSwitch,
		categorySwitch: categorySwitch
	}
})();