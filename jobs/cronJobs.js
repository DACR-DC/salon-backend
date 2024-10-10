// /jobs/cronJobs.js
 
const cron = require('node-cron');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta
 
// Programa la tarea para que se ejecute el primer día de cada mes a las 00:00
cron.schedule('0 0 1 * *', () => {
  console.log('Ejecutando tarea programada para eliminar citas del mes anterior');
 
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth(); // Enero = 0, Diciembre = 11
 
  // Calcular el mes anterior
  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
  const añoMesAnterior = mesActual === 0 ? añoActual - 1 : añoActual;
 
  // Definir el primer y último día del mes anterior
  const inicioMesAnterior = new Date(añoMesAnterior, mesAnterior, 1);
  const finMesAnterior = new Date(añoMesAnterior, mesAnterior + 1, 0);
 
  // Formatear las fechas a 'YYYY-MM-DD'
  const fechaInicio = inicioMesAnterior.toISOString().split('T')[0];
  const fechaFin = finMesAnterior.toISOString().split('T')[0];
 
  const query = 'DELETE FROM tbl_cita WHERE fecha_cita BETWEEN ? AND ?';
  db.query(query, [fechaInicio, fechaFin], (err, result) => {
    if (err) {
      console.error('Error al eliminar citas:', err);
    } else {
      console.log(`Citas de ${fechaInicio} a ${fechaFin} eliminadas exitosamente.`);
    }
  });
}, {
  timezone: 'America/Guatemala' // Ajusta según tu zona horaria
});