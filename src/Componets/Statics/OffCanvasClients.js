import React from 'react'

export default function OffCanvasClients(props) {
    const { idCliente } = props;
    return (
        <div>
            <div class="offcanvas  offcanvas-end text-bg-dark" tabindex="-1" id="offCanvasClients" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel"><i class="bi bi-person-fill"> Detalle del cliente </i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label" style={{color:'#ff7a7a'}}>Eliminar Cliente <i class="bi bi-trash2-fill"></i></label>
                     </div>
                    <div>

                        <div class="row">
                            <div class="col">
                                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nombre" />
                            </div>
                            <div class="col">
                                <label for="exampleFormControlInput1" class="form-label">Apellido</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Apellido" />
                            </div>
                        </div>
                        
                    </div>
                    <div class="dropdown mt-3">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
