var imageCache = (function() {
	var list = {
		ap: ["imagens/apartamento_cama.jpg", "imagens/apartamento_banheiro_temp.jpg", "imagens/apartamento.jpg", "imagens/apartamento_frigobar.jpg", "imagens/apartamento_ar.jpg"],
		qt: ["imagens/quarto.jpg", "imagens/quarto_tv.jpg"],
		cafe: ["imagens/cafe.jpg", "imagens/cafe2.jpg"],
		janta: ["imagens/janta.jpg", "imagens/janta2.jpg"]
	};
	var essentials = ["imagens/logo.jpg", "imagens/vista.jpg"];

	var load = function () {
		for (i = 0; i < essentials.size; i++) {
			var img = new Image();
			img.src = essentials[i];
			img.onload = imageCache.checkEssentialsLoaded;
		}
	}
	var checkEssentialsLoaded = function () {
		if (typeof checkEssentialsLoaded.count == "undefined") {
			checkEssentialsLoaded.count = 0;
		}
		checkEssentialsLoaded.count++;
		if (checkEssentialsLoaded == essentials.size) {
			loadRest();
		}
	}
	var loadRest = function () {
		for (var arr in list) {
			list[arr].forEach((url) => { var img = new Image(); img.src = url; });
		}
	}

	return {
		list: list,
		load: load,
		checkEssentialsLoaded: checkEssentialsLoaded
	}
})();

imageCache.load();

