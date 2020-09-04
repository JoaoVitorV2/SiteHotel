var imageCache = (function() {
	var list = {
		ap: ["imagens/apartamento_cama.jpg", "imagens/apartamento_banheiro_temp.jpg", "imagens/apartamento.jpg", "imagens/apartamento_frigobar.jpg", "imagens/apartamento_ar.jpg"],
		qt: ["imagens/quarto.jpg", "imagens/quarto_tv.jpg"],
		cafe: ["imagens/cafe.jpg", "imagens/cafe2.jpg"],
		janta: ["imagens/janta.jpg", "imagens/janta2.jpg"]
	};
	var essentials = ["imagens/logo.jpg", "imagens/vista.jpg"];

	var load = function () {
		for (i = 0; i < essentials.length; i++) {
			var img = new Image();
			img.onload = imageCache.checkEssentialsLoaded;
			img.src = essentials[i];
		}
	}
	var checkEssentialsLoaded = function () {
		if (typeof checkEssentialsLoaded.count == "undefined") {
			checkEssentialsLoaded.count = 0;
		}
		checkEssentialsLoaded.count++;
		if (checkEssentialsLoaded.count == essentials.length) {
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
		checkEssentialsLoaded: checkEssentialsLoaded,
		loadRest: loadRest
	}
})();

imageCache.load();

