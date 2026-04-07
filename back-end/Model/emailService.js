require('dotenv').config();
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT, 10);

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT) {
    console.error("Erro: Variáveis de ambiente de e-mail não definidas. Verifique seu arquivo .env.");
    process.exit(1); 
}

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false }
});

/**
 * Envia um e-mail de resposta (Admin -> Cliente).
 */
async function enviarEmailResposta(destinatario, resposta, mensagemOriginal) {
    try {
        const info = await transporter.sendMail({
            from: `"Nutrivida" <${EMAIL_USER}>`,
            to: destinatario,
            subject: "De: Contato via site Nutrivida",
            html: `
                <p>Olá ${mensagemOriginal.nome},</p>
                <p>Obrigado pelo seu contato! Aqui está a resposta para sua mensagem:</p>
                <br>
                <div style="background-color: #f2f2f2; padding: 15px; border-radius: 5px;">
                    <p>${resposta}</p>
                </div>
                <br><hr>
                <p style="font-size: 12px; color: #777;">
                    <b>Sua mensagem original:</b><br>
                    <i>"${mensagemOriginal.mensagem}"</i>
                </p>
            `,
        });
        console.log("E-mail de resposta enviado com sucesso. ID:", info.messageId);
        return info;
    } catch (error) {
        console.error("Erro ao enviar resposta via Gmail:", error);
        throw error;
    }
}

/**
 * Envia notificação de novo contato para o Nutricionista (App -> Admin).
 */
async function enviarEmailNotificacao(destinatario, payload) {
    try {
        const info = await transporter.sendMail({
            from: `"Nutrivida App" <${EMAIL_USER}>`,
            to: destinatario,
            subject: `Novo Contato App - De: ${payload.nome}`,
            html: `
                <h2>Você recebeu uma nova mensagem no App Nutrivida!</h2>
                <p><strong>Nome:</strong> ${payload.nome}</p>
                <p><strong>E-mail:</strong> ${payload.email}</p>
                <p><strong>Telefone:</strong> ${payload.telefone}</p>
                <hr>
                <h3>Mensagem:</h3>
                <p style="white-space: pre-wrap; font-size: 16px;">${payload.mensagem}</p>
            `,
        });
        console.log("Notificação enviada com sucesso para o nutricionista. ID:", info.messageId);
        return info;
    } catch (error) {
        console.error("Erro ao enviar notificação de contato:", error);
        throw error;
    }
}

// Exportamos as duas funções agora!
module.exports = { enviarEmailResposta, enviarEmailNotificacao };