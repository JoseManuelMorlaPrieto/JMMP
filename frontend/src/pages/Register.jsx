import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // Datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: [] // Este será un array que contendrá los roles del usuario
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]); // Cambiado a estado para guardar los roles obtenidos
  const [loadingRoles, setLoadingRoles] = useState(false); // Solo se carga cuando hay un token
  const [canEditRoles, setCanEditRoles] = useState(false); // Para saber si el usuario puede editar roles

  // Token de autenticación
  const token = localStorage.getItem('token'); // Asegúrate de que el token está almacenado en localStorage

  // Verificamos si hay un token, si no, no cargamos roles
  useEffect(() => {
    if (token) {
      // Si el token está presente, cargamos los roles
      fetchRoles(token);
    } else {
      // Si no hay token, no necesitamos los roles y evitamos el estado de "cargando"
      setLoadingRoles(false);
    }
  }, [token, navigate]);

  // Función para obtener los roles del usuario
  const fetchRoles = async (token) => {
    setLoadingRoles(true); // Iniciamos el estado de carga
    try {
      const response = await axios.get('http://localhost:3000/api/user/get-roles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const roles = response.data.roles;
      setAvailableRoles(roles); // Establecemos los roles disponibles

      // Verificar si el usuario tiene el rol admin en 'settings'
      const isAdminInSettings = roles.some(
        (role) => role.section === 'settings' && role.level === 'admin'
      );

      setCanEditRoles(isAdminInSettings); // Si tiene admin en settings, podrá editar los roles
      setLoadingRoles(false);
    } catch (error) {
      setError('Error al obtener los roles');
      setLoadingRoles(false);
    }
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja la selección de roles
  const handleRolesChange = (event) => {
    const selectedOptions = event.target.value;
    setFormData(prev => ({
      ...prev,
      roles: selectedOptions.map(roleStr => JSON.parse(roleStr))
    }));
  };

  // Función para registrar el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Comprobación de que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      const { name, email, password, roles } = formData;
      await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
        roles
      });

      // Redirigir al login si la creación fue exitosa
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  // Si los roles aún están cargando, mostramos un mensaje de carga
  if (loadingRoles) {
    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Cargando Roles...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      {/* Solo mostramos el NavBar si hay un token */}
      {token && <NavBar />}
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Registro de Usuario
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <TextField
              label="Nombre"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            {/* Correo electrónico */}
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Contraseña */}
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(prev => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Confirmar Contraseña */}
            <TextField
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Las contraseñas no coinciden' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(prev => !prev)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Selección de Roles */}
            {canEditRoles && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="roles-label">Roles</InputLabel>
                <Select
                  labelId="roles-label"
                  multiple
                  value={formData.roles.map(role => JSON.stringify(role))}
                  onChange={handleRolesChange}
                  renderValue={(selected) => (
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {selected.map((value, index) => {
                        const role = JSON.parse(value);
                        return (
                          <Chip key={index} label={`${role.section} - ${role.level}`} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {availableRoles.map((role, index) => (
                    <MenuItem key={index} value={JSON.stringify(role)}>
                      {role.section} - {role.level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Error al registrar */}
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}

            {/* Botón de registro */}
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrarse
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Register;
