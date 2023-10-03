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
                            <th scope="col">Facturado</th>
                            <th scope="col" onClick={handleOffCanvasClick}>Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Director 1</td>
                            <td>Bogotá</td>
                            <td>$ 123</td>
                            <td onClick={handleOffCanvasClick}>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Director 2</td>
                            <td>Bogotá</td>
                            <td>$ 123</td>
                            <td onClick={handleOffCanvasClick}>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Director 3</td>
                            <td>Medellín</td>
                            <td>$ 12113</td>
                            <td onClick={handleOffCanvasClick}>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Director 4</td>
                            <td>Bogotá</td>
                            <td>$ 12113</td>
                            <td onClick={handleOffCanvasClick}>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td colspan="2">TOTALES</td>
                            <td>$ 100.000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <OffCanvasProyeccion
                show={isOffCanvasProyeccionVisible}
                handleClose={handleOffCanvasClick}
                content={
                    <div>Contenido canvas
                    
                </div>
                }
            />
        </div>
    );
}
