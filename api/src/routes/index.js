const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const tempers = require('./tempers.js');
const deleted = require('./deleted.js');
const breed_groups = require('./breed_groups.js')



const api = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
api.use('/dogs', dogs);
api.use('/tempers', tempers);
api.use('/deleted', deleted);
api.use('/breed_groups', breed_groups);


module.exports = api;
