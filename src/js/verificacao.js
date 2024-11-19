let codigoVerificacao;

function gerarCodigo() {
    codigoVerificacao = Math.floor(100000 + Math.random() * 900000);

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

    const oldDisplay = document.getElementById('codigoDisplay');
    if (oldDisplay) {
        oldDisplay.remove();
    }

    document.body.appendChild(codigoDisplay);
    return codigoVerificacao;
}

function verificarCodigo() {
    const codigoInserido = document.getElementById('verification-code').value;

    if (codigoInserido === codigoVerificacao.toString()) {
        alert("Código registrado! Cadastre sua nova senha...");
        window.location.href = '/guto/NovaSenha/novaSenha.html';
    } else {
        alert("Código enviado incorreto! Insira o código enviado corretamente ou peça para enviar um novo código");
    }
}

function reenviarCodigo() {
    gerarCodigo();
    alert("Novo código gerado! Verifique o código no canto superior direito da tela.");
}

document.addEventListener('DOMContentLoaded', () => {
    gerarCodigo();
});
