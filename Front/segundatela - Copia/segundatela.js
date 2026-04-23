function adicionarAoCarrinho(nome, preco, imagem) {
    // Pega a lista atual ou cria uma nova
    let carrinho = JSON.parse(localStorage.getItem('styleme_carrinho')) || [];

    // Adiciona o novo item escolhido
    carrinho.push({ nome, preco, imagem });

    // Salva no armário (localStorage)
    localStorage.setItem('styleme_carrinho', JSON.stringify(carrinho));

    // Atualiza o contador na navbar se ele existir
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = carrinho.length;
    }

    alert(nome + " adicionado à sacola com sucesso!");
}
function filtrarPor(tipo, valor) {
    const cards = document.querySelectorAll('.card-produto');

    cards.forEach(card => {
        // Pega o valor do data-cor, data-tamanho, etc.
        let valorDoCard = card.getAttribute(`data-${tipo}`);

        if (valor === 'todos' || valor === '') {
            card.style.display = "block";
        } 
        // O SEGREDO ESTÁ AQUI: .includes() verifica se a cor clicada 
        // está dentro da lista de cores do card
        else if (valorDoCard && valorDoCard.toLowerCase().includes(valor.toLowerCase())) {
            card.style.display = "block";
        } 
        else {
            card.style.display = "none";
        }
    });
}
    produtos.forEach(card => {
        // Busca dinamicamente por data-categoria, data-genero, etc.
        const valorCard = (card.getAttribute(`data-${tipo}`) || "").toLowerCase();

        if (valorBusca === 'todos') {
            card.style.display = 'block';
            encontrados++;
        } else if (valorCard === valorBusca) {
            card.style.display = 'block';
            encontrados++;
        } else {
            card.style.display = 'none';
        }
    });

    // Feedback visual do título
    if (valorBusca === 'todos') {
        tituloVitrine.innerText = "Nossa Coleção";
    } else {
        // Deixa a primeira letra maiúscula para o título ficar bonito
        const nomeFormatado = valor.charAt(0).toUpperCase() + valor.slice(1);
        tituloVitrine.innerText = "Filtrando por: " + nomeFormatado;
    }

    // Atualiza o contador de itens encontrados
    if (contadorTexto) {
        contadorTexto.innerText = `Mostrando ${encontrados} produtos encontrados`;
    }
function mostrarNovaColecao() {
    // Reutiliza a lógica do filtrarPor para manter o padrão
    filtrarPor('colecao', 'nova');
}

// Inicializa o contador de itens ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('styleme_carrinho')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) contador.innerText = carrinho.length;
});
function pesquisarProdutos() {
    // 1. Pega o que foi digitado e transforma em minúsculo
    let input = document.getElementById('input-busca').value.toLowerCase();
    
    // 2. Pega todos os cards de produtos
    let cards = document.querySelectorAll('.card-produto');

    cards.forEach(card => {
        // 3. Pega o nome do produto dentro do card (o h4)
        let nomeProduto = card.querySelector('h4').innerText.toLowerCase();

        // 4. Se o nome contiver o que foi digitado, mostra. Se não, esconde.
        if (nomeProduto.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
// Exemplo lógico do que deve estar no seu filtrarPor
let corDoProduto = card.getAttribute('data-cor'); // Ex: "preto branco"
if (corDoProduto.includes(valorFiltro)) { 
    card.style.display = "block"; 
}
