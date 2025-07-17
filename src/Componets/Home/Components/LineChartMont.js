import React, { useContext, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import { DataContext } from '../Context/DataContext';

const coloresCorporativos = {
    primario: '#1976D2',
    secundarioPositivo: '#2E7D32',
    advertencia: '#ED6C02',
    error: '#D32F2F',
    fondoPrincipal: '#FFFFFF',
    fondoSecundario: '#F8F9FA',
    fondoTerciario: '#E3F2FD',
    textoPrincipal: '#263238',
    textoSecundario: '#546E7A',
    textoDeshabilitado: '#78909C',
    proyeccionMorado: '#8755fab7',
    ventasPastelVerde: '#A5D6A7',
};

const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
};

export default function LineChartMont() {
    const { proyeccion, ventasMes, añoActual, mesActual, ventas, detallemes } = useContext(DataContext);
    
    // Crear los datos del gráfico cuando cualquier dependencia cambie
    const chartData = useMemo(() => {
        // Verificar si tenemos los datos necesarios
        if (!ventas || !ventasMes || !Array.isArray(ventasMes)) {
            console.log('Datos insuficientes para generar el gráfico');
            return [];
        }

        // Mes actual para la visualización (1-12)
        const mesActualVisual = mesActual + 1;
        
        console.log('Datos completos de Context:', {
            ventas,
            ventasMes,
            detallemes,
            añoActual,
            mesActual: mesActualVisual
        });

        // 1. Usar ventasMes para obtener el ingreso total del mes
        const ventaActual = ventasMes.find(venta =>
            venta && venta.Anio === añoActual && venta.Mes === mesActualVisual
        );
        
        console.log(`Buscando venta para: Año=${añoActual}, Mes=${mesActualVisual}`);
        console.log('Venta encontrada en ventasMes:', ventaActual);
        
        // 2. Calcular el valor de proyección
        // Si tenemos detallemes, sumamos todas las proyecciones
        let valorProyeccion = 0;
        if (detallemes && Array.isArray(detallemes)) {
            valorProyeccion = detallemes.reduce((total, item) => 
                total + (item.proyeccion ? Number(item.proyeccion) : 0), 0);
        } else if (proyeccion && proyeccion[0]) {
            // Usar el valor de proyección directo si está disponible
            valorProyeccion = proyeccion[0].proyeccion;
        }

        // 3. Determinar el valor de ventas
        const valorVentas = ventaActual ? ventaActual.Ingreso : 0;
        
        console.log(`Valor de ventas a mostrar: ${valorVentas}`);
        console.log(`Valor de proyección a mostrar: ${valorProyeccion}`);
        
        // Crear un solo dato para el mes actual
        return [{
            name: `${mesActualVisual}/${añoActual}`,
            Ventas: valorVentas,
            Proyección: valorProyeccion
        }];
    }, [ventas, ventasMes, detallemes, proyeccion, añoActual, mesActual]);  // Incluimos todas las dependencias

    // Efecto para forzar la actualización cuando cambia el mes
    useEffect(() => {
        // Este efecto se ejecutará cada vez que mesActual o añoActual cambien
        console.log(`Mes cambiado a: ${mesActual + 1}/${añoActual}`);
        // El useMemo recalculará los datos automáticamente
    }, [mesActual, añoActual]);

    return (
        <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    maxBarSize={40}
                    data={chartData}
                    margin={{ top: 50, right: 30, left: 20, bottom: 30 }}
                >
                    <Text
                        x={30}
                        y={25}
                        textAnchor="start"
                        fill={coloresCorporativos.textoPrincipal}
                        fontSize={18}
                        fontWeight="bold"
                    >
                        Proyección vs Ventas - Mes {mesActual + 1}/{añoActual}
                    </Text>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        fill={coloresCorporativos.fondoTerciario}
                    />
                    <XAxis
                        dataKey="name"
                        padding={{ left: 20, right: 20 }}
                        tick={{ fill: coloresCorporativos.textoSecundario }}
                    />
                    <YAxis
                        style={{ fontSize: '14px', fill: coloresCorporativos.textoSecundario }}
                        tickFormatter={(value) => {
                            if (value >= 1000000) {
                                return `${(value / 1000000).toFixed(1)}M`;
                            } else if (value >= 1000) {
                                return `${(value / 1000).toFixed(1)}k`;
                            }
                            return value;
                        }}
                    />
                    <Tooltip
                        formatter={(value, name) => [formatearMoneda(value), name]}
                        contentStyle={{
                            backgroundColor: coloresCorporativos.fondoTerciario,
                            padding: '10px',
                            border: `1px solid ${coloresCorporativos.primario}`
                        }}
                        labelStyle={{ color: coloresCorporativos.textoPrincipal, fontWeight: 'bold' }}
                        itemStyle={{ color: coloresCorporativos.textoSecundario }}
                    />
                    <Legend
                        align="right"
                        verticalAlign="top"
                        wrapperStyle={{
                            top: 0,
                            right: 20,
                            fontSize: '14px',
                            color: coloresCorporativos.textoSecundario
                        }}
                    />
                    <Bar
                        dataKey="Proyección"
                        fill={coloresCorporativos.proyeccionMorado}
                        name="Proyección"
                        label={{
                            position: 'top',
                            formatter: (value) => formatearMoneda(value),
                            style: {
                                fontSize: '12px',
                                fill: coloresCorporativos.textoPrincipal
                            },
                            width: 120
                        }}
                    />
                    <Bar
                        dataKey="Ventas"
                        fill={coloresCorporativos.ventasPastelVerde}
                        name="Ventas"
                        label={{
                            position: 'top',
                            formatter: (value) => formatearMoneda(value),
                            style: {
                                fontSize: '12px',
                                fill: coloresCorporativos.textoPrincipal
                            },
                            width: 120,
                            offset: 10
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}