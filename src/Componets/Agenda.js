import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import "../Assets/agenda.css"

export const Agenda = () => {
  const [formState, setFormState] = useState({
    inputValue: '',
    selectValue: '',
    fechaValue: '',
    horaValue: '2023-08-18T21:11',
    age: '',
  });

  const handleInputChange = (e) => {
    setFormState({ ...formState, inputValue: e.target.value });
  };

  const handleHoraChange = (hora) => {
    const horaFormateada = hora
      ? hora.format('YYYY-MM-DDTHH:mm')
      : '2023-08-18T21:11';

    const fechaYHoraFormateada = formState.fechaValue
      ? `${formState.fechaValue}T${horaFormateada.split('T')[1]}`
      : horaFormateada;

    setFormState({ ...formState, horaValue: fechaYHoraFormateada });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores del formulario:', formState);
  };

  return (
    <div>
      <div style={{  backgroundColor: "#ffffff00", width: "200%", height: "100%" }} className=''>
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <Card className='contentcolor'>
              <CardHeader></CardHeader>
              <CardContent>
                <Typography variant="h5" color="black">
                  AGREGAR AGENDA
                </Typography>
              </CardContent>
              <CardContent>
                <form onSubmit={handleSubmit} >
                  <div className="mb-3">
                    <label htmlFor="cliente" className="form-label">CLIENTE</label>
                    <select id="cliente" className="form-control" placeholder="SELCCIONAR CLIENTE">
                      <option value="COCA-COLA">COCA-COLA</option>
                      <option value="UBER">UBER</option>
                      <option value="3">ANI</option>
                      <option value="4">ANATO</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cuenta" className="form-label">CUENTA</label>
                    <select id="cuenta" className="form-control" placeholder="SELCCIONAR CUENTA">
                      <option value="COCA-COLA">COCA-COLA</option>
                      <option value="UBER">UBER</option>
                      <option value="3">ANI</option>
                      <option value="4">ANATO</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="evento" className="form-label">EVENTO</label>
                    <select id="evento" className="form-control" placeholder="SELCCIONAR EVENTO">
                      <option value="1">REUNION</option>
                      <option value="2">DFD</option>
                      <option value="3">DF</option>
                      <option value="4">DFD</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">FECHA</label>
                    <input
                      type="date"
                      id="fecha"
                      className="form-control"
                      placeholder=""
                      value={formState.fechaValue}
                      onChange={(e) => setFormState({ ...formState, fechaValue: e.target.value })}
                    />
                  </div>

                  <Form.Group>
                    <Form.Label>Hora:</Form.Label>
                    <div className="input-group" >
                      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ backgroundColor: 'white' }}>
                        <TimePicker
                          value={formState.horaValue}
                          onChange={handleHoraChange}
                          renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} />}
                        />
                      </LocalizationProvider>
                      <p>La hora seleccionada es: {formState.horaValue}</p>
                    </div>
                  </Form.Group>

                  <div className="mb-3">
                    <label htmlFor="observacion" className="form-label">Observación</label>
                    <textarea
                      id="observacion"
                      className="form-control"
                      rows="3"
                      value={formState.inputValue}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
