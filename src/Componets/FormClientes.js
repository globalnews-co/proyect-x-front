import React from 'react';

class TablaEventos extends React.Component {
    render() {
        const eventos = [
            {
                id: 1,
                cliente: 'Cliente 1',
                evento: 'Evento A',
                fecha: '2023-10-17',
                hora: '15:00',
                observacion: 'Observación 1'
            },
            {
                id: 2,
                cliente: 'Cliente 2',
                evento: 'Evento B',
                fecha: '2023-10-18',
                hora: '10:30',
                observacion: 'Observación 2'
            },
            {
                id: 3,
                cliente: 'Cliente 3',
                evento: 'Evento C',
                fecha: '2023-10-19',
                hora: '14:15',
                observacion: 'Observación 3'
            },
        ];

        return (
            <div className="container">
                <h2>Tabla de Eventos</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CLIENTE</th>
                            <th>EVENTO</th>
                            <th>FECHA</th>
                            <th>HORA</th>
                            <th>OBSERVACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.cliente}</td>
                                <td>{evento.evento}</td>
                                <td>{evento.fecha}</td>
                                <td>{evento.hora}</td>
                                <td>{evento.observacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TablaEventos;
