const db = require('../config/db');
const Cliente = {};

Cliente.ObtenerTodas = (callback) => {
  const sql = 'SELECT * FROM tbl_cliente';
  db.query(sql, callback);
};

Cliente.Crear = (nombre_cliente, apellido_cliente, telefono_cliente, callback) => {
  const sql = 'INSERT INTO tbl_cliente (nombre_cliente, apellido_cliente, telefono_cliente) VALUES (?, ?, ?)';
  db.query(sql, [nombre_cliente, apellido_cliente, telefono_cliente], callback);
};

Cliente.Eliminar = (id_cliente, callback) => {
  const sql = 'DELETE FROM tbl_cliente WHERE id_cliente = ?';
  db.query(sql, [id_cliente], callback);
};

Cliente.Actualizar = (id_cliente, datosNuevos, callback) => {
  const sql = 'UPDATE tbl_cliente SET ? WHERE id_cliente = ?';
  db.query(sql, [datosNuevos, id_cliente], callback);
};

module.exports = Cliente;
