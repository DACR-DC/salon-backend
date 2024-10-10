const citaModel = require('../models/citaModel');
const { validationResult } = require('express-validator');

exports.crearCita = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio } = req.body;

    // Combinar la fecha y las horas recibidas en un objeto Date
    const startDateTime = new Date(`${fecha_cita}T${hora_inicio_cita}`);
    const endDateTime = new Date(`${fecha_cita}T${hora_fin_cita}`);

    // Restar 6 horas para ajustar a la zona horaria de Guatemala (UTC-6)
    startDateTime.setHours(startDateTime.getHours() - 6);
    endDateTime.setHours(endDateTime.getHours() - 6);

    // Verificar si la resta de horas cambia la fecha al día anterior
    const fechaOriginal = new Date(`${fecha_cita}T00:00:00`); // Fecha original sin hora
    if (startDateTime < fechaOriginal) {
        // Si la fecha ajustada es menor a la fecha original, restamos un día
        startDateTime.setDate(startDateTime.getDate() - 1);
        endDateTime.setDate(endDateTime.getDate() - 1);
    }

    // Obtener la nueva fecha y horas ajustadas
    const fechaCitaAjustada = startDateTime.toISOString().split("T")[0];
    const horaInicioAjustada = startDateTime.toTimeString().split(" ")[0];
    const horaFinAjustada = endDateTime.toTimeString().split(" ")[0];

    // Imprimir en consola las fechas y horas ajustadas para verificar
    console.log('Fecha ajustada:', fechaCitaAjustada);
    console.log('Hora de inicio ajustada:', horaInicioAjustada);
    console.log('Hora de fin ajustada:', horaFinAjustada);

    // Guardar la cita en la base de datos con los valores ajustados
    citaModel.crearCita(fechaCitaAjustada, horaInicioAjustada, horaFinAjustada, id_cliente, id_servicio, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ 
            id_cita: result.insertId, 
            fecha_cita: fechaCitaAjustada, 
            hora_inicio_cita: horaInicioAjustada, 
            hora_fin_cita: horaFinAjustada, 
            id_cliente, 
            id_servicio 
        });
    });
};

exports.obtenerCitas = (req, res) => {
    citaModel.obtenerCitas((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarCita = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_cita } = req.params;
    let { fecha_cita, hora_inicio_cita, hora_fin_cita, id_cliente, id_servicio } = req.body;

    const startDateTime = new Date(`${fecha_cita}T${hora_inicio_cita}`);
    const endDateTime = new Date(`${fecha_cita}T${hora_fin_cita}`);

    startDateTime.setHours(startDateTime.getHours() - 6);
    endDateTime.setHours(endDateTime.getHours() - 6);

    const fechaOriginal = new Date(`${fecha_cita}T00:00:00`);
    if (startDateTime < fechaOriginal) {
        startDateTime.setDate(startDateTime.getDate() - 1);
        endDateTime.setDate(endDateTime.getDate() - 1);
    }

    const fechaCitaAjustada = startDateTime.toISOString().split("T")[0];
    const horaInicioAjustada = startDateTime.toTimeString().split(" ")[0];
    const horaFinAjustada = endDateTime.toTimeString().split(" ")[0];

    console.log('Fecha ajustada:', fechaCitaAjustada);
    console.log('Hora de inicio ajustada:', horaInicioAjustada);
    console.log('Hora de fin ajustada:', horaFinAjustada);


    const datosActualizados = {
        fecha_cita: fechaCitaAjustada,
        hora_inicio_cita: horaInicioAjustada,
        hora_fin_cita: horaFinAjustada,
        id_cliente,
        id_servicio
    };

    citaModel.actualizarCita(id_cita, datosActualizados, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Cita actualizada', id_cita, datosActualizados });
    });
};

exports.eliminarCita = (req, res) => {
    const { id_cita } = req.params;
    citaModel.eliminarCita(id_cita, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Cita eliminada' });
    });
};

