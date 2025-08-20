import React, { useState } from 'react';
import Conexion from '../../Service/Conexion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
  });

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordForm({
      ...forgotPasswordForm,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login form data:', loginForm);

    try {
      const response = await Conexion.login(loginForm);

      // Verificar si la respuesta contiene un token (indica éxito)
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("profile", JSON.stringify(response.profile));
        localStorage.setItem("user", JSON.stringify(response.user));

        if (Object.keys(response.profile).length === 0) {
          window.location.href = "/addProfile";
        } else {
          window.location.href = "/";
        }
      } else {
        // Si no hay token, es un error lógico del backend
        alert(response.message || 'Error en el inicio de sesión');
      }

    } catch (error) {
      console.error('Error de login:', error);
      // Para errores de red o del servidor
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error de conexión');
      }
    }
  };



  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register form data:', registerForm);
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordForm.email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    const response = Conexion.forgotPassword({ email: forgotPasswordForm.email });
    alert((await response).data.message);
    setIsForgotPassword(false);
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setIsLogin(true);
  }

  const styles = {
    backgroundRadialGradient: {
      backgroundColor: 'hsl(218, 41%, 15%)',
      backgroundImage: `radial-gradient(650px circle at 0% 0%, hsl(218, 41%, 35%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%),
        radial-gradient(1250px circle at 100% 100%, hsl(218, 41%, 45%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%)`,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '2rem'
    },
    leftColumn: {
      flex: '1 1 400px',
      minWidth: '300px',
      padding: '1rem',
      zIndex: 10
    },
    rightColumn: {
      flex: '1 1 400px',
      minWidth: '300px',
      maxWidth: '500px',
      padding: '1rem'
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: "hsl(218, 81%, 95%)",
      marginBottom: '1rem',
      lineHeight: '1.1'
    },
    subtitle: {
      color: "hsl(218, 81%, 75%)"
    },
    description: {
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      opacity: 0.7,
      color: "hsl(218, 81%, 85%)",
      lineHeight: '1.5'
    },
    card: {
      background: 'hsla(0, 0%, 100%, 0.9)',
      backdropFilter: 'blur(30px)',
      borderRadius: '1rem',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      border: '1px solid hsla(0, 0%, 100%, 0.2)'
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '2rem',
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: '0.75rem',
      padding: '0.25rem',
      boxShadow: 'inset 0 1px 3px 0 rgb(0 0 0 / 0.1)'
    },
    tabButton: {
      flex: 1,
      padding: '0.875rem 1rem',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    activeTab: {
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 2px 4px rgb(59 130 246 / 0.3)'
    },
    inactiveTab: {
      backgroundColor: 'transparent',
      color: '#374151'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontWeight: 500,
      color: '#1f2937',
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      outline: 'none',
      boxShadow: '0 0 0 3px rgb(59 130 246 / 0.1)'
    },
    button: {
      width: '100%',
      padding: '0.875rem 1.5rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgb(59 130 246 / 0.2)'
    },
    buttonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgb(59 130 246 / 0.3)'
    },
    linkButton: {
      background: 'none',
      border: 'none',
      color: '#3b82f6',
      cursor: 'pointer',
      fontSize: '0.875rem',
      textDecoration: 'none',
      padding: '0.25rem 0',
      transition: 'color 0.2s ease'
    },
    forgotPasswordContainer: {
      textAlign: 'right',
      marginBottom: '1.5rem'
    },
    backContainer: {
      textAlign: 'center',
      marginTop: '1.5rem'
    },
    forgotTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    forgotSubtitle: {
      color: '#6b7280',
      fontSize: '0.875rem',
      textAlign: 'center',
      marginBottom: '2rem',
      lineHeight: '1.5'
    },
    slideIn: {
      animation: 'slideIn 0.3s ease-out'
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-input:focus {
          border-color: #3b82f6 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgb(59 130 246 / 0.3);
        }
        
        .link-button:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            text-align: center;
          }
          
          .responsive-card {
            margin-top: 2rem;
          }
        }
      `}</style>

      <section style={styles.backgroundRadialGradient}>
        <div style={styles.container}>
          <div style={{ ...styles.row, flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }} className="responsive-row">
            <div style={styles.leftColumn}>
              <h1 style={styles.title}>
                Global News <br />
                <span style={styles.subtitle}>Proyecto X</span>
              </h1>
              <p style={styles.description}>
                Sistema de gestión de clientes y ventas para la empresa GlobalNewsCo
              </p>
            </div>

            <div style={styles.rightColumn}>
              <div style={styles.card} className="responsive-card">
                {!isForgotPassword ? (
                  <div style={styles.slideIn}>
                    <div style={styles.tabContainer}>
                      <button
                        onClick={() => setIsLogin(true)}
                        style={{
                          ...styles.tabButton,
                          ...(isLogin ? styles.activeTab : styles.inactiveTab)
                        }}
                      >
                        Iniciar Sesión
                      </button>
                      <button
                        onClick={() => setIsLogin(false)}
                        style={{
                          ...styles.tabButton,
                          ...(!isLogin ? styles.activeTab : styles.inactiveTab)
                        }}
                      >
                        Registrarse
                      </button>
                    </div>

                    {isLogin ? (
                      <div onSubmit={handleLogin}>
                        <div style={styles.formGroup}>
                          <label htmlFor="login-username" style={styles.label}>
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            id="login-username"
                            name="username"
                            required
                            style={styles.input}
                            className="form-input"
                            placeholder="tu@email.com"
                            value={loginForm.username}
                            onChange={handleLoginChange}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label htmlFor="login-password" style={styles.label}>
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="login-password"
                            name="password"
                            required
                            style={styles.input}
                            className="form-input"
                            placeholder="••••••••"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                          />
                        </div>

                        <div style={styles.forgotPasswordContainer}>
                          <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            style={styles.linkButton}
                            className="link-button"
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        </div>

                        <button
                          onClick={handleLogin}
                          style={styles.button}
                          className="btn-primary"
                        >
                          Ingresar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={styles.formGroup}>
                          <label htmlFor="register-username" style={styles.label}>
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            id="register-username"
                            name="username"
                            required
                            style={styles.input}
                            className="form-input"
                            placeholder="tu@email.com"
                            value={registerForm.username}
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label htmlFor="register-password" style={styles.label}>
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="register-password"
                            name="password"
                            required
                            style={styles.input}
                            className="form-input"
                            placeholder="••••••••"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <button
                          onClick={handleRegister}
                          style={styles.button}
                          className="btn-primary"
                        >
                          Crear cuenta
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={styles.slideIn}>
                    <h3 style={styles.forgotTitle}>
                      Recuperar Contraseña
                    </h3>
                    <p style={styles.forgotSubtitle}>
                      Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
                    </p>

                    <div>
                      <div style={styles.formGroup}>
                        <label htmlFor="forgot-email" style={styles.label}>
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="forgot-email"
                          name="email"
                          required
                          style={styles.input}
                          className="form-input"
                          placeholder="tu@email.com"
                          value={forgotPasswordForm.email}
                          onChange={handleForgotPasswordChange}
                        />
                      </div>

                      <button
                        onClick={handleForgotPassword}
                        style={styles.button}
                        className="btn-primary"
                      >
                        Enviar enlace de recuperación
                      </button>

                      <div style={styles.backContainer}>
                        <button
                          type="button"
                          onClick={backToLogin}
                          style={styles.linkButton}
                          className="link-button"
                        >
                          Volver a Iniciar Sesión
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;