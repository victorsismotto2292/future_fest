function Senha() {
    const emailInput = document.getElementById('email').value;

    if (emailInput.trim() === "") {
        alert("Por favor, insira seu email.");
    } else {
        setTimeout(() => {
            alert("Email enviado com sucesso! Redirecionando...");
            window.location.href = "/verificacao/verificacao.html";
        }, 2000);
    }
}

/*
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Você pode alterar para outro serviço de email
    auth: {
        user: process.env.EMAIL_USER, // Seu email
        pass: process.env.EMAIL_PASSWORD // Sua senha de app do Gmail
    }
});

// Simula um banco de dados de tokens de recuperação
const recoveryTokens = new Map();

// Rota para solicitar recuperação de senha
app.post('/api/password-recovery', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório' });
        }

        // Gera um token único
        const token = crypto.randomBytes(32).toString('hex');
        
        // Armazena o token (em um caso real, isso seria feito em um banco de dados)
        recoveryTokens.set(token, {
            email,
            timestamp: Date.now(),
            used: false
        });

        // Link de recuperação (em produção, use HTTPS e seu domínio real)
        const recoveryLink = `http://seusite.com/reset-password?token=${token}`;

        // Configura o email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha',
            html: `
                <h1>Recuperação de Senha</h1>
                <p>Você solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:</p>
                <a href="${recoveryLink}">Recuperar Senha</a>
                <p>Se você não solicitou a recuperação de senha, ignore este email.</p>
                <p>Este link expira em 1 hora.</p>
            `
        };

        // Envia o email
        await transporter.sendMail(mailOptions);

        // Remove tokens antigos (mais de 1 hora)
        const oneHour = 60 * 60 * 1000;
        recoveryTokens.forEach((value, key) => {
            if (Date.now() - value.timestamp > oneHour) {
                recoveryTokens.delete(key);
            }
        });

        res.json({ 
            message: 'Email de recuperação enviado com sucesso',
            success: true 
        });

    } catch (error) {
        console.error('Erro ao enviar email de recuperação:', error);
        res.status(500).json({ 
            error: 'Erro ao processar a solicitação de recuperação de senha',
            success: false
        });
    }
});

// Rota para verificar token e alterar senha
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    const tokenData = recoveryTokens.get(token);

    if (!tokenData || tokenData.used) {
        return res.status(400).json({ 
            error: 'Token inválido ou expirado',
            success: false 
        });
    }

    const oneHour = 60 * 60 * 1000;
    if (Date.now() - tokenData.timestamp > oneHour) {
        recoveryTokens.delete(token);
        return res.status(400).json({ 
            error: 'Token expirado',
            success: false 
        });
    }

    // Aqui você implementaria a lógica para atualizar a senha no seu banco de dados
    // Por exemplo: await updateUserPassword(tokenData.email, newPassword);

    // Marca o token como usado
    tokenData.used = true;

    res.json({ 
        message: 'Senha alterada com sucesso',
        success: true 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.querySelector('.auth-form');
    
    recoveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = recoveryForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        try {
            const response = await fetch('http://localhost:3000/api/password-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Mostra mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.';
                recoveryForm.insertBefore(successMessage, recoveryForm.firstChild);
            } else {
                // Mostra mensagem de erro
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = data.error || 'Erro ao enviar email de recuperação';
                recoveryForm.insertBefore(errorMessage, recoveryForm.firstChild);
            }
        } catch (error) {
            console.error('Erro:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Erro ao conectar com o servidor';
            recoveryForm.insertBefore(errorMessage, recoveryForm.firstChild);
        }
    });
});

*/