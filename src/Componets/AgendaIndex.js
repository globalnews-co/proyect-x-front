import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Navbar from './Statics/Navbar';

import Conexion from '../Service/Conexion';




export const AgendaIndex = () => {
  const [formState, setFormState] = useState({
    idcliente: '',
    proposito: '',
    fecha: '',
    horainicio: '2023-08-18T21:11',
    horafin: '2023-08-18T21:11',
  });
const[idcliente,setidcliente]=useState("")
const[propositoid,setpropositoid]=useState("")
const[fecha,setfecha]=useState("")
const[horainicio,sethorainicio]=useState("")
const[horafin,sethorafin]=useState("")
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
    console.log(hora);
    const horaformateada = hora.format('yyyy-MM-DDThh:mm');
    setFormState({ ...formState, horaValue: horaformateada });
  };

  const handleChange = (event) => {
    setFormState({ ...formState, age: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formulario={idcliente,propositoid,fecha,horainicio,horafin}
    Conexion.CreateAgenda(formulario)
    alert('Valores del formulario:', formState);
  };

  const [value, setValue] = React.useState('2023-08-18T21:11');

  const handleChange2 = (newValue) => {
    setValue(newValue);
  };

  return (

    <div >
      <Navbar />
      <div className='Body'>
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >

          <Grid item xs={4} sm={4} md={4} xl={4} lg={4}>
            <Card className='contentcolor'>
              <CardHeader></CardHeader>
              <CardContent>
                <Typography variant="h5" color="white">
                  AGREGAR AGENDA
                </Typography>
              </CardContent>
              <CardContent>
                <form onSubmit={handleSubmit} >

                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">CLIENTE</label>
                    <select class="form-control" id="exampleFormControlInput1" placeholder="SELCCIONAR CLIENTE" value={idcliente} 
                    onChange={(e)=>{setidcliente(e.target.value)}}>

                      <option value="COCA-COLA"> COCA-COLA </option>
                      <option value="UBER"> UBER</option>
                      <option value="3"> ANI </option>
                      <option value="4"> ANATO </option>


                    </select>

                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">EVENTO</label>
                    <select class="form-control" id="exampleFormControlInput1" placeholder="SELCCIONAR CLIENTE" value={propositoid}
                    onChange={(e)=>{setpropositoid(e.target.value)}}>

                      <option value="1"> REUNION </option>
                      <option value="2"> DFD</option>
                      <option value="3"> DF </option>
                      <option value="4"> DFDSSSSSSS </option>


                    </select>

                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">FECHA</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" value={fecha} 
                    onChange={(e)=>{setfecha(e.target.value)}}/>
                  </div>

                  <Form.Group>
                    <Form.Label>Hora Inicio:</Form.Label>
                    <div className="input-group" >
                      <LocalizationProvider dateAdapter={AdapterDayjs}style={{backgroundColor:'white'}}>
                        <TimePicker
                          value={horainicio}
                          onChange={(e)=>{sethorainicio(e.target.value)}}
                          renderInput={(params) => <TextField {...params} style={{backgroundColor:'white'}}/>}
                        />
                      </LocalizationProvider>
                      
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Hora Fin :</Form.Label>
                    <div className="input-group" >
                      <LocalizationProvider dateAdapter={AdapterDayjs}style={{backgroundColor:'white'}}>
                        <TimePicker
                          value={horafin}
                          onChange={(e)=>{sethorafin(e.target.value)}}
                          renderInput={(params) => <TextField {...params} style={{backgroundColor:'white'}}/>}
                        />
                      </LocalizationProvider>
                      
                    </div>
                  </Form.Group>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Observación</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={formState.inputValue} onChange={handleInputChange}></textarea>
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

