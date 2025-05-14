# JMMP

Proyecto Full Stack de gestión de usuarios desarrollado con **React**, **Node.js**, **Express** y **MongoDB**.

## ✨ Características

- Autenticación de usuarios (Login)
- Dashboard protegido con visualización de usuarios
- Navegación con React Router
- UI moderna con Material UI (MUI)
- Separación clara entre frontend y backend

---

## 📁 Estructura del proyecto
```
JMMP/
├── backend/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── index.js
│ ├── package-lock.json
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── eslint.config.js
│ ├── index.html
│ ├── vite.config.js
│ ├── package-lock.json
│ └── package.json

```
---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseManuelMorlaPrieto/JMMP.git
cd JMMP
```

### 2. Instalar dependencias
Backend
```bash
Copiar código
cd backend
npm install
Frontend
bash
Copiar código
cd ../frontend
npm install
```
### 3. Ejecutar el servidor y el cliente
Backend (Puerto 3000 por defecto)
```bash
Copiar código
cd backend
npm start
Frontend (Vite - Puerto 5173 por defecto)
bash
Copiar código
cd ../frontend
npm run dev
```
### 🔐 Autenticación
Al hacer login correctamente, se guarda un token JWT en localStorage.

El dashboard /dashboard está protegido y requiere un usuario autenticado.

### 🧪 Tecnologías usadas
Frontend: React, Vite, React Router DOM, Material UI (MUI)

Backend: Node.js, Express, MongoDB, JWT, bcrypt

Herramientas: Git, GitHub, VSCode

### 📝 Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

### 👨‍💻 Autor
José Manuel Morla Prieto
GitHub
