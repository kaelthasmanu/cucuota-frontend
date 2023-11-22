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
      const response = await fetch('http://10.34.0.100:5173/QuotaTotal');
      const data = await response.json();
      data.forEach(element => {
        if(element.name === localStorage.getItem('user').split('@')[0]){
          setUserData(element.totalQuota);
        }
      });
      
    };

    fetchData();
  }, []);

  const handleIncrement = () => {
    setMegabytes((prev) => prev + 1);
  };

  return (
    <div>
      <Typography variant="h5">Gestión de Cuotas</Typography>
      {userData && (
        <Box mt={2}>
          <Typography variant="h6">{`Usuario: ${localStorage.getItem("user").split('@')[0]}`}</Typography>
          <Typography variant="body1">{`Email: ${localStorage.getItem("user")}`}</Typography>
          <Typography variant="body1">{`Cuota Actual: ${userData} GB`}</Typography>
          <TextField
            label="Gigabytes a asignar"
            type="number"
            value={megabytes}
            onChange={(e) => setMegabytes(parseInt(e.target.value, 10))}
          />
          <Button variant="contained" onClick={handleIncrement}>
            Enviar
          </Button>
          <Typography variant="body1">{`Nueva Cuota: ${userData.quota + megabytes} GB`}</Typography>
        </Box>
      )}
    </div>
  );
};

export default QuotaManagement;
