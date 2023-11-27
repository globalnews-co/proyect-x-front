import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import "../Assets/agenda.css"



export  const Servicio = () => {
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
                  AGREGAR SERVICIO
                </Typography>
              </CardContent>
              <CardContent>
                <form onSubmit={handleSubmit} >

                  
                  


                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">SERVICIO</label>
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


export default Servicio;
