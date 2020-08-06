var restauranteFoto;
var restauranteTexto;

document.addEventListener('DOMContentLoaded', restauranteInitialize);

var restauranteFotos = ['imagens/restaurante.jpg', 'imagens/cafe.jpg', 'imagens/janta.jpg'];
var restauranteTextos = [
	"TEXTO RESTAURANTE",
	"TEXTO CAFE",
	"TEXTO JANTA"
];

function restauranteInitialize() {
	restauranteFoto = document.getElementById('restauranteFoto');
	restauranteTexto = document.getElementById('restauranteTexto');
}

var restauranteQueued = -1;
var restauranteCurrent = 0;
async function restauranteImageSwitch(selected) {
	if (restauranteFoto.style.getPropertyValue('animation')!=0) {
		restauranteQueued = selected;
		return;
	} else {
		if (restauranteCurrent == selected) return;
		restauranteFoto.style.setProperty('animation', 'flip 1s 1');
		restauranteTexto.style.setProperty('animation', 'fade 1s 1');
		restauranteCurrent = selected;
		setTimeout(function () {
			restauranteFoto.src = restauranteFotos[selected];
			restauranteTexto.innerHTML = restauranteTextos[selected];
		}, 500);
	}
	setTimeout(function () { restauranteFoto.style.removeProperty('animation'); }, 1000);
	setTimeout(function () { restauranteTexto.style.removeProperty('animation'); }, 1000);
	setTimeout(function () {
		if (restauranteQueued == -1) {
			return;
		} else {
			var queuedTemp = restauranteQueued;
			restauranteQueued = -1;
			restauranteImageSwitch(queuedTemp);
		}
	}, 1050);
}

var quartosOriginalImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"];
var quartosFixedImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"]; //using variable will copy by reference
function quartosImageSwitch(type, image = quartosFixedImage[type]) { //no argument = reset to fixed image
	document.getElementById("quartos").children[type].children[1].src = image;
}
function quartosImageFix(type, image) {
	quartosFixedImage[type] = image;
	quartosImageSwitch(type, image);
	quartosExpand(type);
}
function quartosImageReset() {
	for (var i = 0; i < quartosOriginalImage.length; i++) {
		quartosFixedImage[i] = quartosOriginalImage[i].valueOf();
		quartosImageSwitch(i);
	}
	
}