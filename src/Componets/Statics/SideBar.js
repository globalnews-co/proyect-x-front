import React from 'react'
import '../../Assets/navbar.css'

export default function SideBar() {
    return (
        <div class="offcanvas offcanvas-start  mysidebar text-light" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="sidebar-header">
        <h5 class="sidebar-title">Menú</h5>
        <button type="button" class="btn btn-light" id="closeSidebar">Cerrar</button>
    </div>
    <div class="sidebar-body">
        <ul class="list-unstyled">
            <li><a class="text-decoration-none" href="#">Inicio</a></li>
            <li><a class="text-decoration-none" href="/agenda">Agenda</a></li>
            <li><a class="text-decoration-none" href="/proyeccion">Proyección</a></li>
            <li><a class="text-decoration-none" href="/clientes">Clientes</a></li>
        </ul>
    </div>
    </div>
    
    
    )
}
