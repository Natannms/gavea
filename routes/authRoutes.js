const {Router} = require('express');
const AuthController = require('../controllers/authController');

const router = Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/", AuthController.welcome);

module.exports = router;