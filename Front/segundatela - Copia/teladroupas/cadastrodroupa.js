const inputFoto = document.getElementById('arquivo-foto');
const preview = document.getElementById('preview-foto');
const scanner = document.querySelector('.linha-scanner');
const btnAnalisar = document.getElementById('btn-analisar');

// 1. Mostrar a foto escolhida (Preview)
inputFoto.addEventListener('change', function() {
    const arquivo = this.files[0];
    if (arquivo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.querySelector('.camera-box').style.border = '3px solid #ff69b4';
        }
        reader.readAsDataURL(arquivo);
    }
});

// 2. Ativar o efeito de Scanner ao clicar
btnAnalisar.addEventListener('click', function() {
    if (!inputFoto.files[0]) {
        alert("Por favor, selecione uma foto primeiro!");
        return;
    }
    
    // Liga o efeito visual
    scanner.style.display = 'block';
    this.innerText = "Analisando Tecido e Corte...";
    
    // AQUI O FRONT-END PARA. 
    // O Back-end vai pegar esse evento e enviar a imagem para a API de IA.
});