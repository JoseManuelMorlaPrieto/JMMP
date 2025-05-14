// middleware/checkRole.js

const User = require('../models/Users'); // Importar el modelo de usuario

const checkRole = (section, requiredLevel) => async (req, res, next) => {
  try {
    // Suponiendo que la información del usuario ya está en req.user (por el middleware authenticate)
    const user = req.user;

    // Buscar el rol del usuario para la sección dada
    const userRole = user.roles.find(role => role.section === section);

    if (!userRole) {
      return res.status(403).json({ message: 'Acceso denegado: no tienes acceso a esta sección' });
    }

    // Comprobar si el nivel del rol es suficiente
    if (userRole.level !== requiredLevel) {
      return res.status(403).json({ message: 'Acceso denegado: nivel de acceso insuficiente' });
    }

    // Si tiene el rol y nivel adecuado, continuar con la solicitud
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = checkRole;
