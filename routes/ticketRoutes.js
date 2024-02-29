const { Router } = require('express');
const TicketController = require('../controllers/ticketController');
const jwtMiddleware = require('../middlewares/jwtMiddleware'); //
const adminPermision = require('../middlewares/adminPermision')
const router = Router();

router.use(jwtMiddleware);

// Rota para listar todos os usuários
router.get('/tickets', adminPermision, TicketController.index);

// Rota para exibir detalhes de um usuário específico
router.get('/tickets/:id', adminPermision, TicketController.show);

// Rota para criar um novo usuário
router.post('/tickets', adminPermision, TicketController.create);

// Rota para atualizar os dados de um usuário
router.put('/tickets/:id', adminPermision, TicketController.update);

// Rota para excluir um usuário
router.delete('/tickets/:id', adminPermision, TicketController.delete);

// Rota para atualizar parcialmente os usuários
router.patch('/tickets/:id', TicketController.patch)
module.exports = router;
