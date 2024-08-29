const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { body } = require('express-validator');

router.post('/cliente', [
  body('nombre_cliente')
    .isString().withMessage('ERROR El nombre debe ser una cadena de texto'),
  body('apellido_cliente')
    .isString().withMessage('ERROR El apellido debe ser una cadena de texto'),
  body('telefono_cliente')
    .isString().withMessage('ERROR El teléfono debe ser una cadena de texto'),
], clienteController.CrearCliente);

router.get('/clientes', clienteController.ObtenerClientes);

router.put('/actualizar-cliente/:id_cliente', [
  body('nombre_cliente')
    .optional()
    .isString().withMessage('ERROR El nombre debe ser una cadena de texto'),
  body('apellido_cliente')
    .optional()
    .isString().withMessage('ERROR El apellido debe ser una cadena de texto'),
  body('telefono_cliente')
    .optional()
    .isString().withMessage('ERROR El teléfono debe ser una cadena de texto'),
], clienteController.ActualizarCliente);

router.delete('/cliente/:id_cliente', clienteController.EliminarCliente);

module.exports = router;
