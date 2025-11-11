const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rotas de Professores
router.get('/', professorController.listarProfessores);
router.get('/departamento/:departamento', professorController.buscarPorDepartamento);
router.get('/:id', professorController.buscarPorId);
router.get('/:id/turmas', professorController.listarTurmas);
router.put('/:id', professorController.atualizarProfessor);
router.post('/:id/turmas', professorController.adicionarTurma);
router.delete('/:id', professorController.deletarProfessor);

module.exports = router;
