import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import OffCanvasProyeccion from './OffCanvasProyeccion';
import '../../../Assets/modalpstyle.css'
import FilterModal from '../FilterModal';

const ModalProyeccion = (props) => {
    const { nombreDirector, idCliente } = props;
    const dataProyeccion = [{ id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }, ,
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }, ,
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' }, ,
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },
    { id: 1, title: 'Conan the Barbarian', servicio: 'hola mundo', year: '1982', year2: '2020', proyeccion: '1000000' },

    ];
    createTheme('solarized-modal', {
        text: {
            primary: '#fff',
            secondary: '#2aa198',
        },
        background: {
            default: '#303130',
        },
        context: {
            background: '#0dfd2d',
            text: '#0dfd2d',
        },
        divider: {
            default: '#073642',
        },
        highlightOnHover: {
            default: '#073642',
            text: '#ffffff',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgb(198, 58, 58)',
            disabled: 'rgba(0,0,0,.12)',

        },
    }, 'dark');
    const columns = [
        {
            name: 'Nombre Director',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Servicio',
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
        ,
    ];

    return (
        <div class='containerModal'>
            <FilterModal />
            <div class="modal  fade" id="modalProyeccion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class='modals'>
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Proyeccion {nombreDirector}</h1>
                                <div class='search'>
                                    <div className='row'>
                                        <div className='col-6' data-bs-toggle="modal" data-bs-target="#filterModal" style={{ cursor: 'pointer' }}>
                                            <i class="bi bi-funnel-fill">Filtrar</i>
                                        </div>
                                        <div className='col-3'>
                                            <input className="dark-input" type="text" placeholder="Buscar..." />
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <OffCanvasProyeccion />
                                <div className='row'>
                                    <div className='col-8'>
                                        <DataTable
                                            theme="solarized-modal"
                                            data={dataProyeccion}
                                            highlightOnHover={true}
                                            columns={columns}
                                            pagination
                                            paginationPerPage={5}
                                        />

                                    </div>
                                    <div className='col-4'   >
                                        <div className='row'>
                                            <div class="card" style={{ width: '10rem', backgroundColor: "#6F7D8C", margin:"0.3rem" }}>
                                                <div class="card-body">
                                                    <h5 class="card-title">NUEVAS VENTAS</h5>
                                                    <p class="card-text">$ 1000</p>
                                                </div>
                                            </div>
                                            <div class="card" style={{ width: '9rem' , margin:"0.3rem"}}>
                                                <div class="card-body">
                                                    <h5 class="card-title">VENTAS 2020</h5>
                                                    <p class="card-text">$ 1000</p>
                                                </div>
                                            </div>
                                            <div class="card" style={{ width: '10rem' , margin:"0.3rem"}}>
                                                <div class="card-body">
                                                    <h5 class="card-title">BAJAS 2021</h5>
                                                    <p class="card-text">$ 1000</p>
                                                </div>
                                            </div>
                                            <div class="card" style={{ width: '9rem' , margin:"0.3rem"}}>
                                                <div class="card-body">
                                                    <h5 class="card-title">PRESUPUESTO</h5>
                                                    <p class="card-text">$ 1000</p>
                                                </div>
                                            </div>
                                            <div class="card" style={{ width: '19.5rem' , margin:"0.3rem", textAlign:"center"}}>
                                                <div class="card-body">
                                                    <h5 class="card-title">FACTURADO</h5>
                                                    <p class="card-text">$ 1000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProyeccion