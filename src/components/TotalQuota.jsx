import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TablePagination,
} from '@mui/material';
import config from '../config.json'

const ApiCallComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(config.ServerApi+'/cuota');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box mb={2}>
        <Button variant="contained" onClick={fetchData}>
          Cargar Datos
        </Button>
      </Box>
      {data.length > 0 ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Traffic (Daily)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.name}>
                  <TableCell>{row.name === "-" ? "Total" : row.name}</TableCell>
                  <TableCell>{Math.round(row.trafficD / 1024)} GB</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography>No hay datos para mostrar. Presiona "Cargar Datos".</Typography>
      )}
    </div>
  );
};

export default ApiCallComponent;
