import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const QuotaManagement = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [gigabytes, setGigabytes] = useState(0);

  useEffect(() => {
    // Simular una llamada a la API para obtener los datos del usuario
    const fetchData = async () => {
      // Reemplaza la URL con tu API real
      const response = await fetch('http://10.34.0.100:5173/QuotaTotal');
      const data = await response.json();
      data.forEach(element => {
        if(element.name === localStorage.getItem('user').split('@')[0]){
          console.log(element.totalQuota)
          setUserData(element.totalQuota);
        }
      });
      
    };

    fetchData();
  }, []);

  const sendData = (url, username, gigabytes) => {
    const data = {
      username: String(username),
      gigabytes: Number(gigabytes)
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
          if (!response.ok){
          console.log(`Status: ${response.status}`);
        }
        return response.status
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Typography variant="h5">Gestión de Cuotas</Typography>
      {userData && (
        <Box mt={2}>
          <Typography variant="h6">{`Admin: ${localStorage.getItem("user").split('@')[0]}`}</Typography>
          <TextField
            label="Usuario a asignar"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography variant="body1">{`Cuota Actual: ${userData} GB`}</Typography>
          <TextField
            label="Gigabytes a asignar"
            type="number"
            value={gigabytes}
            onChange={(e) => setGigabytes(parseInt(e.target.value, 10))}
          />
          <Typography variant="body1">{`Nueva Cuota: ${userData.quota + gigabytes} GB`}</Typography>
          <Button variant="contained" onClick={() => sendData('http://10.34.0.100:5173/ChangeQuota', username, gigabytes)}>
            Enviar
          </Button>
        </Box>
      )}
    </div>
  );
};

export default QuotaManagement;
