import React from 'react'

function OffCanvasProyeccion() {
  return (
    <div>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Añadir Proyeccion
      </button>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">


          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">Servicio</label>
            <select type="date" class="form-control" id="exampleFormControlInput1" placeholder="Nombre" >
              <option value="1">Servicio 1</option>
              <option value="2">Servicio 2</option>
              <option value="3">Servicio 3</option>
            </select>


            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Fecha Inicio</label>
              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="fechainicio" />
            </div>

            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Fecha Fin</label>
              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="fechafin" />
            </div>

            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Presupuesto</label>
              <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-primary">Guardar</button>

        </div>
      </div>
    </div>
  )
}

export default OffCanvasProyeccion