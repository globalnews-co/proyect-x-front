import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import OffCanvasProyeccion from './OffCanvasProyeccion';
import '../../Assets/modalpstyle.css'
import Conexion from '../../Service/Conexion'
import moment from 'moment/moment';

const ModalProyeccion = (props) => {
    const { nombreDirector, idDirector } = props;
    const [dataProyeccion, setDataProyeccion] = useState([])
     useEffect(()=>{
        const getdata = ()=> {
            Conexion.getProyeccionDir(idDirector).then((Response)=>{
                setDataProyeccion(Response)
            })
        }
        getdata()
     } , [idDirector])
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
            selector: 'nombreDirector',
            sortable: true,
        },
        {
            name: 'Servicio',
            selector: 'nombreServicio',
            sortable: true,
            right: true,
        },
        {

            name: 'Fecha Inicio',
            // dar formato a la fecha con moment yyyy-mm-dd
            selector: row => moment(row.fechaInicio).format('DD MMM YYYY'),
            sortable: true,
            right: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => moment(row.fechaFin).format('DD MMM YYYY'),
            sortable: true,
            right: true,
        },
        {
            name: 'Proyeccion Ventas',
            selector: row => row.proyeccionValor,
            sortable: true,
            right: true,
        }


    ];

    return (
        <div class='containerModal'>
            <div class="modal  fade" id="modalProyeccion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Proyeccion {nombreDirector}</h1>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        
                        <div class="modal-body">
                            <OffCanvasProyeccion />
                            <DataTable
                                theme="solarized-modal"
                                data={dataProyeccion}
                                highlightOnHover={true}
                                columns={columns}
                                pagination
                                paginationPerPage={5}
                            />

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ModalProyeccion