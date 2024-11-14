// Variável global para armazenar o código gerado
let codigoVerificacao;

// Função para gerar código aleatório de 6 dígitos
function gerarCodigo() {
    codigoVerificacao = Math.floor(100000 + Math.random() * 900000);

    // Exibe o código na tela (para teste)
    const codigoDisplay = document.createElement('div');
    codigoDisplay.id = 'codigoDisplay';
    codigoDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
    `;
    codigoDisplay.innerHTML = `Código: ${codigoVerificacao}`;

    // Remove qualquer display de código anterior
    const oldDisplay = document.getElementById('codigoDisplay');
    if (oldDisplay) {
        oldDisplay.remove();
    }

    document.body.appendChild(codigoDisplay);
    return codigoVerificacao;
}

// Função para verificar o código inserido
function verificarCodigo() {
    const codigoInserido = document.getElementById('verification-code').value;

    if (codigoInserido === codigoVerificacao.toString()) {
        alert("Código registrado! Cadastre sua nova senha...");
        window.location.href = '/guto/NovaSenha/novaSenha.html'; // Redireciona para a página de nova senha
    } else {
        alert("Código enviado incorreto! Insira o código enviado corretamente ou peça para enviar um novo código");
    }
}

// Função para reenviar o código
function reenviarCodigo() {
    gerarCodigo();
    alert("Novo código gerado! Verifique o código no canto superior direito da tela.");
}

// Gerar código inicial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    gerarCodigo();
});