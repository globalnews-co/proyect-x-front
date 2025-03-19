import jwt from 'jsonwebtoken';
import { getConnection, querys, sql } from '../models/index.js';
import { TOKEN_SECRET } from '../config.js';
import moment from 'moment/moment.js';

export const listdirectores = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const profile = req.headers['x-user-profile'];

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);

        const id = decoded.id;
        const rol = decoded.rol;

        const pool = await getConnection();
        if (rol === "GERENTE" || rol === "COORDINADOR") {
            const result = await pool.request()
                .query(querys.queryReadDirectores);
            return res.json(result.recordset);
        } else {
            console.log('id usuario listdirectores', id)
            const result = await pool.request()
                .input("ID_User", id)
                .query(querys.queryReadDirector);
            return res.json(result.recordset);
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'No autorizado' });
    }
};



export const createagenda = async (req, res) => {
    try {
        const { IdUser, IdDirector, IdCliente, Digito, FechaInicio, FechaFin, Obsevacion, Proposito } = req.body;
        const ffechainicio = moment(FechaInicio).format('YYYY-MM-DD HH:mm:ss');
        const ffechafin = moment(FechaFin).format('YYYY-MM-DD HH:mm:ss');
        const pool = await getConnection();

        const agenda = await pool.request()
            .input("ID_Director", IdDirector)
            .input("NIT_Cliente", IdCliente)
            .input("FechaInicio", ffechainicio)
            .input("FechaFin", ffechafin)
            .input("Obsevacion", Obsevacion)
            .input("Proposito", Proposito)
            .input("Digito", Digito)
            .query(querys.queryCreateAgenda);

        await pool.request()
            .input("ID_Registro", agenda.recordset[0].ID_Agenda)
            .input("Tabla", "Agenda")
            .input("Detalle", `Se creó una agenda para el cliente ${IdCliente}`)
            .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
            .input("ID_User", IdUser)
            .query(querys.queryInsertLog);

        return res.status(200).json({ message: "Agenda creada correctamente" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error al crear agenda" });
    }
}
export const listAgenda = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET);
        const { id } = req.params;

        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Director", id)
            .query(querys.queryReadAgenda)
        return res.json(result.recordset);
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'No autorizado' });
    }
}
export const updateAgenda = async (req, res) => {
    try {
        const id = req.params.id;
        const { FechaInicio, FechaFin } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log(decoded)
        const idUser = decoded.id;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Agenda", id)
            .input("FechaInicio", FechaInicio)
            .input("FechaFin", FechaFin)
            .query(querys.queryUpdateAgenda);

        await pool.request()
            .input("ID_Registro", id)
            .input("Tabla", "Agenda")
            .input("Detalle", `Se actualizó la fecha de la agenda`)
            .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
            .input("ID_User", idUser)
            .query(querys.queryInsertLog);

        return res.status(200).json({ message: "Agenda actualizada correctamente" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error al actualizar agenda" });
    }
}

export const updateAgendaDetalle = async (req, res) => {
    try {
        const id = req.params.id;
        const { Obsevacion } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const idUser = decoded._id;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Agenda", id)
            .input("Obsevacion", Obsevacion)
            .query(querys.queryUpdateAgendaDetalle);

        await pool.request()
            .input("ID_Registro", id)
            .input("Tabla", "Agenda")
            .input("Detalle", `Se actualizó la observación de la agenda`)
            .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
            .input("ID_User", idUser)
            .query(querys.queryInsertLog);

        return res.status(200).json({ message: "Agenda actualizada correctamente" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error al actualizar agenda" });
    }
}

export const deleteAgenda = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, TOKEN_SECRET);

        const idUser = decoded._id;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Agenda", req.params.id)
            .query(querys.queryDeleteAgenda).then(async () => {
                await pool.request()
                    .input("ID_Registro", req.params.id)
                    .input("Tabla", "Agenda")
                    .input("Detalle", "Se elimino una agenda")
                    .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
                    .input("ID_User", idUser)
                    .query(querys.queryInsertLog)
            })
        return res.status(200).json({ message: "Agenda eliminada correctamente" });
    }
    catch (e) {
        return res.status(400).json({ message: "Error al eliminar agenda", error: e });
    }

}

export const getproyecciondir = async (req, res) => {
    try {
        const { id } = req.params;
        const { mes, anio } = req.body;
        const pool = await getConnection();

        console.log('Parámetros recibidos:', req.body);

        const request = pool.request()
            .input("ID_Director", id)
            .input("Mes", mes + 1)
            .input("Anio", anio);


        // Obtener la consulta SQL con los parámetros
        const query = querys.queryProyeccionDirector;
        console.log('Consulta SQL a ejecutar:', query);
        console.log('Parámetros de la consulta:', {
            ID_Director: id,
            Mes: mes + 1,
            Anio: anio
        });

        const result = await request.query(query);

        return res.json(result.recordset);
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(400).json({ message: "Error al listar proyeccion" });
    }
}

export const createproyecciondir = async (req, res) => {
    const {
        idDirector,
        meses,
        proyeccion,
        clipping,
        socialmedia,
        informesAnalisis,
        catalogo,
        compliance,
        internacional,
        otrosServicios,
        servicioActual  // Parámetro que indica qué campo está actualizando el usuario
    } = req.body;

    try {
        const pool = await getConnection();

        console.log("Datos recibidos:", req.body);

        // Función para limpiar y normalizar valores
        function cleanValue(val) {
            if (val === undefined || val === null || val === '') return 0;
            if (val === 0 || val === "0") return 0;
            // Elimina cualquier carácter que no sea un número
            return parseInt(String(val).replace(/\$|\.|\s|,/g, '').replace(/[^0-9]/g, ''), 10) || 0;
        }

        // Determinar qué servicio se está actualizando basado en los valores
        // Si no viene servicioActual, intentamos detectar cuál es
        let campoActualizado = servicioActual;
        if (!campoActualizado) {
            if (clipping && cleanValue(clipping) > 0) campoActualizado = 'clipping';
            else if (socialmedia && cleanValue(socialmedia) > 0) campoActualizado = 'socialmedia';
            else if (informesAnalisis && cleanValue(informesAnalisis) > 0) campoActualizado = 'informesAnalisis';
            else if (catalogo && cleanValue(catalogo) > 0) campoActualizado = 'catalogo';
            else if (compliance && cleanValue(compliance) > 0) campoActualizado = 'compliance';
            else if (internacional && cleanValue(internacional) > 0) campoActualizado = 'internacional';
            else if (otrosServicios && cleanValue(otrosServicios) > 0) campoActualizado = 'otrosServicios';
        }

        console.log("Campo detectado para actualizar:", campoActualizado);

        // Limpiar y preparar los valores que vienen del usuario
        const cleanedInputValues = {
            clipping: cleanValue(clipping),
            socialmedia: cleanValue(socialmedia),
            informesAnalisis: cleanValue(informesAnalisis),
            catalogo: cleanValue(catalogo),
            compliance: cleanValue(compliance),
            internacional: cleanValue(internacional),
            otrosServicios: cleanValue(otrosServicios),
            proyeccion: cleanValue(proyeccion)
        };

        console.log("Valores limpios del input:", cleanedInputValues);

        // Si no se especificó un campo para actualizar y hay varios con valores, rechazar
        if (!campoActualizado) {
            const camposConValor = Object.entries(cleanedInputValues)
                .filter(([campo, valor]) => valor > 0 && campo !== 'proyeccion')
                .map(([campo, _]) => campo);

            if (camposConValor.length > 1) {
                return res.status(400).json({
                    message: "Se detectaron múltiples campos con valores. Especifique cuál desea actualizar usando 'servicioActual'."
                });
            } else if (camposConValor.length === 1) {
                campoActualizado = camposConValor[0];
                console.log("Campo único detectado:", campoActualizado);
            }
        }

        // Procesar cada mes seleccionado
        for (const mes of meses) {
            const mesNum = parseInt(mes, 10);
            if (mesNum >= 1 && mesNum <= 12) {
                const ffechainicio = moment().set({ 'month': mesNum - 1, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0 }).format('YYYY-MM-DD');
                const ffechafin = moment().set({ 'month': mesNum - 1, 'date': moment().set('month', mesNum - 1).daysInMonth(), 'hour': 23, 'minute': 59, 'second': 59 }).format('YYYY-MM-DD');

                console.log(`Procesando mes ${mesNum} (${ffechainicio} - ${ffechafin})...`);

                // Verificar si ya existe una proyección para este director y fecha
                const result = await pool.request()
                    .input("ID_Director", idDirector)
                    .input("Fecha_Inicio", ffechainicio)
                    .query(querys.queryReadProyeccionDirector);

                const existingProjection = result.recordset[0];

                if (existingProjection) {
                    console.log(`Proyección existente encontrada para mes ${mesNum}:`, existingProjection);

                    // Convertir los valores existentes a números
                    const existingValues = {
                        clipping: cleanValue(existingProjection.Clipping),
                        socialmedia: cleanValue(existingProjection.SocialMedia),
                        informesAnalisis: cleanValue(existingProjection.InformesAnalisis),
                        catalogo: cleanValue(existingProjection.CatalogoPublicitario),
                        compliance: cleanValue(existingProjection.Compliance),
                        internacional: cleanValue(existingProjection.Internacional),
                        otrosServicios: cleanValue(existingProjection.OtrosServicios)
                    };

                    console.log(`Valores existentes (limpios) para mes ${mesNum}:`, existingValues);

                    // Valores a actualizar (inicialmente son los existentes)
                    let newValues = { ...existingValues };

                    // Verificar si se puede actualizar el campo
                    if (campoActualizado) {
                        const nombreServicio = {
                            'clipping': 'Clipping',
                            'socialmedia': 'Social Media',
                            'informesAnalisis': 'Informes y Análisis',
                            'catalogo': 'Catálogo Publicitario',
                            'compliance': 'Compliance',
                            'internacional': 'Internacional',
                            'otrosServicios': 'Otros Servicios'
                        }[campoActualizado];

                        // Verificar si el valor existente es 0 (permitiendo actualización)
                        if (existingValues[campoActualizado] > 0) {
                            return res.status(400).json({
                                message: `No se puede actualizar ${nombreServicio} en el mes ${mesNum} porque ya tiene un valor asignado de $${existingValues[campoActualizado].toLocaleString('es-ES')}`
                            });
                        }

                        // Si el valor existente es 0, se permite la actualización
                        if (cleanedInputValues[campoActualizado] > 0) {
                            newValues[campoActualizado] = cleanedInputValues[campoActualizado];
                            console.log(`Actualizando ${campoActualizado} en mes ${mesNum}: 0 -> ${newValues[campoActualizado]}`);
                        }
                    }

                    console.log(`Valores finales a actualizar para mes ${mesNum}:`, newValues);

                    // Realizar la actualización con los valores preparados
                    await pool.request()
                        .input("ID_Proyeccion", existingProjection.ID_Proyeccion)
                        .input("Clipping", newValues.clipping)
                        .input("SocialMedia", newValues.socialmedia)
                        .input("InformesAnalisis", newValues.informesAnalisis)
                        .input("Catalogo", newValues.catalogo)
                        .input("Compliance", newValues.compliance)
                        .input("Internacional", newValues.internacional)
                        .input("OtrosServicios", newValues.otrosServicios)
                        .input("Proyeccion_Valor", cleanedInputValues.proyeccion) // Asegurar que se actualiza la proyección para CADA mes
                        .query(querys.updateProyeccion);
                } else {
                    console.log(`Creando nueva proyección para mes ${mesNum}`);

                    // Si no existe una proyección, se crea una nueva con los valores proporcionados
                    await pool.request()
                        .input("ID_Director", idDirector)
                        .input("FechaInicio", ffechainicio)
                        .input("FechaFin", ffechafin)
                        .input("Proyeccion_Valor", cleanedInputValues.proyeccion) // Usar el valor de proyección limpio
                        .input("Clipping", cleanedInputValues.clipping)
                        .input("SocialMedia", cleanedInputValues.socialmedia)
                        .input("InformesAnalisis", cleanedInputValues.informesAnalisis)
                        .input("CatalogoPublicitario", cleanedInputValues.catalogo)
                        .input("Compliance", cleanedInputValues.compliance)
                        .input("Internacional", cleanedInputValues.internacional)
                        .input("OtrosServicios", cleanedInputValues.otrosServicios)
                        .query(querys.queryCreateProyeccionDirector);
                }
            } else {
                console.log(`Mes inválido: ${mes}`);
            }
        }

        return res.status(200).json({ message: "Proyecciones creadas o actualizadas correctamente." });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Error al crear o actualizar proyecciones: ' + e.message });
    }
};
export const totalproyeccion = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const diainicial = moment().startOf('month').format('YYYY-MM-DD');
        const diafinal = moment().endOf('month').format('YYYY-MM-DD');

        const totalventasbydir = await pool.request()
            .input("ID_Director", id)
            .input("Mes", parseInt(moment().format('MM')))
            .input("Anio", moment().format('YYYY'))
            .input("FechaInicio", diainicial)
            .input("FechaFin", diafinal)
            .query(querys.queryTotalVentasbyDirectorMonth)

        const proyeccionmensual = await pool.request()
            .input("ID_Director", id)
            .input("Mes", moment().format('MM'))
            .input("Anio", moment().format('YYYY'))
            .query(querys.queryProyeccionMes)

        const data = [{
            ventas: totalventasbydir.recordset[0].totalVentas,
            proyeccion: proyeccionmensual.recordset[0].totalProyeccion,
            proyeccionanual: 2000000
        }]

        console.log(data)
        return res.json(data);
    }
    catch {
        return res.status(400).json({ message: "Error al listar proyeccion" });
    }
}

export const getdirectorbyid = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const { id } = req.params;
        const { anio } = req.body

        console.log(id, anio)

        jwt.verify(token, TOKEN_SECRET);

        const pool = await getConnection();

        try {
            const result = await pool.request()
                .input("ID_Director", id)
                .query(querys.queryReadDirectorById);

            if (!result.recordset[0]) {
                return res.status(404).json({ message: 'Director no encontrado' });
            }

            const totalventasbydir = await pool.request()
                .input("ID_Director", result.recordset[0].idDirector)
                .input("Anio", anio)
                .query(querys.queryTotalidadVentasbyDirector);
            console.log('idddddd si???? ', id, anio)
            const totalProyeecion = await pool.request()
                .input("ID_Director", id)
                .input("Anio", anio)
                .query(querys.queryTotalProyeccionDirector);

            const data = {
                director: result.recordset[0],
                totalventas: totalventasbydir.recordset[0]?.totalVentas || 0,
                proyeccionanual: totalProyeecion.recordset[0]?.TotalServicios || 0
            };

            return res.status(200).json(data);
        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({
                message: 'Error en la base de datos',
                detail: dbError.message
            });
        }

    } catch (e) {
        console.error('Authorization error:', e);
        return res.status(401).json({ message: 'No autorizado' });
    }
};
export const getiddirectores = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // comprobar token y extraer el usuario autenticado jwt  en una variable
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);

        const id = decoded._id;
        const rol = decoded.rol;
        const pool = await getConnection();
        if (rol === "GERENTE" || rol === "COORDINADOR") {
            const result = await pool.request()
                .query(querys.queryReadIdDirectores)
            return res.json(result.recordset);
        }
        else {
            const result = await pool.request()
                .input("ID_User", id)
                .query(querys.queryReadDirector)
            return res.json(result.recordset);
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'No autorizado' });
    }
}

const procesarFecha = (fechaSQL) => {
    // Convertimos la fecha SQL a objeto moment
    const fechaMoment = moment(fechaSQL);
    const mes = fechaMoment.month(); // 0-11, donde 1 es febrero
    const dia = fechaMoment.date();
    const ultimoDiaFebrero = fechaMoment.clone().month(1).endOf('month').date();

    console.log('Fecha original: ', fechaSQL);
    console.log('Último día febrero: ', ultimoDiaFebrero);

    // Verificar si es fin de febrero (28 o 29 dependiendo si es bisiesto)
    if (mes === 1 && dia === ultimoDiaFebrero) {
        // Crear un objeto moment modificado para el 30 de febrero
        const fechaModificada = fechaMoment.clone();

        // Agregar una propiedad que indique que es 30 de febrero
        fechaModificada._esFebrero30 = true;

        // Sobreescribir el método date() para que devuelva 30 en vez del día real
        const originalDate = fechaModificada.date;
        fechaModificada.date = function (input) {
            // Si es getter (sin argumentos), devolver 30
            if (arguments.length === 0) {
                return 30;
            }
            // Si es setter (con argumentos), comportamiento normal
            return originalDate.apply(this, arguments);
        };

        return fechaModificada;
    }

    // Si no es fin de febrero, devolver el objeto moment original
    return fechaMoment;
};
export const ventasbydirector = async (req, res) => {
    try {
        console.log('\n====== Iniciando ventasbydirector ======');
        let meses = [];
        let ventasPorMesConsolidado = {}; // Objeto para consolidación

        // Verificación de token
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET);
        console.log('Token verificado correctamente');

        // Obtención y procesamiento de parámetros
        const { anio, id } = req.body;
        const mes = req.body.mes + 1; // Mes 1-indexed
        console.log('Parámetros recibidos:', {
            ID_Director: id,
            mes_original: req.body.mes,
            mes_procesado: mes,
            anio: anio
        });

        const pool = await getConnection();

        // 1. Consulta de ventas del director para el año consultado
        const resultAnual = await pool.request()
            .input("ID_Director", id)
            .input("Anio", anio)
            .query(`
               SELECT TOP (1000) 
                    base4.[Empresa_Cliente] as empresaCliente
                    ,base3.ID_Director as director
                    ,base4.[Ciudad_Cliente] as ciudadCliente
                    ,base4.[Tipo_Cliente] as tipoCliente
                    ,base1.[Clipping]
                    ,base1.[Anunciante]
                    ,base1.[SocialMedia]
                    ,base1.[InformesAnalisis]
                    ,base1.[CatalogoPublicitario]
                    ,base1.[Compliance]
                    ,base1.[Internacional]
                    ,base1.[OtrosServicios]
                    ,CONVERT(VARCHAR, base1.[Fecha_Inicio], 23) as fechaInicio
                    ,CONVERT(VARCHAR, base1.[Fecha_Fin], 23) as fechaFin
                FROM [GlobalCoDB].[dbo].[TB_Ventas] as base1
                INNER JOIN [GlobalCoDB].[dbo].[TB_Directores] as base3
                    ON base1.ID_Director = base3.ID_Director
                INNER JOIN [GlobalCoDB].[dbo].[TB_Clientes] as base4
                    ON base1.NIT_Cliente = base4.NIT_Cliente 
                    AND base1.Digito_Verificacion = base4.Digito_Verificacion
                WHERE base3.ID_Director = @ID_Director
                AND @Anio BETWEEN 
                    (CASE 
                        WHEN DAY(base1.Fecha_Inicio) = 31 AND MONTH(base1.Fecha_Inicio) = 12
                        THEN YEAR(base1.Fecha_Inicio) + 1
                        ELSE YEAR(base1.Fecha_Inicio)
                    END)
                    AND
                    (CASE 
                        WHEN DAY(base1.Fecha_Fin) = 31 AND MONTH(base1.Fecha_Fin) = 12
                        THEN YEAR(base1.Fecha_Fin) + 1
                        ELSE YEAR(base1.Fecha_Fin)
                    END)
            `);

        // 2. Consulta de ventas del mes actual
        const resultMes = await pool.request()
            .input("ID_Director", id)
            .input("Anio", anio)
            .input("mes", mes)
            .query(querys.queryReadVentasByDirector);

        if (!resultAnual || !resultAnual.recordset) {
            console.log('No se encontraron registros de ventas anuales');
            return res.json({
                ventas: [],
                detallemes: [],
                trimestre1: 0,
                trimestre2: 0,
                trimestre3: 0,
                trimestre4: 0,
                total: 0,
                newclients: 0,
                ventaspormes: []
            });
        }

        // 2. Consulta de nuevos clientes
        const newclients = await pool.request()
            .input("ID_Director", id)
            .input("mes", mes)
            .input("Anio", anio)  
            .query(querys.queryReadVentasbyNewClient);

        const totalNewClients = newclients && newclients.recordset && newclients.recordset[0]
            ? Number(newclients.recordset[0].totalNewCliente)
            : 0;
        console.log('Params: ', id, mes, anio)
        // 3. Consulta de proyección de ventas
        const proyeccionmes = await pool.request()
            .input("ID_Director", id)
            .input("Mes", mes)
            .input("Anio", anio)
            .query(querys.querygetProyeccionValor);
        console.log('Query Proyeccion mes: ', proyeccionmes)

        // Variables para cálculos
        let total = 0;
        let trimestre1 = 0;
        let trimestre2 = 0;
        let trimestre3 = 0;
        let trimestre4 = 0;
        let ingresosmensuales = [];

        // Procesamiento de los resultados de ventas anuales
        console.log('Procesando resultados anuales:', resultAnual.recordset);

        resultAnual.recordset.forEach((element) => {
            const fechaInicio = procesarFecha(element.fechaInicio)
            const fechaFin = procesarFecha(element.fechaFin)

            console.log('\n--- Procesando Venta Anual ---');
            console.log('Venta Original:', element);
            console.log('Fecha Inicio:', element.fechaInicio);
            console.log('Fecha Fin:', element.fechaFin);
            console.log('Fecha Inicio Despues de Format:', fechaInicio);
            console.log('Fecha Fin Despues de Format:', fechaFin);

            // Función helper para asegurar la conversión a número
            const safeNumber = (value) => {
                const num = Number(value || 0);
                return isNaN(num) ? 0 : num;
            };

            // Calcular el valor total de todos los servicios de forma segura
            const valorTotal = safeNumber(element.Clipping) +
                safeNumber(element.Anunciante) +
                safeNumber(element.SocialMedia) +
                safeNumber(element.InformesAnalisis) +
                safeNumber(element.CatalogoPublicitario) +
                safeNumber(element.Compliance) +
                safeNumber(element.Internacional) +
                safeNumber(element.OtrosServicios);

            // Log para verificar cada valor individual
            console.log('Valores de servicios:', {
                Clipping: safeNumber(element.Clipping),
                Anunciante: safeNumber(element.Anunciante),
                SocialMedia: safeNumber(element.SocialMedia),
                InformesAnalisis: safeNumber(element.InformesAnalisis),
                CatalogoPublicitario: safeNumber(element.CatalogoPublicitario),
                Compliance: safeNumber(element.Compliance),
                Internacional: safeNumber(element.Internacional),
                OtrosServicios: safeNumber(element.OtrosServicios),
                Total: valorTotal
            });

            // Cálculo del valor diario usando base 30 días
            // Aseguramos que siempre sea un número válido, nunca NaN o infinito
            const valorDia = valorTotal > 0 ? valorTotal / 30 : 0;
            console.log('Valor por día (base 30):', valorDia);

            // Iteramos mes por mes
            let currentDate = moment(fechaInicio).startOf('month');
            const endDate = moment(fechaFin).endOf('month');

            console.log('Fehca fin: ', endDate)

            while (currentDate.isSameOrBefore(endDate)) {
                const currentYear = currentDate.year();
                const mesActual = currentDate.month() + 1;
                let diasEnEsteMes = 30; // Base mensual estándar

                // Ajustes para el primer y último mes
                // Modificar la sección donde se calculan los días del mes:
                if (currentDate.isSame(fechaInicio, 'month')) {
                    console.log('dias contandos', fechaInicio.date());

                    // Si es día 30 (incluyendo el 30 de febrero especial), no debe haber días para contar
                    if (fechaInicio.date() === 30) {
                        diasEnEsteMes = 0; // Cambiar de 1 a 0 para que no compute ningún ingreso
                        console.log('Fecha inicio es el día 30, contando 0 días');
                    }
                    // Excepción para el día 1 de cualquier mes
                    else if (fechaInicio.date() === 1) {
                        diasEnEsteMes = 30; // Si es día 1, contamos el mes completo (30 días)
                    }
                    else {
                        // Para cualquier otro día, la lógica es 30 - día de inicio
                        diasEnEsteMes = 30 - fechaInicio.date();
                        if (diasEnEsteMes <= 0) {
                            diasEnEsteMes = 0;
                        }
                    }
                } else if (currentDate.isSame(fechaFin, 'month')) {
                    diasEnEsteMes = Math.min(fechaFin.date(), 30);
                }

                // Asegurarse de que el cálculo del ingreso refleje los 0 días cuando corresponda
                const ingresoMes = valorDia * diasEnEsteMes;
                console.log(`Mes ${mesActual}: ${diasEnEsteMes} días - Ingreso: ${ingresoMes}`);

                // Consolidación de ingresos por mes
                const key = `${currentYear}-${mesActual}`;
                if (ventasPorMesConsolidado[key]) {
                    ventasPorMesConsolidado[key] += ingresoMes;
                } else {
                    ventasPorMesConsolidado[key] = ingresoMes;
                }

                // Cálculo de trimestres para el año consultado
                if (currentYear === parseInt(anio)) {
                    if (mesActual >= 1 && mesActual <= 3) trimestre1 += ingresoMes;
                    else if (mesActual >= 4 && mesActual <= 6) trimestre2 += ingresoMes;
                    else if (mesActual >= 7 && mesActual <= 9) trimestre3 += ingresoMes;
                    else if (mesActual >= 10 && mesActual <= 12) trimestre4 += ingresoMes;
                }

                currentDate.add(1, 'month');
            }
        });

        // Convertir ventasPorMesConsolidado a array ordenado
        const ventasPorMesArray = Object.entries(ventasPorMesConsolidado).map(([key, valor]) => {
            const [anio, mes] = key.split('-').map(Number);
            return {
                Anio: anio,
                Mes: mes,
                Ingreso: Math.round(valor)
            };
        }).sort((a, b) => {
            if (a.Anio !== b.Anio) return a.Anio - b.Anio;
            return a.Mes - b.Mes;
        });

        // Estructura para acumular los detalles del mes específico
        let detallesMes = {
            Clipping: { valorvendido: 0, proyeccion: 0, servicio: "Clipping" },
            Anunciante: { valorvendido: 0, proyeccion: 0, servicio: "Anunciante" },
            SocialMedia: { valorvendido: 0, proyeccion: 0, servicio: "SocialMedia" },
            InformesAnalisis: { valorvendido: 0, proyeccion: 0, servicio: "InformesAnalisis" },
            CatalogoPublicitario: { valorvendido: 0, proyeccion: 0, servicio: "CatalogoPublicitario" },
            Compliance: { valorvendido: 0, proyeccion: 0, servicio: "Compliance" },
            Internacional: { valorvendido: 0, proyeccion: 0, servicio: "Internacional" },
            OtrosServicios: { valorvendido: 0, proyeccion: 0, servicio: "OtrosServicios" }
        };

        // Procesamiento de las ventas del mes actual (febrero - mes 2)
        console.log(`Procesando resultados para el mes ${mes} del año ${anio}:`, resultMes);

        // Función helper para asegurar la conversión a número
        const safeNumber = (value) => {
            const num = Number(value || 0);
            return isNaN(num) ? 0 : num;
        };

        if (resultMes && resultMes.recordset) {
            // Para calcular el valor total vendido en el mes específico
            let totalMes = 0;

            console.log(`Evaluando ${resultMes.recordset.length} ventas para el mes ${mes}`);

            // Iterar sobre cada venta
            resultMes.recordset.forEach((element) => {
                // Obtener las fechas de inicio y fin
                const fechaInicio = moment(element.fechaInicio);
                const fechaFin = moment(element.fechaFin);

                // Crear fecha del mes consultado
                const fechaConsultada = moment(`${anio}-${mes.toString().padStart(2, '0')}-01`);

                console.log(`Evaluando venta: inicio=${fechaInicio.format('YYYY-MM-DD')} fin=${fechaFin.format('YYYY-MM-DD')} para mes consultado=${fechaConsultada.format('YYYY-MM-DD')}`);

                // Verificar si esta venta aplica al mes consultado (el mes está dentro del rango de la venta)
                if (fechaConsultada.isBetween(fechaInicio.clone().startOf('month'), fechaFin.clone().endOf('month'), 'month', '[]')) {
                    console.log(`La venta aplica para el mes ${mes}`);

                    // Calcular los valores para cada servicio
                    const clippingValor = safeNumber(element.Clipping);
                    const anuncianteValor = safeNumber(element.Anunciante);
                    const socialMediaValor = safeNumber(element.SocialMedia);
                    const informesAnalisisValor = safeNumber(element.InformesAnalisis);
                    const catalogoPublicitarioValor = safeNumber(element.CatalogoPublicitario);
                    const complianceValor = safeNumber(element.Compliance);
                    const internacionalValor = safeNumber(element.Internacional);
                    const otrosServiciosValor = safeNumber(element.OtrosServicios);

                    // Calcular la duración total del contrato en meses
                    const duracionMeses = fechaFin.diff(fechaInicio, 'months') + 1;
                    console.log(`Duración de la venta: ${duracionMeses} meses`);

                    // En vez de dividir por mes, usamos el valor completo del servicio
                    // según lo decidido en los comentarios anteriores de procesamiento
                    detallesMes.Clipping.valorvendido += clippingValor;
                    detallesMes.Anunciante.valorvendido += anuncianteValor;
                    detallesMes.SocialMedia.valorvendido += socialMediaValor;
                    detallesMes.InformesAnalisis.valorvendido += informesAnalisisValor;
                    detallesMes.CatalogoPublicitario.valorvendido += catalogoPublicitarioValor;
                    detallesMes.Compliance.valorvendido += complianceValor;
                    detallesMes.Internacional.valorvendido += internacionalValor;
                    detallesMes.OtrosServicios.valorvendido += otrosServiciosValor;

                    // Sumar al total mensual
                    const totalVenta = clippingValor + anuncianteValor + socialMediaValor + informesAnalisisValor +
                        catalogoPublicitarioValor + complianceValor + internacionalValor + otrosServiciosValor;
                    totalMes += totalVenta;

                    console.log(`Valores para el mes ${mes}: `, {
                        Clipping: clippingValor,
                        Anunciante: anuncianteValor,
                        SocialMedia: socialMediaValor,
                        InformesAnalisis: informesAnalisisValor,
                        CatalogoPublicitario: catalogoPublicitarioValor,
                        Compliance: complianceValor,
                        Internacional: internacionalValor,
                        OtrosServicios: otrosServiciosValor,
                        Total: totalVenta
                    });
                } else {
                    console.log(`La venta NO aplica para el mes ${mes}`);
                }
            });

            // Actualizar total con el valor calculado para el mes específico
            total = totalMes;
            console.log(`Total calculado para el mes ${mes}: ${total}`);
        }

        console.log('PROYECCION MES: ', proyeccionmes)

        // Procesar proyecciones para el mes específico
        if (proyeccionmes && proyeccionmes.recordset) {
            proyeccionmes.recordset.forEach((item) => {
                if (!item.servicio) return;

                const servicio = item.servicio.trim();
                const proyeccionValor = safeNumber(item.proyeccion);

                // Asignar proyección al servicio correspondiente en detallesMes
                switch (servicio) {
                    case "Clipping":
                        detallesMes.Clipping.proyeccion += proyeccionValor;
                        break;
                    case "Anunciante":
                        detallesMes.Anunciante.proyeccion += proyeccionValor;
                        break;
                    case "SocialMedia":
                    case "Social Media":
                        detallesMes.SocialMedia.proyeccion += proyeccionValor;
                        break;
                    case "InformesAnalisis":
                    case "Informes de Análisis": // Variante del nombre
                        detallesMes.InformesAnalisis.proyeccion += proyeccionValor;
                        break;
                    case "CatalogoPublicitario":
                    case "Catálogo Publicitario": // Variante del nombre
                        detallesMes.CatalogoPublicitario.proyeccion += proyeccionValor;
                        break;
                    case "Compliance":
                        detallesMes.Compliance.proyeccion += proyeccionValor;
                        break;
                    case "Internacional":
                        detallesMes.Internacional.proyeccion += proyeccionValor;
                        break;
                    case "OtrosServicios":
                    case "Otros Servicios": // Variante del nombre
                        detallesMes.OtrosServicios.proyeccion += proyeccionValor;
                        break;
                    default:
                        console.log(`Servicio no reconocido: ${servicio}`);
                }
            });
        }

        console.log('MES DETALLES: ', detallesMes)

        // Convertir detallesMes a array y filtrar servicios con valor 0
        const detallesMesArray = Object.values(detallesMes).filter(item =>
            item.valorvendido > 0 || item.proyeccion > 0
        );

        // Preparación de la respuesta
        const data = {
            ventas: resultMes ? resultMes.recordset : [],
            detallemes: detallesMesArray,
            trimestre1: Math.round(trimestre1),
            trimestre2: Math.round(trimestre2),
            trimestre3: Math.round(trimestre3),
            trimestre4: Math.round(trimestre4),
            total: total,
            newclients: totalNewClients,
            ventaspormes: ventasPorMesArray
        };

        console.log('\n=== Resumen final ===');
        console.log(data);

        return res.json(data);

    } catch (error) {
        console.error('\n====== ERROR EN ventasbydirector ======');
        console.error('Error completo:', error);
        console.error('Stack trace:', error.stack);
        return res.status(401).json({ message: 'Sin autorización' });
    }
};