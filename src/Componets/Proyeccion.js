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
        <div className='prueba'>
            <Navbar />
            
            <div className='container content-list-clientes'>
                <div className='row container-clients' style={{ justifyContent: "space-between" }}>
                    <div className='col-4'>
                        <h4 className='title-list-clientes'>Directores</h4>
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
                show={isOffCanvasVisible}
                handleClose={handleOffCanvasClick}
                content={<div>Tu contenido OffCanvas aquí</div>}
            />
        </div>
    );
}
