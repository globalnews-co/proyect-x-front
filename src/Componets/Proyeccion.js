import React, {useState} from 'react';
import Navbar from './Statics/Navbar';
import OffCanvasProyeccion from './Statics/OffCanvasProyeccion';
import '../Assets/sb-admin-2.css'

export const Proyeccion = () => {
    const [isOffCanvasProyeccionVisible, setOffCanvasProyeccionVisible] = useState(false);

    const handleOffCanvasClick = () => {
        setOffCanvasProyeccionVisible(!isOffCanvasProyeccionVisible);
    };
    return (
        <div className='container'>
            <Navbar />
            <div className='container'>
                <div className='row' style={{ justifyContent: "space-between" }}>
                    <div className='col-4'>
                        <h4 className='title-directores'>Directores</h4>
                    </div>
                    {/*alinear a la derecha*/}
                    <div className='col-8 col-sm-6'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='row'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Director</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col" onClick={handleOffCanvasClick}>Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Director 1</td>
                            <td>Bogotá</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Director 2</td>
                            <td>Bogotá</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Director 3</td>
                            <td>Medellín</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Director 4</td>
                            <td>Bogotá</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <OffCanvasProyeccion
                show={isOffCanvasProyeccionVisible}
                handleClose={handleOffCanvasClick}
                content={
                    <div>Contenido canvas
                        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            Enlace con href
                        </a>
                        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Botón con data-bs-target
                        </button>

                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
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
                                <div class="dropdown mt-3">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                        Botón dropdown
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="#">Acción</a></li>
                                        <li><a class="dropdown-item" href="#">Otra acción</a></li>
                                        <li><a class="dropdown-item" href="#">Algo más aquí</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>
                }
            />
        </div>
    );
}
