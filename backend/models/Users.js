const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para la encriptación de contraseñas

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email único
  password: { type: String, required: false }, // Contraseña (solo para login tradicional)
  googleId: { type: String, required: false, sparse: true }, // Google ID (solo para login con Google)
  name: { type: String, required: false }, // Nombre del usuario
  avatar: { type: String, required: false }, // Foto de perfil (opcional)
  roles: [{ // Array de roles
    section: { type: String, required: true }, // Sección del sistema
    level: { type: String, required: true }, // Nivel de acceso (por ejemplo, 'admin', 'viewer')
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si no se ha modificado la contraseña, no la encriptamos

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Encriptar contraseña
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar la contraseña durante el login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Crear el modelo
const User = mongoose.model('User', userSchema);

module.exports = User;
