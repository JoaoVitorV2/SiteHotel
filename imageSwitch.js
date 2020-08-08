var comidaImage;
var comidaText;

document.addEventListener('DOMContentLoaded', restauranteInitialize);

var restauranteFotos = ['imagens/restaurante.jpg', 'imagens/cafe.jpg', 'imagens/janta.jpg'];
var restauranteTextos = [
	"TEXTO RESTAURANTE",
	"TEXTO CAFE",
	"TEXTO JANTA"
];

function restauranteInitialize() {
	comidaImage = document.getElementById('comidaImage');
	comidaText = document.getElementById('comidaText');
}

var comidaQueued = -1;
var comidaCurrent = 0;
async function comidaCategorySwitch(selected) {
	if (comidaImage.style.getPropertyValue('animation')!=0) {
		comidaQueued = selected;
		return;
	} else {
		if (comidaCurrent == selected) return;
		comidaImage.style.setProperty('animation', 'flip 1s 1');
		comidaText.style.setProperty('animation', 'fade 1s 1');
		comidaCurrent = selected;
		setTimeout(function () {
			comidaImage.src = restauranteFotos[selected];
			comidaText.innerHTML = restauranteTextos[selected];
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
	setTimeout(function () { comidaImage.style.removeProperty('animation'); }, 1000);
	setTimeout(function () { comidaText.style.removeProperty('animation'); }, 1000);
	setTimeout(function () {
		if (comidaQueued == -1) {
			return;
		} else {
			var queuedTemp = comidaQueued;
			comidaQueued = -1;
			comidaCategorySwitch(queuedTemp);
		}
	}, 1050);
}

var quartosOriginalImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"];
var quartosFixedImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"]; //using variable will copy by reference
function quartosImageSwitch(type, image = quartosFixedImage[type]) { //no argument = reset to fixed image
	document.getElementById("quartos").children[type].children[1].src = image;
}
function quartosImageFix(type, image) {
	if (image == quartosFixedImage[type] && image == 'imagens/cafe.jpg') {
		setTimeout(function () { document.getElementById("comida").scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 200);
		comidaCategorySwitch(1);
		quartosImageReset();
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