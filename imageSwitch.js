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

var quartosOriginalImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"];
var quartosFixedImage = ["imagens/apartamento.jpg", "imagens/quarto.jpg"]; //using variable will copy by reference
function quartosImageSwitch(type, image = quartosFixedImage[type]) { //no argument = reset to fixed image
	document.getElementById("quartos").children[type].children[1].src = image;
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