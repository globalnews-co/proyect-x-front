import React from 'react'
import Navbar from './Statics/Navbar';
import '../Assets/sb-admin-2.css'

export const Proyeccion = () => {
  return (
<div className='prueba'>
    <Navbar/>
      <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Proyección</h1>
                            </div>
                            <form class="user">
                                <div class="p-3 d-flex flex-column justify-content-start">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <select type="text" class="form-control form-control-user" id="exampleFirstName"
                                            placeholder="">

                                            </select>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div class="form-group d-flex flex-column">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address"/>
                                </div>
                                <div class="form-group d-flex flex-column">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"/>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                    </div>
                                </div>
                                <hr/>
                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Registrar
                                </a>
                            </form>
                                <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}
