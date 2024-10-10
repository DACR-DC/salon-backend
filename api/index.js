const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const clienteRoute = require('../routes/clienteRoute');
const usrRoutes = require('../routes/userRoutes');
const servicioRoutes = require('../routes/servicioRoutes');
const citaRoute = require('../routes/citaRoute');

require('../config/db'); 
require('../jobs/cronJobs');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Backend Arriba');
});


app.use('/api', clienteRoute);
app.use('/api', usrRoutes);
app.use('/api', servicioRoutes);
app.use('/api',citaRoute);


app.listen(port, () => {
  console.log(`Servidor  en el puerto ${port}`);
});



