import React, { useEffect, useState } from 'react'
import DataTable, { createTheme }  from 'react-data-table-component';
import Conexion from '../Service/Conexion';
import '../Assets/clientstyle.css'

function ListClientes() {
    const [data, setData] = useState([
        {
          "empresaCliente": "VELOS",
          "nombreContacto": "Ila Hyde",
          "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
          "empresaCliente": "LYRICHORD",
          "nombreContacto": "Kate Gilbert",
          "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
          "empresaCliente": "INTRADISK",
          "nombreContacto": "Lilia Reed",
          "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "VELOS",
            "nombreContacto": "Ila Hyde",
            "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "LYRICHORD",
            "nombreContacto": "Kate Gilbert",
            "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
          {
            "empresaCliente": "INTRADISK",
            "nombreContacto": "Lilia Reed",
            "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
            "selector": 1,
            "idSector": 1,
            "probabilidad": 1
          },
        {
          "empresaCliente": "ISBOL",
          "nombreContacto": "Byers Molina",
          "ciudadCliente": "765 Boardwalk , Whipholt, Oregon, 2161",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
          "empresaCliente": "MEDCOM",
          "nombreContacto": "Briana Chambers",
          "ciudadCliente": "892 Cyrus Avenue, Why, Federated States Of Micronesia, 153",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
          "empresaCliente": "ZILLAR",
          "nombreContacto": "Patti Lott",
          "ciudadCliente": "982 Leonora Court, Marenisco, District Of Columbia, 8377",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        },
        {
          "empresaCliente": "EXOSPEED",
          "nombreContacto": "Hess Johns",
          "ciudadCliente": "439 Bridgewater Street, Bergoo, Virgin Islands, 436",
          "selector": 1,
          "idSector": 1,
          "probabilidad": 1
        }
      ]); 
    /*
    useEffect(() => {
        
       const getData = () => {
            Conexion.getClientes()
                .then((response) => {
                    setData(response.data);
                })
        }
        getData();
    }, [])
    */

    createTheme('solarized', {
        text: {
            primary: '#fff',
            secondary: '#2aa198',
        },
        background: {
            default: '#131212',
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
            name: 'Nombre Empresa',
            selector: 'empresaCliente',
            sortable: true,
        },
        {
            name: 'Nombre Contacto',
            selector: 'nombreContacto',
            sortable: true,
        },
        {
            name: 'Ciudad',
            selector: 'ciudadCliente',
            sortable: true,
        },

        {
            name: 'Telefono',
            selector: 'telefono1',
            sortable: true,
        },
        {
            name: 'Director',
            selector: 'idDirector',
            sortable: true,
        },
        {
            name: 'Sector',
            selector: 'idSector',
            sortable: true,
        },
        {
            name: 'Probabilidad',
            selector: 'probabilidad',
            sortable: true,
        },
        {
            name: '',
            //crear boton desplegar opciones ver editar eliminar
            cell: row => (
                <div>
                    <a type="button" href='www.google.com.co'>
                        <i class="bi bi-three-dots-vertical" />
                    </a>

                </div>
            )

        }


    ]
    return (
        <div className='Body'>
            <div className='container content-list-clientes'>
                <div className='row '>
                    <div className='col-4'>
                <h4 className='title-list-clientes'>Clientes</h4>
                </div>
                {/*alinear a la derecha*/}
                <div className='col-2 position-absolute end-0'>
                <input type="text" placeholder="Buscar" className="input-search" />
                </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    theme="solarized"
                    pointerOnHover={true}
                    highlightOnHover={true}
                    fixedHeader={true}
                    fixedHeaderScrollHeight="600px"
                    pagination
                />

            </div>

        </div>
    )
}

export default ListClientes