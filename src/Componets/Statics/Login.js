import React from 'react'
import '../../Assets/loginstyle.css'
import image from '../../Assets/imagenes/Login.jpg'
export default function
    () {
    return (
        <div className='login'>
            <div className="login-container">
                < div className="row justify-content-center" style={{height:'8rem'}}>
                    <img className="logo  translate-middle-y" src={image} alt="logo" />
                </div>
                < div className="row">
                    <h4 className="text-center"><b>Iniciar Sesión</b></h4>
                </div>

                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-10">
                        <form>
                            <div className="form-group mt-2">
                                <label htmlFor="username">Usuario</label>
                                <input type="text" className="form-control mt-2" id="username" placeholder="Usuario" />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control mt-2" id="password" placeholder="Contraseña" />
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn btn-primary btn-block">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
