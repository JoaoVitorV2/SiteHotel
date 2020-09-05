var imageCache = (function() {
	var list = {
		//logo: ["imagens/logo.jpg"],
		vista: ["imagens/vista.jpg"],
		ap: ["imagens/apartamento_cama.jpg", "imagens/apartamento_banheiro_temp.jpg", "imagens/apartamento.jpg", "imagens/apartamento_frigobar.jpg", "imagens/apartamento_ar.jpg"],
		qt: ["imagens/quarto.jpg", "imagens/quarto_tv.jpg"],
		cafe: ["imagens/cafe.jpg", "imagens/cafe2.jpg"],
		janta: ["imagens/janta.jpg", "imagens/janta2.jpg"]
	};

	var imageCount = 0;
	var load = function () {
		for (var arr in list) {
			list[arr].forEach((url) => {
				var img = new Image();
				img.onload = imageCache.checkLoaded;
				img.src = url;
				imageCount++;
			});
		}
	}
	var checkLoaded = function () {
		if (typeof checkLoaded.count == "undefined") {
			checkLoaded.count = 0;
		}
		checkLoaded.count++;
		if (checkLoaded.count == imageCount) {
			document.querySelectorAll(".page").forEach((element) => { element.style.opacity = "1"; });
			//TODO: loading screen instead of blank page
		}
	}

	return {
		list: list,
		load: load,
		checkLoaded: checkLoaded,
	}
})();

imageCache.load();

