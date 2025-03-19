import React from 'react'

export default function FilterModal() {
    
    return (
        <div class="modal fade " id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content" style={{backgroundColor:'#032644',borderColor:'white'}}>
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className='row container p-2'>
                       
                        <div className='col'>
                        <button type="button" class="btn btn-primary">Aplicar Filtro</button>
                        </div>
                    </div> 

                </div>
            </div>
        </div>
    )
}
