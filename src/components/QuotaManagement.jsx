import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  AlertTitle,
  Alert,
} from '@mui/material';
import config from '../config.json';
import '../css/ButtonsQuotaManager.css'

const QuotaManagement = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [gigabytes, setGigabytes] = useState(0);
  const [alertStatus, setAlertStatus] = useState(null);
  const [newQuota, setNewQuota] = useState(null);

  useEffect(() => {
    fetchUserQuota();
  }, []);

  const fetchUserQuota = async () => {
    // Simular una llamada a la API para obtener los datos del usuario
    const response = await fetch(config.ServerApi + '/QuotaTotal');
    const data = await response.json();
    data.forEach((element) => {
      if (element.name === username) {
        setUserData(element.totalQuota);
      }
    });
  };

  const sendData = async (url, username, gigabytes) => {
    const data = {
      username: String(username),
      gigabytes: Number(gigabytes),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(`Status: ${response.status}`);
        setAlertStatus('error');
      } else {
        setAlertStatus('success');
        setNewQuota(gigabytes);
      }

      return response.status;
    } catch (error) {
      console.error('Error:', error);
      setAlertStatus('error');
    }
  };

  return (
    <div>
      <Typography variant="h5">Gestión de Cuotas</Typography>
      <Box mt={2}>
        <TextField
          label="Usuario a asignar"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {userData && (
          <>
            <Typography variant="h6">{`Admin: ${localStorage.getItem("user").split('@')[0]}`}</Typography>
            <Typography variant="body1">{`Cuota Actual: ${userData} GB`}</Typography>
          </>
        )}
        <TextField
          label="Gigabytes a asignar"
          type="number"
          value={gigabytes}
          onChange={(e) => setGigabytes(parseInt(e.target.value, 10))}
        />
        <Typography variant="body1">{`Nueva Cuota: ${newQuota} GB`}</Typography>
        <div className='buttons-quota'>
        <Button variant="contained" onClick={fetchUserQuota}>
          Buscar Cuota
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            const status = await sendData(
              config.ServerApi + '/ChangeQuota',
              username,
              gigabytes
            );
            if (status === 200) {
              setAlertStatus('success');
              setTimeout(() => {
                setAlertStatus(null);
              }, 3000);
            } else {
              setAlertStatus('error');
              setTimeout(() => {
                setAlertStatus(null);
              }, 3000);
            }
          }}
        >
          Enviar
        </Button>
        </div>
        {alertStatus === 'success' && (
          <Alert severity="success">
            <AlertTitle>Correcto</AlertTitle>
            Cuota Actualizada
          </Alert>
        )}
        {alertStatus === 'error' && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Ha ocurrido un Error
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default QuotaManagement;
