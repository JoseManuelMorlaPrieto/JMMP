// routes/user.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Ruta para obtener los roles del usuario a partir del token
router.get('/get-roles', authenticate, (req, res) => {
  // Verificamos que el usuario tenga roles en su payload
  if (!req.user || !req.user.roles) {
    return res.status(403).json({ message: 'Roles no encontrados en el token' });
  }

  // Devolver los roles del usuario
  return res.status(200).json({ roles: req.user.roles });
});

module.exports = router;
