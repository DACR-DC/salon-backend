const Cliente = require('../models/clienteModel');
const { validationResult } = require('express-validator');

exports.ObtenerClientes = (req, res) => {
  Cliente.ObtenerTodas((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
};

exports.CrearCliente = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre_cliente, apellido_cliente, telefono_cliente } = req.body;
  Cliente.Crear(nombre_cliente, apellido_cliente, telefono_cliente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id_cliente: result.insertId, nombre_cliente, apellido_cliente, telefono_cliente });
  });
};

exports.ActualizarCliente = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_cliente } = req.params;
  const datosNuevos = req.body;
  
  Cliente.Actualizar(id_cliente, datosNuevos, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Cliente actualizado' });
  });
};

exports.EliminarCliente = (req, res) => {
  const { id_cliente } = req.params;
  Cliente.Eliminar(id_cliente, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Cliente eliminado' });
  });
};
