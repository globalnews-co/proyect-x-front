import React from 'react'
import DataTable from 'react-data-table-component';
import OffCanvasProyeccion from './OffCanvasProyeccion';

const ModalProyeccion = (props) => {
    const { nombreDirector, idCliente } = props;
    const dataProyeccion = [{ id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }, { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }     
    , { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }
    , { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }

    ];
    const columns = [
        {
            name: 'Nombre Director',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'servicio',
            selector: 'servicio',
            sortable: true,
            right: true,
        },
        {
            name: 'Fecha Inicio',
            selector: 'year',
            sortable: true,
            right: true,
        },
        {
            name: 'Fecha Fin',
            selector: 'year2',
            sortable: true,
            right: true,
        },
        {
            name: 'Proyeccion Ventas',
            selector: 'proyeccion',
            sortable: true,
            right: true,
        }


    ];

    return (
        <div>
            <div class="modal  fade" id="modalProyeccion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Proyeccion {nombreDirector}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                        <OffCanvasProyeccion/>


                            <DataTable
                                data={dataProyeccion}
                                columns={columns}
                                pagination
                                paginationPerPage={5}
                            />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ModalProyeccion