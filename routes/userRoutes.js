const { Router } = require('express');
const UserController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware'); //
const adminPermision = require('../middlewares/adminPermision')
const router = Router();

router.use(jwtMiddleware);

// Rota para listar todos os usuários
router.get('/users', adminPermision, UserController.index);

// Rota para exibir detalhes de um usuário específico
router.get('/users/:id', adminPermision, UserController.show);

// Rota para criar um novo usuário
router.post('/users', adminPermision, UserController.create);

// Rota para atualizar os dados de um usuário
router.put('/users/:id', adminPermision, UserController.update);

// Rota para excluir um usuário
router.delete('/users/:id', adminPermision, UserController.delete);

// Rota para atualizar parcialmente os usuários
router.patch('/users/:id', UserController.patch)
module.exports = router;
