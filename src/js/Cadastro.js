let users = [];
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function registerUser(fullName, email, password, confirmPassword) {
    if (!fullName || !email || !password || !confirmPassword) {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um email válido");
        return false;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return false;
    }

    if (users.some(user => user.email === email)) {
        alert("Este email já está cadastrado");
        return false;
    }

    users.push({
        fullName,
        email,
        password
    });

    alert("Cadastro realizado com sucesso!");
    showLoadingAndRedirect('cadastro');
    return true;
}

function login(email, password) {
    if (!email || !password) {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
        return false;
    }

    if (email === "usuario.exemplo@gmail.com" && password === "123456") {
        showLoadingAndRedirect('login');
        return true;
    }

    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        showLoadingAndRedirect('login');
        return true;
    } else {
        alert("Dados incorretos, por favor, insira valores válidos para continuar");
        return false;
    }
}

function showLoadingAndRedirect(type) {
    if (type === 'login') {
        alert("Login sucessido, redirecionado para a página inicial...");
        setTimeout(() => {
            window.location.href = "/guto/Páginahome/index.html";
        }, 2000);
    } else {
        alert("Redirecionando para a página de login...");
        setTimeout(() => {
            window.location.href = "/guto/PaginaLogin/Login.html";
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (!users.some(user => user.email === "usuario.exemplo@gmail.com")) {
        users.push({
            fullName: "Usuário",
            email: "usuario.exemplo@gmail.com",
            password: "123456"
        });
    }

    const currentPage = window.location.pathname;

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
