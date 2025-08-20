import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Conexion from '../../Service/Conexion';

const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (!tokenFromUrl) {
            setError('Token no válido o expirado');
            setTimeout(() => navigate('/'), 3000);
        } else {
            setToken(tokenFromUrl);
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newPassword || !confirmPassword) {
            setError('Todos los campos son requeridos');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await Conexion.resetPassword({
                token: token,
                newPassword: newPassword
            });

            if (response.success) {
                setSuccess('Contraseña restablecida exitosamente');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(response.message || 'Error al restablecer la contraseña');
            }
        } catch (error) {
            setError('Error al restablecer la contraseña. Token inválido o expirado.');
        } finally {
            setLoading(false);
        }
    };

    // --- ESTILOS MODIFICADOS ---
    const styles = {
        backgroundRadialGradient: {
            backgroundColor: 'hsl(270, 41%, 15%)', // Tono base púrpura oscuro
            backgroundImage: `radial-gradient(650px circle at 0% 0%, hsl(270, 41%, 35%) 15%, hsl(270, 41%, 30%) 35%, hsl(270, 41%, 20%) 75%, hsl(270, 41%, 19%) 80%, transparent 100%),
            radial-gradient(1250px circle at 100% 100%, hsl(270, 41%, 45%) 15%, hsl(270, 41%, 30%) 35%, hsl(270, 41%, 20%) 75%, hsl(270, 41%, 19%) 80%, transparent 100%)`,
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
            color: "hsl(270, 81%, 95%)", // Texto principal con matiz púrpura
            marginBottom: '1rem',
            lineHeight: '1.1'
        },
        subtitle: {
            color: "hsl(270, 81%, 75%)" // Subtítulo con matiz púrpura
        },
        description: {
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            opacity: 0.7,
            color: "hsl(270, 81%, 85%)", // Descripción con matiz púrpura
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
        button: {
            width: '100%',
            padding: '0.875rem 1.5rem',
            backgroundColor: '#8B5CF6', // Botón color púrpura
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgb(139 92 246 / 0.2)' // Sombra púrpura
        },
    };

    return (
        <>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .form-input:focus {
                    border-color: #8B5CF6 !important; /* Borde de input púrpura */
                    outline: none;
                    box-shadow: 0 0 0 3px rgb(139 92 246 / 0.1); /* Sombra de input púrpura */
                }
                
                .btn-primary:hover {
                    background-color: #7C3AED; /* Púrpura más oscuro en hover */
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgb(139 92 246 / 0.3); /* Sombra púrpura en hover */
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
                                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    Restablecer Contraseña
                                </h2>

                                {error && (
                                    <div style={{
                                        backgroundColor: '#fee',
                                        color: '#c33',
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        marginBottom: '1rem',
                                        textAlign: 'center'
                                    }}>
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div style={{
                                        backgroundColor: '#efe',
                                        color: '#363',
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        marginBottom: '1rem',
                                        textAlign: 'center'
                                    }}>
                                        {success}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div style={styles.formGroup}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                            Nueva Contraseña:
                                        </label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={styles.input}
                                            className="form-input"
                                            placeholder="Ingresa tu nueva contraseña"
                                        />
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                            Confirmar Contraseña:
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={styles.input}
                                            className="form-input"
                                            placeholder="Confirma tu nueva contraseña"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={styles.button}
                                        className="btn-primary"
                                    >
                                        {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                                    </button>
                                </form>

                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => navigate('/')}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#8B5CF6', // Color púrpura para el enlace
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Volver al inicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;