import React, { useContext } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DataContext } from '../Context/DataContext'
import formatearMoneda from '../../Statics/formatMoneda'

export default function ChartVentas() {
    const { ventas, añoActual, mesActual } = useContext(DataContext)
    console.log('Ventas: ',ventas.detallemes)
    return (
        <div>
            <ResponsiveContainer width={'100%'} height={250} >

                <BarChart
                    maxBarSize={40}
                    data={ventas?.detallemes || []}
                    margin={{
                        top: 35,
                        left: 30

                    }}>
                    <CartesianGrid strokeDasharray="3 3" fill="#E3F2FD" />

                    <XAxis dataKey="servicio" style={{ fontSize: '10px' }}
                        tick={{ fill: 'black' }}

                        padding={{ left: 10, right: 40 }}

                        scaleToFit={true}
                        width={'10px'}

                    />
                    <YAxis />
                    <Legend />
                    <Tooltip
                        formatter={(value, name) => [formatearMoneda(value), name]}
                    />

                    <Bar dataKey="valorvendido" name="Ventas" fill="#A5D6A7" label={{ position: 'top', formatter: (value) => formatearMoneda(value) }} />
                    <Bar dataKey="proyeccion" name="Proyección" fill="#8755fab7" label={{ position: 'top', formatter: (value) => formatearMoneda(value) }} />
                </BarChart>
            </ResponsiveContainer></div>
    )
}