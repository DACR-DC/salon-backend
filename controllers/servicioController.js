const servicio = require('../models/servicioModel');
const { validationResult } = require('express-validator');

exports.crearServicio = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_servicio, duracion_servicio, costo_servicio } = req.body;
    servicio.crearServicio(nombre_servicio, duracion_servicio, costo_servicio, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id_servicio: result.insertId, nombre_servicio, duracion_servicio, costo_servicio });
    });
};

exports.obtenerServicios = (req, res) => {
    servicio.obtenerServicio((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarServicio = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_servicio } = req.params;
    const datosActualizados = req.body;
    servicio.actualizarServicio(id_servicio, datosActualizados, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Servicio actualizado' });
    });
};

exports.eliminarServicio = (req, res) => {
    const { id_servicio } = req.params;
    servicio.eliminarServicio(id_servicio, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Servicio eliminado' });
    });
};
