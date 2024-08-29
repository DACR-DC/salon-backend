const db = require('../config/db');
const Servicio={};
Servicio.crearServicio = (nombre_servicio, duracion_servicio, costo_servicio, callback) => {
    db.query(
        'INSERT INTO tbl_servicio (nombre_servicio, duracion_servicio, costo_servicio) VALUES (?, ?, ?)',
        [nombre_servicio, duracion_servicio, costo_servicio],
        callback
    );
};

Servicio.obtenerServicio = (callback) => {
    db.query('SELECT * FROM tbl_servicio', callback);
};

Servicio.actualizarServicio = (id_servicio, datosActualizados, callback) => {
    const { nombre_servicio, duracion_servicio, costo_servicio } = datosActualizados;
    db.query(
        'UPDATE tbl_servicio SET nombre_servicio = ?, duracion_servicio = ?, costo_servicio = ? WHERE id_servicio = ?',
        [nombre_servicio, duracion_servicio, costo_servicio, id_servicio],
        callback
    );
};

Servicio.eliminarServicio = (id_servicio, callback) => {
    db.query('DELETE FROM tbl_servicio WHERE id_servicio = ?', [id_servicio], callback);
};

module.exports = Servicio;