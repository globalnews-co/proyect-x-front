import React from "react";

export default function FormClientes() {
    
  return (
    <div>
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="empresa">Empresa</label>
            <input
              type="text"
              class="form-control"
              id="empresa"
              placeholder="Nombre de la empresa"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              class="form-control"
              id="telefono"
              placeholder="Número de teléfono"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="fuente">Fuente</label>
            <input
              type="text"
              class="form-control"
              id="fuente"
              placeholder="Fuente de contacto"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="nombre-contacto">Nombre de Contacto</label>
            <input
              type="text"
              class="form-control"
              id="nombreContacto"
              placeholder="Nombre del contacto"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Correo electrónico"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="red-social">Red Social</label>
            <input
              type="text"
              class="form-control"
              id="red-social"
              placeholder="Perfil de redes sociales"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="sector">Sector</label>
            <input
              type="text"
              class="form-control"
              id="sector"
              placeholder="Sector de la empresa"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="tipo-servicio">Tipo de Servicio</label>
            <input
              type="text"
              class="form-control"
              id="tipo-servicio"
              placeholder="Tipo de servicio ofrecido"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="observacion">Observación</label>
          <textarea
            class="form-control"
            id="observacion"
            rows="3"
            placeholder="Observaciones"
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="probabilidad">Probabilidad</label>
            <input
              type="text"
              class="form-control"
              id="probabilidad"
              placeholder="Probabilidad de conversión"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="nivel-educativo">Nivel Educativo</label>
            <input
              type="text"
              class="form-control"
              id="nivel-educativo"
              placeholder="Nivel educativo del contacto"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="ciudad">Ciudad</label>
          <input
            type="text"
            class="form-control"
            id="ciudad"
            placeholder="Ciudad"
          />
        </div>
        <button type="submit" class="btn btn-primary" >
          Enviar
        </button>
      </form>
    </div>
  );
}
