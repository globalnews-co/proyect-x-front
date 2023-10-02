import React, { useState } from 'react'
import '../../Assets/loginstyle.css'
import image from '../../Assets/imagenes/Login.jpg'
import Conexion from '../../Service/Conexion'
export default function () {
    const [form, setForm] = useState({
        userName: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };
    const login = (e) => {
        e.preventDefault();
        Conexion.login(form).then((response) => {
            console.log("response", response);
            if (response) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("IDdirector", response.idDirector );
                localStorage.setItem("IDuser", response.idUser);
                if (response.idDirector === null) {
                    window.location.href = "/addProfile";
                }
                else{
                window.location.href = "/fd";
                }
            }
            else {
                alert("Usuario o contraseña incorrecta")
            }
        });

    }

    return (
        <div className='login'>
            <div className="login-container">
                < div className="row justify-content-center" style={{ height: '8rem' }}>
                    <img className="logo  translate-middle-y" src={image} alt="logo" />
                </div>
                < div className="row">
                    <h4 className="text-center"><b>Iniciar Sesión</b></h4>
                </div>

                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-10">
                        <form>
                            <div className="form-group mt-2">
                                <label htmlFor="username" >Usuario</label>
                                <input type="text" className="form-control mt-2" id="userName" placeholder="Usuario" onChange={handleChange} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control mt-2" id="password" placeholder="Contraseña" onChange={handleChange} />
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn btn-primary btn-block" onClick={login}>Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
