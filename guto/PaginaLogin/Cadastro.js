// Função para cadastrar usuário
function registerUser (fullName, email, password, confirmPassword) {
    // Validar campos vazios
    if (!fullName || !email || !password || !confirmPassword) {
        alert("Dados incorretos! Tente novamente.");
        return false;
    }

    // Validar formato do email
    if (!validateEmail(email)) {
        alert("Por favor, insira um email válido");
        return false;
    }

    // Validar se as senhas coincidem
    if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return false;
    }

    // Verificar se o email já está cadastrado
    if (users.some(user => user.email === email)) {
        alert("Este email já está cadastrado");
        return false;
    }

    // Adicionar usuário ao array
    users.push({
        fullName,
        email,
        password
    });

    // Mostrar mensagem de sucesso e redirecionar
    alert("Cadastro realizado com sucesso!");
    showLoadingAndRedirect('cadastro');
    return true;
}

// Função para redirecionar após cadastro
function showLoadingAndRedirect(type) {
    if (type === 'cadastro') {
        alert("Cadastro realizado com sucesso! Redirecionando para a página de login...");
        setTimeout(() => {
            window.location.href = "/guto/PaginaLogin/Login.html";
        }, 2000);
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Configurar formulário de Cadastro
    const signupForm = document.querySelector("form");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const fullName = this.querySelector("input[type='text']").value;
            const email = this.querySelector("input[type='email']").value;
            const passwords = this.querySelector("input[type='password']").value;
            const confirmPassword = this.querySelector("input[type='password']").value;
            registerUser (fullName, email, password, confirmPassword);
        });
    }
});