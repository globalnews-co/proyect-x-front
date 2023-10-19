import React from 'react'

export default function OffCanvas() {
    return (
        <div class="offcanvas offcanvas-start bg-dark text-light" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
            <button type="button" class="btn-close text-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="list-unstyled">
                <li><a class="text-light text-decoration-none" href="#">Inicio</a></li>
                <li><a class="text-light text-decoration-none" href="#">Agenda</a></li>
                <li><a class="text-light text-decoration-none" href="#">Proyección</a></li>
                <li><a class="text-light text-decoration-none" href="#">Otras</a></li>
            </ul>
        </div>
    </div>
    
    )
}
