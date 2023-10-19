import React, { useState } from 'react'
import '../../Assets/offcanvasproyeccion.css'
import Conexion from '../../Service/Conexion'
import Swal from 'sweetalert2'


function OffCanvasProyeccion() {
const [idServcio, setidServicio] = useState('')
const [fechaInicio, setfechaInicio] = useState('')
const [fechaFin, setfechaFin] = useState('')
const [proyeccionValor, setproyeccionValor] = useState('')
const [idProyeccion, setidProyeccion] = useState(0)


const submitData = ()=>{

  
const form = {
  idDirector: 1,//localStorage.getItem('IDdirector'),
  // convertir a int
  idServicio: parseInt(idServcio),
  fechaInicio,
  fechaFin,
  proyeccionValor
}
if (idProyeccion === 0){
  Conexion.CreateProyeccion(form).then(()=>{
    Swal.fire({
      title:'Proyeccion cliente guardado con éxito'
    })
  })
  .catch (()=>{
    Swal.fire({
      title:'Ocurrio un error no, se pudo guardar la proyeccion'
    })
  })
}
else{
  Conexion.UpdateProyeccion(form).then(()=>{
    Swal.fire({
      title:'Proyeccion de cliente guardada con éxito'
    })
  })
  .catch (()=>{
    Swal.fire({
      title:'Ocurrio un error, no se pudo actualizar la proyeccion'
    })
  })
}
}
const deleteProyeccion = ()=>{
  Conexion.DeleteProyeccion(idProyeccion).then(()=>{
    Swal.fire({
      title:'Proyeccion eliminada'
    })
  })
  .catch (()=>{
    Swal.fire({
      title:'Ocurrio un error, no se pudo eliminar la proyeccion'
    })
  })
}

  return (
    <div class='container-offcanvas'>
      <div class='boton-añadir'>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProyeccion" aria-controls="offcanvasProyeccion">
          Añadir Proyeccion
        </button>
      </div>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasProyeccion" aria-labelledby="offcanvasProyeccionLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Nueva Proyección</h5>
          <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class='container'>
        <div class="offcanvas-body">
        {(idProyeccion !== 0) ? (
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
                style={{ color: '#ff7a7a', cursor: 'pointer' }}
                onClick={deleteProyeccion}
              >
                Eliminar Proyeccion <i className="bi bi-trash2-fill"></i>
              </label>
            </div>
          ) : null}
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">Servicio</label>
            <select type="date" class="form-control" id="exampleFormControlInput1" value={idServcio} onChange={(e)=>{setidServicio(e.target.value)}}>
              <option value="1">Servicio 1</option>
              <option value="2">Servicio 2</option>
              <option value="3">Servicio 3</option>
            </select>

              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Fecha Inicio</label>
                <input type="date" class="form-control" id="exampleFormControlInput1" value={fechaInicio} onChange={(e)=>{setfechaInicio(e.target.value)}}/>
              </div>

              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Fecha Fin</label>
                <input type="date" class="form-control" id="exampleFormControlInput1" value={fechaFin} onChange={(e)=>{setfechaFin(e.target.value)}}/>
              </div>

              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Presupuesto</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={proyeccionValor} onChange={(e)=>{setproyeccionValor(e.target.value)}}/>
                </div>
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-primary" onClick={submitData}>Guardar</button>

        </div>
      </div>
    </div>
  )
}

export default OffCanvasProyeccion