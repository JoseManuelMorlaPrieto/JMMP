// routes/adminRoutes.js

const express = require('express');
const authenticate = require('../middleware/authenticate'); // Middleware de autenticación
const checkRole = require('../middleware/checkRoles'); // Middleware de verificación de roles
const router = express.Router();
const User = require('../models/Users');


router.get('/dashboard', authenticate, checkRole('dashboard', 'admin'), (req, res) => {
  res.send('Bienvenido al panel de administración');
});

router.get('/dashboard/users', authenticate, checkRole('dashboard', 'admin'), async (req, res) => {
    try {
    const users = await User.find({}, '-password'); // Excluir campo de contraseña por seguridad
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});


router.get('/settings', authenticate, checkRole('settings', 'moderator'), (req, res) => {
  res.send('Bienvenido a la configuración');
});

module.exports = router;
