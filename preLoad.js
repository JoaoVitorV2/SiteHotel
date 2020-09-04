let imageCache = {
	ap: ["imagens/apartamento_cama.jpg", "imagens/apartamento_banheiro_temp.jpg", "imagens/apartamento.jpg", "imagens/apartamento_frigobar.jpg", "imagens/apartamento_ar.jpg"],
	qt: ["imagens/quarto.jpg", "imagens/quarto_tv.jpg"],
	cafe: ["imagens/cafe.jpg", "imagens/cafe2.jpg"],
	janta: ["imagens/janta.jpg", "imagens/janta2.jpg"]
};

for (var arr in imageCache) {
	arr.forEach((url) => { var img = new Image(); img.src = url; });
}
