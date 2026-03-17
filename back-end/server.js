//configrações iniciais
const express = require('express'); // estou criando o servidor web
const mysql = require('mysql2'); //permite enviar sql para o BD
const cors = require('cors');// cors evita bloqueios nas requisições
const app = express();

const criarCardapioRotas = require('./View/criarCardapioRouters');
const salvarCardapioRouters = require('./View/salvarCardapioRouters');
const salvarRespostasRouters = require('./View/salvarRespostaRouters');


app.use(cors());
app.use(express.json());// fala para o express entender quando enviamos dados Json

// agora vamos fazer a comunicação com o mysql
const db = mysql.createConnection({
    host: 'localhost',// nesse caso o banco está meu computador
    user: 'root', 
    password: '', // Senha padrão do xampp costuma ser vazia
    database: 'nutri_vida'// nome do meu banco
});

// Rota para buscar dados
app.get('/dados', (req, res) => { // aqui estou criando minha rota/endpoint chamado /dados
    db.query('SELECT * FROM cardapio', (err, result) => { 
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.use('/cardapio', criarCardapioRotas);
app.use("/salvarCardapio", salvarCardapioRouters);
app.use("/respostas", salvarRespostasRouters);

app.listen(3000, () => console.log("API rodando na porta 3000"));