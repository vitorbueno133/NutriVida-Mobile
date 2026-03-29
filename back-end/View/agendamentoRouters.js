// back-end/src/view/agendamentosRouters.js
const express = require('express');
const router = express.Router();
const agendamentoModel = require('../Model/agendamentoService');

router.post('/', async (req, res) => {
  try {
    console.log("Corpo recebido na API:", req.body);
    
    // Chama o Service que agora sabemos que está funcionando
    const insertId = await agendamentoModel.criarAgendamento(req.body);
    
    // IMPORTANTE: O res.status(201).json é o que avisa o celular para fechar o modal
    return res.status(201).json({ 
      id: insertId, 
      message: "Agendamento criado com sucesso!" 
    });

  } catch (error) {
    console.error("Erro na rota POST /agendamentos:", error);
    return res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const agendamentos = await agendamentoModel.listarAgendamentos();
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const agendamentos = await agendamentoModel.listarAgendamentosPorUsuario(usuario_id);
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await agendamentoModel.deletarAgendamento(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ message: 'Agendamento cancelado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/nutricionista/:nutricionistaId/consultas-hoje', async (req, res) => {
  try {

    const { nutricionistaId } = req.params;

    const total = await agendamentoModel.contarConsultasHojePorNutricionista(nutricionistaId);

    res.json(total);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/nutricionista/:nutricionistaId/consultas-dia', async (req, res) => {
  try {

    const { nutricionistaId } = req.params;

    const consultas = await agendamentoModel.listarConsultasHojePorNutricionista(nutricionistaId);

    res.json(consultas);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/nutricionista/:nutricionistaId/proximos-3-dias', async (req, res) => {

  try {

    const { nutricionistaId } = req.params;

    const consultas = await agendamentoModel.listarConsultasProximos3Dias(nutricionistaId);

    res.json(consultas);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

router.get('/nutricionista/:nutricionistaId/agenda', async (req, res) => {

  try {

    const { nutricionistaId } = req.params;

    const consultas = await agendamentoModel.listarAgendaCompleta(nutricionistaId);

    res.json(consultas);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

router.get('/nutricionista/:id/resumo-mes', async (req, res) => {

  const nutricionistaId = req.params.id;

  const resumo = await agendamentoModel.resumoMesNutricionista(nutricionistaId);

  res.json(resumo);

});

router.get('/nutricionista/:nutricionistaId/historico', async (req, res) => {

  try {

    const { nutricionistaId } = req.params;

    const historico = await agendamentoModel.listarHistoricoNutricionista(nutricionistaId);

    res.json(historico);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }

});

router.put('/:id/realizada', async (req, res) => {

  const { id } = req.params;

  await agendamentoModel.marcarComoRealizada(id);

  res.json({ message: "Consulta realizada" });

});


router.get('/nutricionista/:nutricionistaId/consultas-realizadas', async (req, res) => {

  try {

    const { nutricionistaId } = req.params;

    const total = await agendamentoModel.contarConsultasRealizadas(nutricionistaId);

    res.json(total);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }

});

router.get('/usuario/:usuarioId/tem-consulta', async (req, res) => {
  try {
    const tem = await agendamentoService.verificarConsultaUsuario(req.params.usuarioId);
    res.json({ temConsulta: tem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;