const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const { body } = require('express-validator');

router.post('/servicio', [
    body('nombre_servicio')
        .notEmpty().withMessage('El nombre del servicio es obligatorio')
        .isString().withMessage('El nombre del servicio debe ser una cadena de texto'),
    body('duracion_servicio')
        .notEmpty().withMessage('La duración del servicio es obligatoria')
        .isInt({ min: 1 }).withMessage('La duración del servicio debe ser un número entero positivo'),
    body('costo_servicio')
        .notEmpty().withMessage('El costo del servicio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El costo del servicio debe ser un número positivo'),
], servicioController.crearServicio);

router.get('/servicios', servicioController.obtenerServicios);

router.put('/servicio/:id_servicio', [
    body('nombre_servicio')
        .optional()
        .isString().withMessage('El nombre del servicio debe ser una cadena de texto'),
    body('duracion_servicio')
        .optional()
        .isInt({ min: 1 }).withMessage('La duración del servicio debe ser un número entero positivo'),
    body('costo_servicio')
        .optional()
        .isFloat({ min: 0 }).withMessage('El costo del servicio debe ser un número positivo'),
], servicioController.actualizarServicio);

router.delete('/servicio/:id_servicio', servicioController.eliminarServicio);

module.exports = router;
