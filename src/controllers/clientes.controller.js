import jwt from 'jsonwebtoken';
import { getConnection, querys, sql } from '../models/index.js';
import { TOKEN_SECRET } from '../config.js';

export const listclientes = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const idDirector = req.headers.id_director;
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);

        const id = decoded._id;
        const rol = decoded.rol;

        console.log('listar clientes: ', id, rol)

        if (rol != "GERENTE" && rol != "COORDINADOR") {

            const pool = await getConnection();
            const result = await pool.request()
                .input("ID_Director", idDirector)
                .query(querys.queryReadClientesByDirector)
            console.log(result)

            return res.status(200).json(result.recordset);
        }
        else {
            const pool = await getConnection();
            const result = await pool.request()
                .query(querys.queryReadClientes)
            console.log(result)

            return res.status(200).json(result.recordset);

        }

    } catch {
        return res.status(400).json({ message: "Error al listar clientes" });
    }
}

export const clientesbydirector = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log('controlador clientes by d irects', decoded)

        const pool = await getConnection();
        const rol = decoded.rol;
        const id = decoded.id;
        if (rol != "GERENTE" && rol != "COORDINADOR") {
            const result = await pool.request()
                .input("ID_Director", id)
                .query(querys.queryClientesbyDirector)
            console.log(result.recordset)
            
            return res.json(result.recordset);
        }
        else {
            const result = await pool.request()
                .query(querys.queryAllClientes)
            return res.status(200).json(result.recordset);
        }


    } catch {

        return res.status(401).json({ message: 'No autorizado' });
    }




}

export const clientebyid = async (req, res) => {
    try {
        const pool = await getConnection();
        const { nitCliente, oldDigito } = req.body

        console.log(req.body)
        const result = await pool.request()
            .input("Digito", oldDigito)
            .input("NIT_Cliente", nitCliente)
            .query(querys.queryClientebyId)

        return res.status(200).json(result.recordset[0]);
    }
    catch {
        return res.status(400).json({ message: "Error al listar clientes" });
    }
}

export const listsectores = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(querys.queryReadSectores)
        return res.status(200).json(result.recordset);
    }
    catch {
        return res.status(400).json({ message: "Error al listar sectores" });
    }
}

export const listservicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(querys.queryReadServicios)
        return res.status(200).json(result.recordset);
    }
    catch {
        return res.status(400).json({ message: "Error al listar servicios" });
    }
}
export const serviciosbyclienteid = async (req, res) => {
    // aceptar todos los origenes
    res.setHeader("Access-Control-Allow-Origin", "*");
    // aceptar todos los metodos
    res.setHeader("Access-Control-Allow-Methods", "*");
    // aceptar todas las cabeceras
    res.setHeader("Access-Control-Allow-Headers", "*");
    const pool = await getConnection();
    const result = await pool.request()
        .input("NIT_Cliente", sql.BigInt, req.params.id)
        .query(querys.queryServiciosbyClienteId)
    return res.json(result.recordset);
}

export const ventasbyclienteid = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");

        const { nitCliente, digito } = req.params;
        console.log('Parámetros recibidos:', {
            nitCliente,
            digito
        });

        const pool = await getConnection();

        // Preparar el request con los parámetros
        const request = pool.request()
            .input("NIT_Cliente", sql.BigInt, nitCliente)
            .input("Digito", sql.Int, digito);

        // Obtener y mostrar la consulta SQL
        const query = querys.queryVentasbyClienteId;
        console.log('Consulta SQL a ejecutar:', query);
        console.log('Parámetros de la consulta:', {
            NIT_Cliente: nitCliente,
            Digito: digito,
            TipoNIT_Cliente: sql.BigInt,
            TipoDigito: sql.Int
        });

        const result = await request.query(query);
        console.log(`Número de registros retornados: ${result.recordset.length}`);

        return res.json(result.recordset);
    } catch (error) {
        console.error('Error completo:', error);
        return res.status(500).json({ message: "Error al obtener las ventas por cliente y dígito" });
    }
};

// Helper function to complete arrays with 'Pendiente' for each contact
function completarPendientes(arr, sizePerContact) {
    let numContacts = arr.length / sizePerContact;
    for (let i = 0; i < numContacts; i++) {
        while (arr.slice(i * sizePerContact, (i + 1) * sizePerContact).length < sizePerContact) {
            arr.splice((i + 1) * sizePerContact, 0, 'Pendiente'); // Fill in 'Pendiente' for missing entries
        }
    }
}

// Function to pad each contact with 3 entries (either emails or phones)
function ensureThreeEntries(info, property) {
    const result = [];
    info.forEach(contact => {
        const data = contact.info.map(entry => entry[property] || 'Pendiente');
        while (data.length < 3) {
            data.push('Pendiente');
        }
        result.push(...data);
    });
    return result;
}

export const createCliente = async (req, res) => {
    try {
        const {
            empresaCliente,
            newDigito,
            nitCliente,
            idDirector,
            idSector,
            probabilidad,
            redSocial,
            fechaIngreso,
            observaciones,
            tipoCliente,
            infoContacto
        } = req.body;

        console.log(req.body)

        const nombre = [];
        const ciudad = [];
        const proveedor = [];
        const fuente = [];
        const cargo = [];

        infoContacto.forEach(({ nombre: nombreContacto, ciudad: ciudadContacto, proveedor: proveedorContacto, fuente: fuenteContacto, cargo: cargoContacto }) => {
            nombre.push(nombreContacto);
            ciudad.push(ciudadContacto);
            proveedor.push(proveedorContacto);
            fuente.push(fuenteContacto);
            cargo.push(cargoContacto);
        });

        const correos = ensureThreeEntries(infoContacto, 'email');
        const telefonos = ensureThreeEntries(infoContacto, 'telefono');

        completarPendientes(nombre, 3);
        completarPendientes(ciudad, 3);
        completarPendientes(proveedor, 3);
        completarPendientes(fuente, 3);
        completarPendientes(cargo, 3);

        const email = correos.join(';');
        const telefono = telefonos.join(';');
        const nombreContacto = nombre.join(';');
        const ciudadCliente = ciudad.join(';');
        const proveedorCliente = proveedor.join(';');
        const fuenteCliente = fuente.join(';');
        const cargoContacto = cargo.join(';');

        console.log(email, telefono, nombreContacto, ciudadCliente, cargoContacto, proveedorCliente, fuenteCliente);

        const pool = await getConnection();

        const digitoExistente = await pool.request()
            .input('NIT_Cliente', sql.BigInt, nitCliente)
            .input('Digito', sql.BigInt, newDigito)
            .query(querys.getDV);

        if (digitoExistente.recordset.length > 0) {
            return res.status(400).json({ message: "Este cliente ya existe" });
        }

        if (!newDigito || newDigito === 0) {
            return res.status(400).json({ message: "Dígito de Verificación no puede ser cero" });
        }
        if (!nitCliente || nitCliente === 0) {
            return res.status(400).json({ message: "NIT Cliente no puede ser cero" });
        }

        await pool.request()
            .input("Empresa_Cliente", empresaCliente)
            .input("NIT_Cliente", nitCliente)
            .input("Digito", newDigito)
            .input("Ciudad_Cliente", ciudadCliente)
            .input("Nombre_Contacto", nombreContacto)
            .input("Telefono", telefono)
            .input("ID_Director", idDirector)
            .input("ID_Sector", idSector)
            .input("Probabilidad", probabilidad || 'Pendiente')
            .input("Cargo_Contacto", cargoContacto)
            .input("Proveedor", proveedorCliente)
            .input("Red_Social", redSocial)
            .input("Fecha_Ingreso", fechaIngreso)
            .input("Fuente", fuenteCliente)
            .input("Email", email)
            .input("Observaciones", observaciones)
            .input("Tipo_Cliente", tipoCliente)
            .query(querys.queryCreateCliente);

        return res.status(200).json({ message: "Cliente creado correctamente" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error al crear cliente", e });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const {
            nitCliente,
            oldDigito,
            newDigito,
            empresaCliente,
            telefono1,
            telefono2,
            idDirector,
            idSector,
            probabilidad,
            redSocial,
            fechaIngreso,
            observaciones,
            tipoCliente,
            infoContacto
        } = req.body;

        const nombre = [];
        const ciudad = [];
        const proveedor = [];
        const fuente = [];
        const cargo = []
        const correos = [];
        const telefonos = [];

        infoContacto.forEach(({ nombre: nombreContacto, ciudad: ciudadContacto, proveedor: proveedorContacto, fuente: fuenteContacto, cargo: cargoContacto, info }) => {
            nombre.push(nombreContacto);
            ciudad.push(ciudadContacto);
            proveedor.push(proveedorContacto);
            fuente.push(fuenteContacto);
            cargo.push(cargoContacto)

            info.forEach(({ email, telefono }) => {
                correos.push(email);
                telefonos.push(telefono);
            });
        });

        const email = correos.join(';');
        const telefono = telefonos.join(';');
        const nombreContacto = nombre.join(';')
        const nombreCiudad = nombre.join(';');
        const ciudadCliente = ciudad.join(';');
        const proveedorCliente = proveedor.join(';');
        const fuenteCliente = fuente.join(';');
        const cargoContacto = cargo.join(';')

        if (!nitCliente || !oldDigito) {
            return res.status(400).json({ message: "El NIT del cliente y el dígito de verificación anterior son obligatorios" });
        }

        const pool = await getConnection();

        let updateFields = [];
        let queryParams = {};

        if (newDigito !== undefined) {
            updateFields.push("[Digito_Verificacion] = @newDigito");
            queryParams["newDigito"] = newDigito;
        }

        if (empresaCliente !== undefined) {
            updateFields.push("[Empresa_Cliente] = @Empresa_Cliente");
            queryParams["Empresa_Cliente"] = empresaCliente;
        }

        if (ciudadCliente !== undefined) {
            updateFields.push("[Ciudad_Cliente] = @Ciudad_Cliente");
            queryParams["Ciudad_Cliente"] = ciudadCliente;
        }

        if (nombreContacto !== undefined) {
            updateFields.push("[Nombre_Contacto] = @Nombre_Contacto");
            queryParams["Nombre_Contacto"] = nombreContacto;
        }

        if (telefono !== undefined) {
            updateFields.push("[Telefono_1] = @Telefono_1");
            queryParams["Telefono_1"] = telefono;
        }

        if (idDirector !== undefined) {
            updateFields.push("[ID_Director] = @ID_Director");
            queryParams["ID_Director"] = idDirector;
        }

        if (idSector !== undefined) {
            updateFields.push("[ID_Sector] = @ID_Sector");
            queryParams["ID_Sector"] = idSector;
        }

        if (probabilidad !== undefined) {
            updateFields.push("[Probabilidad] = @Probabilidad");
            queryParams["Probabilidad"] = probabilidad || '';
        }

        if (cargoContacto !== undefined) {
            updateFields.push("[Cargo_Contacto] = @Cargo_Contacto");
            queryParams["Cargo_Contacto"] = cargoContacto;
        }

        if (proveedor !== undefined) {
            updateFields.push("[Proveedor] = @Proveedor");
            queryParams["Proveedor"] = proveedorCliente;
        }

        if (redSocial !== undefined) {
            updateFields.push("[Red_Social] = @Red_Social");
            queryParams["Red_Social"] = redSocial;
        }

        if (fechaIngreso !== undefined) {
            updateFields.push("[Fecha_Ingreso] = @Fecha_Ingreso");
            queryParams["Fecha_Ingreso"] = fechaIngreso;
        }

        if (fuente !== undefined) {
            updateFields.push("[Fuente] = @Fuente");
            queryParams["Fuente"] = fuenteCliente;
        }

        if (email !== undefined) {
            updateFields.push("[Email] = @Email");
            queryParams["Email"] = email;
        }

        if (observaciones !== undefined) {
            updateFields.push("[Observaciones] = @Observaciones");
            queryParams["Observaciones"] = observaciones;
        }

        if (tipoCliente !== undefined) {
            updateFields.push("[Tipo_Cliente] = @Tipo_Cliente");
            queryParams["Tipo_Cliente"] = tipoCliente;
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "No se han proporcionado campos para actualizar" });
        }

        const updateClienteQuery = `
            UPDATE [GlobalCoDB].[dbo].[TB_Clientes]
            SET ${updateFields.join(', ')}
            WHERE NIT_Cliente = @NIT_Cliente AND [Digito_Verificacion] = @oldDigito
        `;

        const request = pool.request();
        request.input("NIT_Cliente", nitCliente);
        request.input("oldDigito", oldDigito);

        for (const param in queryParams) {
            request.input(param, queryParams[param]);
        }

        await request.query(updateClienteQuery);

        // Si se está actualizando el ID_Director, actualizamos también la tabla TB_Ventas
        if (idDirector !== undefined) {
            const updateVentasQuery = `
                UPDATE [GlobalCoDB].[dbo].[TB_Ventas]
                SET [ID_Director] = @ID_Director
                WHERE NIT_Cliente = @NIT_Cliente
            `;

            await request.query(updateVentasQuery);
        }

        return res.status(200).json({ message: "Cliente y ventas actualizados correctamente" });
    } catch (e) {
        console.error('Error actualizando cliente y ventas:', e);
        return res.status(400).json({ message: "Error al actualizar cliente y ventas", error: e.message });
    }
};

export const addServiciosByCliente = async (req, res) => {
    try {
        const { idCliente, idServicio } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("NIT_Cliente", idCliente)
            .input("ID_Servicio", idServicio)
            .query(querys.queryAddServiciosByCliente)
        return res.status(200).json({ message: "Servicio agregado correctamente" });
    }
    catch {
        return res.status(400).json({ message: "Error al agregar servicio" });
    }

}

export const deleteServiciosByCliente = async (req, res) => {
    try {
        const { idCliente, idServicio } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("NIT_Cliente", idCliente)
            .input("ID_Servicio", idServicio)
            .query(querys.queryDeleteServiciosByCliente)
        return res.status(200).json({ message: "Servicio eliminado correctamente" });
    }
    catch {
        return res.status(400).json({ message: "Error al eliminar servicio" });
    }

}

export const createVenta = async (req, res) => {
    try {
        const {
            idCliente,
            digito,
            idServicio,
            anunciante,
            ingresosFacturacion,
            fechaInicio,
            fechaFin,
            fechaAcuerdo,
            id_director,
            numeroCotizacion,
            observaciones,
            tipoVenta,
            Clipping = 0,
            Social_Media = 0,
            Informes_de_Analisis = 0,
            Catalogo_Publicitario = 0,
            Compliance = 0,
            Internacional = 0,
            Otros_Servicios = 0,
            proyeccion
        } = req.body;

        const limpiarValor = (valor) => {
            return typeof valor === 'string' ? valor.replace(/[\$,.]/g, '').trim() : valor;
        };

        const nitClienteBigInt = parseInt(idCliente, 10);
        const idDirectorBigInt = parseInt(id_director, 10);

        if (isNaN(nitClienteBigInt) || isNaN(idDirectorBigInt)) {
            return res.status(400).json({ message: "El NIT del cliente o el ID del director son inválidos." });
        }

        const pool = await getConnection();

        const result = await pool.request()
            .input("N_Cotizacion", sql.VarChar, numeroCotizacion)
            .query(querys.queryReadCotizacionByNumero);

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: "Número de cotización ya existe" });
        }

        // Verifica y maneja ingresosFacturacion correctamente
        await pool.request()
            .input("NIT_Cliente", nitClienteBigInt)
            .input("Anunciante", anunciante)
            .input("ID_Director", sql.BigInt, idDirectorBigInt)
            .input("ID_Servicio", sql.Int, idServicio)
            .input("Valor_Venta", sql.BigInt, typeof ingresosFacturacion === 'string'
                ? parseFloat(ingresosFacturacion.replace(/[^\d.-]/g, ''))
                : ingresosFacturacion) // Maneja tanto cadenas como números
            .input("Fecha_Acuerdo", sql.Date, fechaAcuerdo)
            .input("Fecha_Inicio", sql.Date, fechaInicio)
            .input("Fecha_Fin", sql.Date, fechaFin)
            .input("N_Cotizacion", sql.VarChar, numeroCotizacion)
            .input("Observaciones", sql.VarChar, observaciones)
            .input("Tipo_Venta", sql.VarChar, tipoVenta)
            .input("Clipping", limpiarValor(Clipping))
            .input("SocialMedia", limpiarValor(Social_Media))
            .input("InformesAnalisis", limpiarValor(Informes_de_Analisis))
            .input("CatalogoPublicitario", limpiarValor(Catalogo_Publicitario))
            .input("Compliance", limpiarValor(Compliance))
            .input("Internacional", limpiarValor(Internacional))
            .input("OtrosServicios", limpiarValor(Otros_Servicios))
            .input("Proyeccion", proyeccion)
            .input("Digito", digito)
            .query(querys.queryCreateVenta);

        return res.status(200).json({ message: "Venta creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error al crear venta" });
    }
};


export const getCotizacion = async (req, res) => {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(querys.queryReadCotizacion);
            let idCot = 1;

            const idCotBD = result.recordset;

            if (idCotBD.length > 0) {
                const numerosCotizacion = idCotBD.map(item => {
                    const match = item.idCotizacion.match(/GNC-(\d+)-\d{4}/);
                    return match ? parseInt(match[1]) : 0;
                });

                const maxId = Math.max(...numerosCotizacion);
                idCot = maxId + 1;
            }

            return res.status(200).json({ idCot: idCot });
        } catch (error) {
            attempt++;
            console.log(`Intento ${attempt} fallido:`, error);

            if (attempt === maxRetries) {
                console.log('Ha ocurrido un error al obtener el id de cotización después de', maxRetries, 'intentos:', error);
                return res.status(500).json({ message: "Ha ocurrido un error al obtener el id de cotización" });
            }

            // Espera 1 segundo antes del siguiente intento
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

const formatNumer = (number) => {
    console.log(number);

    if (number === undefined || number === null) {
        return 0;
    }

    const res = String(number).replace(/\D/g, "");
    return res;
};
export const updateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            idCliente, idServicio, ingresosFacturacion, fechaInicio,
            fechaFin, fechaAcuerdo, id_director, numeroCotizacion,
            observaciones, tipoVenta, proyeccion,
            Clipping, Social_Media, Compliance, Informes_de_Analisis,
            Catalogo_Publicitario, Internacional, Otros_Servicios
        } = req.body;


        console.log(req.body)


        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Venta", id)
            .input("NIT_Cliente", idCliente)
            .input("ID_Servicio", idServicio)
            .input("Ingresos_Facturacion", ingresosFacturacion)
            .input("Fecha_Acuerdo", fechaAcuerdo)
            .input("Fecha_Inicio", fechaInicio)
            .input("Fecha_Fin", fechaFin)
            .input("ID_Director", id_director)
            .input("N_Cotizacion", numeroCotizacion)
            .input("Observaciones", observaciones)
            .input("Tipo_Venta", tipoVenta)
            .input("Proyeccion", proyeccion)
            .input("Clipping", formatNumer(Clipping))
            .input("Social_Media", formatNumer(Social_Media))
            .input("Compliance", formatNumer(Compliance))
            .input("InformesAnalisis", formatNumer(Informes_de_Analisis))
            .input("CatalogoPublicitario", formatNumer(Catalogo_Publicitario))
            .input("Internacional", formatNumer(Internacional))
            .input("OtrosServicios", formatNumer(Otros_Servicios))
            .query(querys.queryUpdateVenta);

        return res.status(200).json({ message: "Venta actualizada correctamente" });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "Error al actualizar venta" });
    }
}


export const deleteCliente = async (req, res) => {
    try {
        const pool = await getConnection();
        const { nitCliente, digito } = req.query;

        const result = await pool.request()
            .input("NIT_Cliente", nitCliente)
            .input("Digito", digito)
            .query(querys.queryDeleteCliente);

        return res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        return res.status(400).json({ message: "Error al eliminar cliente" });
    }
};
