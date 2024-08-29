const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/usuario', [
    body('usuario_login')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto'),
    body('contrasena_login')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isString().withMessage('La contraseña debe ser una cadena de texto'),
], userController.crearUsuario);

router.get('/usuarios', userController.obtenerUsuarios);

router.put('/usuario/:id_login', [
    body('usuario_login')
        .optional()
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto'),
    body('contrasena_login')
        .optional()
        .isString().withMessage('La contraseña debe ser una cadena de texto'),
], userController.actualizarUsuario);

router.delete('/usuario/:id_login', userController.eliminarUsuario);

module.exports = router;
