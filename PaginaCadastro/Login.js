// Armazenar usuários cadastrados (em uma aplicação real, isso seria em um banco de dados)
let users = [];

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Nova função para verificar se o usuário está cadastrado
function isUserRegistered(email) {
    return users.some(user => user.email === email) || email === "usuario.exemplo@gmail.com";
}

// Função para cadastrar usuário
function registerUser(fullName, email, password, confirmPassword) {
    // Validar campos vazios
    if (!fullName || !email || !password || !confirmPassword) {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
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
    if (isUserRegistered(email)) {
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

// Função para fazer login
function login(email, password) {
    // Validar campos vazios
    if (!email || !password) {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
        return false;
    }

    // Primeiro, verificar se o usuário está cadastrado
    if (!isUserRegistered(email)) {
        alert("Este usuário não está cadastrado, por favor, cadastre seus dados na página de cadastro para continuar");
        setTimeout(() => {
            window.location.href = "/guto/PaginaCadastro/Cadastro.html";
        }, 3000); // 3 segundos de delay
        return false;
    }

    // Verificar se é o usuário exemplo
    if (email === "usuario.exemplo@gmail.com" && password === "123456") {
        showLoadingAndRedirect('login');
        return true;
    }

    // Verificar credenciais nos usuários cadastrados
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        showLoadingAndRedirect('login');
        return true;
    } else {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
        return false;
    }
}

// Função para mostrar tela de carregamento e redirecionar
function showLoadingAndRedirect(type) {
    if (type === 'login') {
        alert("Login sucessido, redirecionado para a página inicial...");
        setTimeout(() => {
            window.location.href = "/guto/Páginahome/index.html";
        }, 2000);
    } else {
        alert("Cadastro realizado com sucesso! Redirecionando para a página de login...");
        setTimeout(() => {
            window.location.href = "/guto/PaginaLogin/Login.html";
        }, 2000);
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Cadastrar usuário exemplo por padrão
    if (!users.some(user => user.email === "usuario.exemplo@gmail.com")) {
        users.push({
            fullName: "Usuário",
            email: "usuario.exemplo@gmail.com",
            password: "123456"
        });
    }

    // Verificar em qual página estamos
    const currentPage = window.location.pathname;

    // Configurar formulário de Login
    if (currentPage.includes("Login")) {
        const loginForm = document.querySelector("form") || document.createElement("form");
        loginForm.id = "loginForm";
        
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = this.querySelector("input[type='email']").value;
            const password = this.querySelector("input[type='password']").value;
            login(email, password);
        });
    }

    // Configurar formulário de Cadastro
    if (currentPage.includes("Cadastro")) {
        const signupForm = document.querySelector("form") || document.createElement("form");
        signupForm.id = "signupForm";
        
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const fullName = this.querySelector("input[type='text']").value;
            const email = this.querySelector("input[type='email']").value;
            const passwords = this.querySelectorAll("input[type='password']");
            const password = passwords[0].value;
            const confirmPassword = passwords[1].value;
            
            registerUser(fullName, email, password, confirmPassword);
        });
    }

    // Adicionar event listeners para validação em tempo real
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("blur", function() {
            if (!this.value) {
                this.classList.add("error");
                this.classList.remove("success");
            } else {
                this.classList.remove("error");
                this.classList.add("success");
            }
        });
    });
});

// Adicionar estilos CSS para feedback visual
const style = document.createElement("style");
style.textContent = `
    input.error {
        border-color: #ff3333;
    }
    input.success {
        border-color: #33cc33;
    }
`;
document.head.appendChild(style);