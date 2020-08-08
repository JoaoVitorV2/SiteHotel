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

var comidaSections = new Array(3);

document.addEventListener('DOMContentLoaded', comidaInitialize);

function comidaInitialize() {
	comidaSections[1] = new ImageSwitcher("restaurante", ["imagens/cafe.jpg", "imagens/cafe2.jpg"]);
	comidaSections[2] = new ImageSwitcher("restaurante", ["imagens/janta.jpg", "imagens/janta2.jpg"]);
}

function comidaImageSwitch(direction) {
	if (comidaCurrent == 0) {
		console.error("Multiple images disabled for current item.");
	} else {
		comidaSections[comidaCurrent].change(direction);
	}
}