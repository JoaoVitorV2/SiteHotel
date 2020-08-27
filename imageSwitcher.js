class ImageSwitcher {
	constructor(imageObject, images) {
		this.imageObject = imageObject;
		this.images = images;
		this.current = 0;
		this.fixed = 0;
	}

	switch(direction) {
		this.current += direction;
		if (this.current > this.images.length - 1) {
			this.current = 0;
		} else if (this.current < 0) {
			this.current = this.images.length - 1;
		}
		this.fix(this.current);
	}
	set(image) {
		this.current = image;
		this.imageObject.src = this.images[this.current];
	}
	fix(image) {
		this.fixed = image;
		this.set(this.fixed);
	}
	restore() {
		this.current = this.fixed;
		this.imageObject.src = this.images[this.current];
	}
	reset() {
		this.fixed = 0;
		this.restore();
	}
};