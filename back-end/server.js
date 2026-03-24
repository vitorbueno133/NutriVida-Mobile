//configrações iniciais
const express = require('express'); // estou criando o servidor web
const cors = require('cors');// cors evita bloqueios nas requisições
const app = express();
const { checkConnection, banco } = require('./model/database');

const criarCardapioRotas = require('./View/criarCardapioRouters');
const salvarCardapioRouters = require('./View/salvarCardapioRouters');
const salvarRespostasRouters = require('./View/salvarRespostaRouters');

// Middleware
app.use(express.json());

app.use(cors());
app.use(cors());
app.use(express.json());// fala para o express entender quando enviamos dados Json

(async () => {
  const isDbConnected = await checkConnection();
  if (isDbConnected) {
    console.log("Servidor Banco de Dados - OK ...");
  } else {
    console.error("Falha na conexão com o banco de dados!");
  }
})();

// Rota para buscar dados
app.get('/dados', async (req, res) => {
    try {
        const [result] = await banco.query('SELECT * FROM cardapio');
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/cardapio', criarCardapioRotas);
app.use('/salvarCardapio', salvarCardapioRouters);
app.use('/respostas', salvarRespostasRouters);

app.listen(3000, () => console.log("API rodando na porta 3000"));