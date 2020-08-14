var comidaFotos = ['imagens/restaurante.jpg', 'imagens/cafe.jpg', 'imagens/janta.jpg'];
var comidaTextos = [
	"TEXTO RESTAURANTE",
	"TEXTO CAFE",
	"TEXTO JANTA"
];

class ImageSwitcher {
	constructor(id, images) {
		this.element = document.getElementById(id);
		this.image = this.element.children[1].children[0];
		this.images = images;
		this.currentImage = 0;
	}
	change(direction) {
		if (direction != 1 && direction != -1) {
			console.error("Invalid direction.");
			return;
		}
		this.currentImage += direction;
		if (this.currentImage > this.images.length - 1) {
			this.currentImage = 0;
		} else if (this.currentImage < 0) {
			this.currentImage = this.images.length - 1;
		}
		this.image.src = this.images[this.currentImage];
	}
}

comidaImage = document.getElementById('comidaImage'); //execution of script is deferred
comidaText = document.getElementById('comidaText');
var comidaSections = new Array(3);
//comidaSections[0] temporarily disabled (only one picture)
comidaSections[1] = new ImageSwitcher("comida", ["imagens/cafe.jpg", "imagens/cafe2.jpg"]);
comidaSections[2] = new ImageSwitcher("comida", ["imagens/janta.jpg", "imagens/janta2.jpg"]);

/*document.addEventListener('DOMContentLoaded', comidaInitialize);
var comidaSections = new Array(3);
var comidaImage;
var comidaText;

function comidaInitialize() {
	comidaSections[1] = new ImageSwitcher("comida", ["imagens/cafe.jpg", "imagens/cafe2.jpg"]);
	comidaSections[2] = new ImageSwitcher("comida", ["imagens/janta.jpg", "imagens/janta2.jpg"]);
	comidaImage = document.getElementById('comidaImage');
	comidaText = document.getElementById('comidaText');
}*/ //if execution of script is not deferred

function comidaImageSwitch(direction) {
	if (comidaCurrent == 0) {
		console.error("Multiple images disabled for current item.");
	} else {
		comidaSections[comidaCurrent].change(direction);
	}
}

let comidaQueued = -1;
let comidaCurrent = 0;
async function comidaCategorySwitch(selected) {
	if (comidaImage.style.getPropertyValue('animation') != 0) {
		comidaQueued = selected;
		return;
	} else {
		if (comidaCurrent == selected) return;
		comidaImage.style.setProperty('animation', 'flip 1s 1');
		comidaText.style.setProperty('animation', 'fade 1s 1');
			comidaCurrent = selected;
		setTimeout(function () {
			comidaImage.src = comidaFotos[selected];
		comidaText.innerHTML = comidaTextos[selected];
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