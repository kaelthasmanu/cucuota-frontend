import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const QuotaManagement = () => {
  const [userData, setUserData] = useState(null);
  const [megabytes, setMegabytes] = useState(0);

  useEffect(() => {
    // Simular una llamada a la API para obtener los datos del usuario
    const fetchData = async () => {
      // Reemplaza la URL con tu API real
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, []);

  const handleIncrement = () => {
    setMegabytes((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setMegabytes((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <Typography variant="h5">Gestión de Cuotas</Typography>
      {userData && (
        <Box mt={2}>
          <Typography variant="h6">{`Usuario: ${userData.name}`}</Typography>
          <Typography variant="body1">{`Email: ${userData.email}`}</Typography>
          <Typography variant="body1">{`Cuota Actual: ${userData.quota} MB`}</Typography>
          <TextField
            label="Megabytes a asignar"
            type="number"
            value={megabytes}
            onChange={(e) => setMegabytes(parseInt(e.target.value, 10))}
          />
          <Button variant="contained" onClick={handleIncrement}>
            +1
          </Button>
          <Button variant="contained" onClick={handleDecrement}>
            -1
          </Button>
          <Typography variant="body1">{`Nueva Cuota: ${userData.quota + megabytes} MB`}</Typography>
        </Box>
      )}
    </div>
  );
};

export default QuotaManagement;
