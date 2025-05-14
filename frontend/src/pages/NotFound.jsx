import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import NavBar from '../components/NavBar';

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
          textAlign="center"
        >
          <Typography variant="h2" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="body1">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
