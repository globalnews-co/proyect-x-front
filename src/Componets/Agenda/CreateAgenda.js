import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CardContent, CardHeader, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment/moment';
import Conexion from '../../Service/Conexion';
import { DataContext } from './Context/DataContext';

const Agenda = () => {

  const { setShowModal } = useContext(DataContext);
  const [formState, setFormState] = useState({
    inputValue: '',
    selectValue: '',
    fechaValue: '',
    horaInicioValue: moment().format('yyyy-MM-DDThh:mm'),
    horaFinValue: moment().format('yyyy-MM-DDThh:mm'),
  
  });

  const handleInputChange = (e) => {
    setFormState({ ...formState, inputValue: e.target.value });
  };

  const handleHoraChange = (hora, isHoraInicio) => {
    const horaformateada =hora.format('HH:mm');
    // Añadir la hora a la fecha
    const fecha = moment(formState.fechaValue).format('yyyy-MM-DD');
    const fechaHora = moment(fecha.toString()+'T'+horaformateada.toString())
  
    console.log('Fecha y hora formateada:', fechaHora.format('yyyy-MM-DDTHH:mm'));
    if (isHoraInicio) {
      setFormState({ ...formState, horaInicioValue: fechaHora.format('yyyy-MM-DDTHH:mm') });
    } else {
      setFormState({ ...formState, horaFinValue: fechaHora.format('yyyy-MM-DDTHH:mm') });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores del formulario:', formState);
    const data = {
      IdDirector: 1,  
      FechaInicio: formState.horaInicioValue,
      FechaFin: formState.horaFinValue,
      Proposito: formState.inputValue,
    };
    Conexion.CreateAgenda(data).then((response) => {
      console.log('response', response);
      
        alert('Agenda creada correctamente');
        window.location.reload();
    }
    );

  };

  return (
    <div>
  <div style={{position:'fixed', backgroundColor: '#00000061', width: '100%',height:'100vh', zIndex: '99' }}>
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4} xl={4} className='mt-4'>
        <Card className="contentcolor">
          <CardContent>
             <div className='row'>
              <div className='col'>
                  <h4 className="card-title">AGENDA</h4>
              </div>              
              <div className='col' style={{display:"flex",justifyContent:"end"
              , color:"red",cursor:"pointer"}} onClick={()=>{setShowModal(false)}}>
                <h4 className="card-title">X</h4>
              </div>
              </div>
            
            <form className="mt-2" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cliente" className="form-label">
                  CLIENTE
                </label>
                <select className="form-control" id="cliente" placeholder="SELCCIONAR CLIENTE">
                  <option value="COCA-COLA">COCA-COLA</option>
                  <option value="UBER">UBER</option>
                  <option value="3">ANI</option>
                  <option value="4">ANATO</option>
                </select>
              </div>

                 <div class="mb-3">
                    <label for="fecha" class="form-label">
                      FECHA
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="fecha"
                      placeholder=""
                      onChange={(e) => setFormState({ ...formState, fechaValue: e.target.value })}
                    />
                  </div>
                  <div className='row'>
                  <div className='col-6'>
                    <Form.Label>Hora de Inicio:</Form.Label>
                    <div className="input-group">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          value={formState.horaInicioValue}
                          onChange={(hora) => handleHoraChange(hora, true)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className='col-6'>
                    <Form.Label>Hora Fin:</Form.Label>
                    <div className="input-group">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          value={formState.horaFinValue}
                          onChange={(hora) => handleHoraChange(hora, false)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  </div>
                  <div class="mb-3">
                    <label for="observacion" class="form-label">
                      Observación
                    </label>
                    <textarea
                      class="form-control"
                      id="observacion"
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

export default Agenda;
