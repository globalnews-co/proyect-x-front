import React from 'react'

export default function Cardsections() {
  return (
    <div><div class="container mt-4">
    <div class="card">
      <div class="card-header">
        Mi Lista
      </div>
      <div class="card-body card-container" style={{maxHeight:'20rem' ,overflowY:'auto'}}>
        <ul class="list-group">
       
          <li class="list-group-item">Elemento 1</li>
          <li class="list-group-item">Elemento 2</li>
          <li class="list-group-item">Elemento 3</li>
          <li class="list-group-item">Elemento 1</li>
          <li class="list-group-item">Elemento 2</li>
          <li class="list-group-item">Elemento 3</li>
          <li class="list-group-item">Elemento 1</li>
          <li class="list-group-item">Elemento 2</li>
          <li class="list-group-item">Elemento 3</li>
          <li class="list-group-item">Elemento 1</li>
          <li class="list-group-item">Elemento 2</li>
          <li class="list-group-item">Elemento 3</li>
        </ul>
      </div>
      <div class="card-footer text-muted">
        <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#crearModal">Crear</button>
        <button class="btn btn-success mr-2" data-toggle="modal" data-target="#actualizarModal">Actualizar</button>
        <button class="btn btn-danger" data-toggle="modal" data-target="#eliminarModal">Eliminar</button>
      </div>
    </div>
  </div></div>
  )
}
