import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Función para manejar el clic en el botón "Ver"
const handleVerClick = () => {
  // Aquí puedes agregar la lógica para mostrar más detalles de la reunión
  alert('Detalles de la reunión');
};

function createData(evento, cliente, fecha, hora, estado) {
  return { evento, cliente, fecha, hora, estado };
}

const rows = [
  createData('REUNIÓN', 'COCA-COLA', '23-10-2023', '23:00', 'PENDIENTE'),
  createData('REUNIÓN', 'COCA-COLA', '23-10-2023', '23:00', 'PENDIENTE'),
  createData('REUNIÓN', 'COCA-COLA', '23-10-2023', '23:00', 'PENDIENTE'),
  createData('REUNIÓN', 'COCA-COLA', '23-10-2023', '23:00', 'PENDIENTE'),
  createData('REUNIÓN', 'COCA-COLA', '23-10-2023', '23:00', 'PENDIENTE'),
];

export default function CustomizedTables() {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto 0 auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>EVENTO</StyledTableCell>
              <StyledTableCell align="right">CLIENTE</StyledTableCell>
              <StyledTableCell align="right">FECHA&nbsp;</StyledTableCell>
              <StyledTableCell align="right">HORA&nbsp;</StyledTableCell>
              <StyledTableCell align="right">ESTADO&nbsp;</StyledTableCell>
              <StyledTableCell align="right">VER&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.evento}>
                <StyledTableCell component="th" scope="row">
                  {row.evento}
                </StyledTableCell>
                <StyledTableCell align="right">{row.cliente}</StyledTableCell>
                <StyledTableCell align="right">{row.fecha}</StyledTableCell>
                <StyledTableCell align="right">{row.hora}</StyledTableCell>
                <StyledTableCell align="right">{row.estado}</StyledTableCell>
                <StyledTableCell align="right">
                  <a href="#" onClick={handleVerClick}>
                    Ver
                  </a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
