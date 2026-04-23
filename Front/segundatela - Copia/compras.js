function renderizarCarrinho() {
    const listaHtml = document.getElementById('carrinho-lista');
    const subtotalHtml = document.getElementById('subtotal');
    const totalHtml = document.getElementById('total-final');
    
    // Pega os dados salvos
    let carrinho = JSON.parse(localStorage.getItem('styleme_carrinho')) || [];
    
    if (carrinho.length === 0) {
        document.getElementById('lista-vazia').style.display = 'block';
        return;
    }

    let soma = 0;
    listaHtml.innerHTML = ''; // Limpa antes de carregar

    carrinho.forEach((produto, index) => {
        soma += produto.preco;
        listaHtml.innerHTML += `
            <div class="item-carrinho">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="detalhes-item">
                    <h4>${produto.nome}</h4>
                    <p>Vendido e entregue por StyleMe</p>
                    <span class="preco-item">R$ ${produto.preco.toFixed(2)}</span>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">Remover</button>
            </div>
        `;
    });

    subtotalHtml.innerText = `R$ ${soma.toFixed(2)}`;
    totalHtml.innerText = `R$ ${soma.toFixed(2)}`;
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('styleme_carrinho'));
    carrinho.splice(index, 1); // remove o item da lista
    localStorage.setItem('styleme_carrinho', JSON.stringify(carrinho));
    renderizarCarrinho(); // atualiza a tela
}

function finalizarCompra() {
    alert("Compra finalizada com sucesso! O Back-end agora processaria seu pagamento.");
    localStorage.removeItem('styleme_carrinho'); // Limpa o carrinho
    window.location.href = "segundatela.html"; // Volta para a vitrine
}

// Inicia a página
renderizarCarrinho();
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('styleme_carrinho')) || [];
    
    // Captura qual rádio está marcado
    const metodoSelecionado = document.querySelector('input[name="metodo-pagamento"]:checked').value;

    if (carrinho.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    // AGORA O PACOTE DE DADOS ESTÁ COMPLETO
    const dadosPedido = {
        itens: carrinho,
        pagamento: metodoSelecionado, // "pix", "cartao" ou "boleto"
        total: document.getElementById('total-final').innerText
    };

    console.log("Pedido pronto para o MySQL:", dadosPedido);
    alert(`Pedido via ${metodoSelecionado.toUpperCase()} processado!`);
    
    localStorage.removeItem('styleme_carrinho');
    window.location.href = "segundatela.html";
}
// Exemplo de como deve estar dentro da sua função que renderiza o carrinho:
itemCarrinho.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <div class="detalhes">
        <h4>${produto.nome}</h4>
        <p>Cor: <strong>${produto.cor}</strong></p>
        <p>R$ ${produto.preco.toFixed(2)}</p>
    </div>
`;
// Esta variável guarda a cor que o usuário clicou por último
let corSelecionadaNoMomento = ""; 

function selecionarCor(elemento, cor) {
    // 1. Guarda a cor na memória
    corSelecionadaNoMomento = cor;

    // 2. Tira o destaque de todas as bolinhas
    document.querySelectorAll('.btn-cor').forEach(btn => {
        btn.style.outline = "none";
        btn.style.transform = "scale(1)";
    });

    // 3. Coloca um destaque na bolinha clicada (para o usuário saber que selecionou)
    elemento.style.outline = "3px solid #ff69b4"; // Rosa StyleMe
    elemento.style.transform = "scale(1.2)";
}