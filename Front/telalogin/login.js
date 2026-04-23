document.getElementById('formLogin').addEventListener('submit', async function(event) {
    event.preventDefault();

    // ⚠️ IDs atualizados para bater com o HTML
    const email = document.getElementById('login_email').value.trim();
    const senha = document.getElementById('login_senha').value.trim();
    const mensagem = document.getElementById('mensagem_login');
    const botao = this.querySelector("button");

    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    const dadosLogin = { email, senha };

    try {
        // Feedback no botão
        botao.innerText = "Entrando...";
        botao.disabled = true;

        const resposta = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLogin)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            mensagem.innerText = resultado.mensagem || "Login realizado com sucesso!";
            mensagem.style.color = "green";
            this.reset();
            // Redirecionar se quiser
            // window.location.href = 'dashboard.html';
        } else {
            mensagem.innerText = resultado.erro || "Erro no login. Verifique seus dados.";
            mensagem.style.color = "red";
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        mensagem.innerText = "Erro ao conectar ao servidor.";
        mensagem.style.color = "orange";
    } finally {
        botao.innerText = "Entrar";
        botao.disabled = false;
    }
});