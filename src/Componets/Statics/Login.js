import React, { useState } from 'react';
import Conexion from '../../Service/Conexion';
import '../../Assets/loginstyle.css';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Conexion.login(loginForm).then((response) => {
      try {
        localStorage.setItem("token", response.token);
        localStorage.setItem("profile", JSON.stringify(response.profile));
        localStorage.setItem("user", JSON.stringify(response.user));

        if (Object.keys(response.profile).length === 0) {
          window.location.href = "/addProfile";
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        alert("Usuario o contraseña incorrectos");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Conexion.register(registerForm).then((response) => {
      if (response != null) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("profile", JSON.stringify(response.profile));
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.href = "/addProfile";
      } else {
        alert("Usuario ya existe");
      }
    });
  };

  return (
    <section className="background-radial-gradient">
      <div className="container">
        <div className="row-login">
          <div className="col-lg-6" style={{ zIndex: 10 }}>
            <h1 className="text-5xl font-bold" style={{ color: "hsl(218, 81%, 95%)" }}>
              Global News <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>Proyecto X</span>
            </h1>
            <p className="text-xl opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
              Sistema de gestión de clientes y ventas para la empresa GlobalNewsCo
            </p>
          </div>

          <div className="col-lg-6 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card">
              <div className="card-body">
                {/* Tabs */}
                <div className="flex mb-8 bg-white/50 rounded-lg p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 rounded-md text-sm font-medium transition-all duration-200 
                      ${isLogin 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 rounded-md text-sm font-medium transition-all duration-200
                      ${!isLogin 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Registrarse
                  </button>
                </div>

                {isLogin ? (
                  // Login Form
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="form-outline">
                      <label htmlFor="username" className="form-label text-black">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="username"
                        name="username"
                        required
                        className="form-control-login"
                        placeholder="tu@email.com"
                        onChange={handleLoginChange}
                      />
                    </div>

                    <div className="form-outline">
                      <label htmlFor="password" className="form-label text-black">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="form-control-login"
                        placeholder="••••••••"
                        onChange={handleLoginChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Ingresar
                    </button>
                  </form>
                ) : (
                  // Register Form
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="form-outline">
                      <label htmlFor="username" className="form-label text-black">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="username"
                        name="username"
                        required
                        className="form-control-login"
                        placeholder="tu@email.com"
                        onChange={handleRegisterChange}
                      />
                    </div>

                    <div className="form-outline">
                      <label htmlFor="password" className="form-label text-black">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="form-control-login"
                        placeholder="••••••••"
                        onChange={handleRegisterChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Crear cuenta
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;