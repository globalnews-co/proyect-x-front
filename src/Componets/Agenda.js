import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


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

  const handleSelectChange = (e) => {
    setFormState({ ...formState, selectValue: e.target.value });
  };

  const handleFechaChange = (e) => {
    setFormState({ ...formState, fechaValue: e.target.value });
  };

  const handleHoraChange = (hora) => {
    console.log(hora)
    const horaformateada=hora.format("yyyy-MM-DDThh:mm")
  setFormState({ ...formState, horaValue: horaformateada });
  };

  const handleChange = (event) => {
    setFormState({ ...formState, age: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores del formulario:', formState);
  };

  const [value, setValue] = React.useState('2023-08-18T21:11');

  const handleChange2 = (newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4} sm={12} md={12} xl={12} lg={12}>
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <Typography variant="h5" color="primary">
                Agenda Comercial
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4} xl={4} lg={4}>
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <Typography variant="h5" color="primary">
                AGREGAR AGENDA
              </Typography>
            </CardContent>
            <CardContent>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Observación</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa texto"
                    value={formState.inputValue}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Selecciona una opción:</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleSelectChange}
                    value={formState.selectValue}
                  >
                    <option value="">Seleccionar opción</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleFechaChange}
                    value={formState.fechaValue}
                  />
                </Form.Group>

                <Form.Group>

                  <Form.Label>Hora:</Form.Label>
                  <div className="input-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Hora"
                        value={formState.horaValue}
                        onChange={handleHoraChange}
                        renderInput={(params) => <TextField {...params} />}
                      />

                    </LocalizationProvider>
<p>La hora seleccionada es: {formState.horaValue}</p>

                
                  </div>
                 
                </Form.Group>

                <Form.Group>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formState.age}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
