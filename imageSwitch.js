var foto;
var fotoContainer;
var textoImagem;
var queued = -1;
var current = 1;
document.addEventListener('DOMContentLoaded', initializeIS);

var fotos = ['imagens/quarto.jpg', 'imagens/sala.jpg', 'imagens/restaurante.jpg'];
var textos = [
	"TEXTO QUARTO",
	"TEXTO SALA",
	"TEXTO RESTAURANTE"
];

function initializeIS() {
	foto = document.getElementById('foto');
	fotoContainer = document.getElementById('fotoContainer');
	textoImagem = document.getElementById('textoImagem');
}

async function imageSwitch(selected) {
	if (fotoContainer.style.getPropertyValue('animation')!=0) {
		queued = selected;
		return;
	} else {
		if (current == selected) return;
		fotoContainer.style.setProperty('animation', 'flip 1s 1');
		textoImagem.style.setProperty('animation', 'fade 1s 1');
		current = selected;
		setTimeout(function () {
			foto.src = fotos[selected];
			textoImagem.innerHTML = textos[selected];
		}, 500);
	}
	setTimeout(function () { fotoContainer.style.removeProperty('animation'); }, 1000);
	setTimeout(function () { textoImagem.style.removeProperty('animation'); }, 1000);
	setTimeout(function () {
		if (queued == -1) {
			return;
		} else {
			var queuedTemp = queued;
			queued = -1;
			imageSwitch(queuedTemp);
		}
	}, 1050);
}

function quartosImageSwitch(type, image) {
	document.getElementById("quartos").children[type].children[1].src = image;
}