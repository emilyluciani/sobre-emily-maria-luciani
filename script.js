const botoesAlternar = document.querySelectorAll('.botao-alternar');

botoesAlternar.forEach((botao) => {
  const texto = botao.closest('.card-conteudo').querySelector('.texto-longo');

  botao.addEventListener('click', function() {
    if (texto.style.display === 'none') {
      texto.style.display = 'inline';
      botao.textContent = 'Leia menos';
    } else {
      texto.style.display = 'none';
      botao.textContent = 'Leia mais';
    }
  });
});


const cards = document.getElementById("cards");

const anterior = document.getElementById("anterior");

const proxima = document.getElementById("proxima");

const bolinhas = document.querySelectorAll(".bolinha");

let indice = 0;


// Quantidade de cards visíveis

function quantidadeVisivel() {

    if (window.innerWidth <= 700) {
        return 1;
    }

    if (window.innerWidth <= 1200) {
        return 2;
    }

    return 3;

}



function ajustarLarguraCards() {

    const janela = document.querySelector(".carrossel-janela");

    const visiveis = quantidadeVisivel();

    const gap = parseFloat(
        getComputedStyle(cards).gap
    ) || 0;

    const larguraDisponivel = janela.clientWidth;

    const larguraCard =
        (larguraDisponivel - gap * (visiveis - 1)) / visiveis;

    Array.from(cards.children).forEach((card) => {
        card.style.width = `${larguraCard}px`;
        card.style.minWidth = `${larguraCard}px`;
    });

}

function atualizarCarrossel() {

    const largura = cards.children[0].offsetWidth;

    const gap = parseFloat(
        getComputedStyle(cards).gap
    );

    const deslocamento = indice * (largura + gap);

    cards.style.transform =
        `translateX(-${deslocamento}px)`;


    // Atualiza as bolinhas

    bolinhas.forEach((bolinha, i) => {

        bolinha.classList.toggle(
            "ativa",
            i === indice
        );

    });

}


proxima.addEventListener("click", () => {

    const totalCards = cards.children.length;

    const visiveis = quantidadeVisivel();

    const maxIndice = totalCards - visiveis;

    if (indice < maxIndice) {

        indice++;

    } else {

        indice = 0;

    }

    atualizarCarrossel();

});


anterior.addEventListener("click", () => {

    const totalCards = cards.children.length;

    const visiveis = quantidadeVisivel();

    const maxIndice = totalCards - visiveis;

    if (indice > 0) {

        indice--;

    } else {

        indice = maxIndice;

    }

    atualizarCarrossel();

});



bolinhas.forEach((bolinha, i) => {

    bolinha.addEventListener("click", () => {

        indice = i;

        atualizarCarrossel();

    });

});


window.addEventListener("resize", () => {

    const maxIndice =
        cards.children.length - quantidadeVisivel();

    if (indice > maxIndice) {

        indice = maxIndice;

    }

    ajustarLarguraCards();

    atualizarCarrossel();

});



ajustarLarguraCards();

atualizarCarrossel();