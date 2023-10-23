import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import "../Assets/agenda.css"
import moment from 'moment';




const Agenda = () => {
  const [formState, setFormState] = useState({
    inputValue: '',
    selectValue: '',
    fechaValue: '',
    horaValue: moment().format('yyyy-MM-DDThh:mm'),
    age: '',
  });

  const handleInputChange = (e) => {
    setFormState({ ...formState, inputValue: e.target.value });
  };


  const handleHoraChange = (hora) => {
    console.log(hora);
    const horaformateada = hora.format('yyyy-MM-DDThh:mm');
    setFormState({ ...formState, horaValue: horaformateada });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores del formulario:', formState);
  };




  return (

    <div >
      
      <div style={{position:"fixed",backgroundColor:"#ffffff00",width:"100%",height:"100%",zIndex:"99"}} className=''>
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
                    <select class="form-control" id="exampleFormControlInput1" placeholder="SELCCIONAR CLIENTE" >

                      <option value="COCA-COLA"> COCA-COLA </option>
                      <option value="UBER"> UBER</option>
                      <option value="3"> ANI </option>
                      <option value="4"> ANATO </option>


                    </select>

                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">EVENTO</label>
                    <select class="form-control" id="exampleFormControlInput1" placeholder="SELCCIONAR CLIENTE">

                      <option value="1"> REUNION </option>
                      <option value="2"> DFD</option>
                      <option value="3"> DF </option>
                      <option value="4"> DFD </option>


                    </select>

                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">FECHA</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={(e)=>setFormState({...formState,fechaValue:e.target.value})}/>
                  </div>

                  <Form.Group>
                    <Form.Label>Hora:</Form.Label>
                    <div className="input-group" >
                      <LocalizationProvider dateAdapter={AdapterDayjs}style={{backgroundColor:'white'}}>
                        <TimePicker
                          value={formState.horaValue}
                          onChange={handleHoraChange}
                          renderInput={(params) => <TextField {...params} style={{backgroundColor:'white'}}/>}
                        />
                      </LocalizationProvider>
                      <p>La hora seleccionada es: {formState.horaValue}</p>
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
export default Agenda;