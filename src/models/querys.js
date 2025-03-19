export const querys = {
    queryInsertLog: `INSERT INTO [GlobalCoDB].[dbo].[TB_Logs]
    ([ID_User],[Fecha],[Detalle],[Tabla],[ID_Registro])
    VALUES
    (@ID_User,@Fecha,@Detalle,@Tabla,@ID_Registro)`,
    queryFindEmpresa: `SELECT TOP (1) [NIT_Cliente] as idCliente
    ,[Empresa_Cliente] as empresaCliente 
    From [GlobalCoDB].[dbo].[TB_Clientes]
    where NIT_Cliente = @NIT_Cliente`,

    getDV: `SELECT *
    FROM [GlobalCoDB].[dbo].[TB_Clientes]
    WHERE NIT_Cliente = @NIT_Cliente AND Digito_Verificacion = @Digito`,

    queryReadDirectorById: `SELECT  [ID_Director] as idDirector ,
    [Nombre] as nombreDirector,[Email] as emailDirector,
    [Telefono] as telefonoDirector,[Ciudad] as ciudadDirector 
    FROM [GlobalCoDB].[dbo].[TB_Directores] WHERE ID_Director = @ID_Director`,
    queryReadCotizacionByNumero: `SELECT TOP (1) [N_Cotizacion] as idCotizacion 
    FROM [GlobalCoDB].[dbo].[TB_Ventas] WHERE N_Cotizacion = @N_Cotizacion `,
    queryReadCotizacion: `SELECT TOP (1) [N_Cotizacion] as idCotizacion 
    FROM [GlobalCoDB].[dbo].[TB_Ventas] ORDER BY FechaAlta desc`,

    queryTotalidadVentasbyDirector: `SELECT count([ID_Venta]) as totalVentas
    FROM [GlobalCoDB].[dbo].[TB_Ventas] where ID_Director = @ID_Director
    and @Anio BETWEEN YEAR(Fecha_Inicio) AND YEAR(Fecha_Fin)`,
    querygetProyeccionValor: `SELECT 
    'Clipping' AS servicio,
    Clipping AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Clipping IS NOT NULL AND Clipping > 0

UNION ALL

SELECT 
    'Social Media' AS servicio,
    SocialMedia AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND SocialMedia IS NOT NULL AND SocialMedia > 0

UNION ALL

SELECT 
    'Informes de Análisis' AS servicio,
    InformesAnalisis AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND InformesAnalisis IS NOT NULL AND InformesAnalisis > 0

UNION ALL

SELECT 
    'Catálogo Publicitario' AS servicio,
    CatalogoPublicitario AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND CatalogoPublicitario IS NOT NULL AND CatalogoPublicitario > 0

UNION ALL

SELECT 
    'Compliance' AS servicio,
    Compliance AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Compliance IS NOT NULL AND Compliance > 0

UNION ALL

SELECT 
    'Internacional' AS servicio,
    Internacional AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Internacional IS NOT NULL AND Internacional > 0

UNION ALL

SELECT 
    'Otros Servicios' AS servicio,
    OtrosServicios AS proyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND OtrosServicios IS NOT NULL AND OtrosServicios > 0
   `,
    queryUpdateAgenda: `UPDATE [GlobalCoDB].[dbo].[TB_Agenda]
    SET [Fecha_Inicio] = @FechaInicio ,[Fecha_Fin] = @FechaFin 
    WHERE ID_Agenda = @ID_Agenda`,

    queryUpdateAgendaDetalle: `UPDATE [GlobalCoDB].[dbo].[TB_Agenda]
    SET [Observacion] = @Obsevacion
    WHERE ID_Agenda = @ID_Agenda`,
    querySelectRolByID: `SELECT TOP (1) [Rol] FROM [GlobalCoDB].[dbo].[TB_Rol] WHERE ID_Rol = @idrol `,

    queryTotalProyeccionDirector: `SELECT
    SUM(
        ISNULL(TRY_CAST([Clipping] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([SocialMedia] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([InformesAnalisis] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([CatalogoPublicitario] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([Compliance] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([Internacional] AS DECIMAL(18,2)), 0) +
        ISNULL(TRY_CAST([OtrosServicios] AS DECIMAL(18,2)), 0)
    ) AS TotalServicios
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director
    AND @Anio BETWEEN YEAR(Fecha_Inicio) AND YEAR(Fecha_Fin);`,

    queryReadIdDirectores: `SELECT TOP (1000) [ID_Director] as idDirector , [Nombre] as nombreDirector
    FROM [GlobalCoDB].[dbo].[TB_Directores]`,
    queryReadDirector: `SELECT TOP (1) [ID_Director] as id , [Nombre] as nombre FROM [GlobalCoDB].[dbo].[TB_Directores] where ID_User = @ID_User`,

    queryReadDirectores: `SELECT TOP (1000) [ID_Director] as id
    ,[Nombre] as nombre FROM [GlobalCoDB].[dbo].[TB_Directores]`,

    queryReadProyeccionDirector: ` SELECT ID_Proyeccion, Clipping, SocialMedia, InformesAnalisis, CatalogoPublicitario, Compliance, Internacional, OtrosServicios
                    FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir] 
                    WHERE ID_Director = @ID_Director 
                    AND Fecha_Inicio = @Fecha_Inicio`,

    updateProyeccion: `
                            UPDATE [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
                            SET 
                                Clipping = @Clipping,
                                SocialMedia = @SocialMedia,
                                InformesAnalisis = @InformesAnalisis,
                                CatalogoPublicitario = @Catalogo,
                                Compliance = @Compliance,
                                Internacional = @Internacional,
                                OtrosServicios = @OtrosServicios
                            WHERE ID_Proyeccion = @ID_Proyeccion
                        `,
    queryReadVentasbyNewClient: `
    SELECT sum(base2.[Ingresos_Facturacion]) as totalNewCliente
FROM [GlobalCoDB].[dbo].[TB_Clientes] as base1
INNER JOIN [GlobalCoDB].[dbo].TB_Ventas as base2
    ON base1.NIT_Cliente = base2.NIT_Cliente 
    AND base1.Digito_Verificacion = base2.Digito_Verificacion
WHERE base1.ID_Director = @ID_Director
AND MONTH(fecha_ingreso) = @mes 
AND (
    CASE 
        WHEN DAY(fecha_ingreso) = 31 AND MONTH(fecha_ingreso) = 12
        THEN YEAR(fecha_ingreso) + 1
        ELSE YEAR(fecha_ingreso)
    END
) = @Anio`,

    queryReadVentasByDirectorAnual: `
     SELECT TOP (1000) base4.[Empresa_Cliente] as empresaCliente
                ,base3.ID_Director as director
                ,base4.[Ciudad_Cliente] as ciudadCliente,base4.[Tipo_Cliente] as tipoCliente
                ,base1.[ingresos_Facturacion] as ingresosFacturacion,base1.[Fecha_Acuerdo] as fechaAcuerdo
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
                inner join [GlobalCoDB].[dbo].[TB_Directores] as base3
                on base1.ID_Director = base3.ID_Director
                inner join [GlobalCoDB].[dbo].[TB_Clientes] as base4
                on base1.NIT_Cliente = base4.NIT_Cliente and base1.Digito_Verificacion = base4.Digito_Verificacion
                WHERE base3.ID_Director = @ID_Director
                AND YEAR(base1.Fecha_Inicio) = @Anio
                OR (base3.ID_Director = @ID_Director AND YEAR(base1.Fecha_Fin) = @Anio)
    `,
    queryReadVentasByDirector: `  
 SELECT TOP (1000) 
    base4.[Empresa_Cliente] as empresaCliente
    ,base3.ID_Director as director
    ,base4.[Ciudad_Cliente] as ciudadCliente
    ,base4.[Tipo_Cliente] as tipoCliente
    ,base1.[ingresos_Facturacion] as ingresosFacturacion
    ,base1.[Fecha_Acuerdo] as fechaAcuerdo
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
    ,CASE 
        WHEN DAY(base1.Fecha_Inicio) = 31 AND MONTH(base1.Fecha_Inicio) = 12
        THEN YEAR(base1.Fecha_Inicio) + 1
        ELSE YEAR(base1.Fecha_Inicio)
    END as anioInicio
    ,CASE 
        WHEN DAY(base1.Fecha_Fin) = 31 AND MONTH(base1.Fecha_Fin) = 12
        THEN YEAR(base1.Fecha_Fin) + 1
        ELSE YEAR(base1.Fecha_Fin)
    END as anioFin
FROM [GlobalCoDB].[dbo].[TB_Ventas] as base1
INNER JOIN [GlobalCoDB].[dbo].[TB_Directores] as base3
    ON base1.ID_Director = base3.ID_Director
INNER JOIN [GlobalCoDB].[dbo].[TB_Clientes] as base4
    ON base1.NIT_Cliente = base4.NIT_Cliente 
    AND base1.Digito_Verificacion = base4.Digito_Verificacion
WHERE @ID_Director = base3.ID_Director
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
`,

    querySelectuserid: `SELECT TOP (1) base1.[ID_User]
        ,base1.[UserName]
        ,base1.[Password]
        ,base3.[Rol]
        FROM [GlobalCoDB].[dbo].[TB_Users] as base1
        inner join [GlobalCoDB].[dbo].[TB_Users_Rol] as base2
        on base1.ID_User = base2.ID_User
        inner join [GlobalCoDB].[dbo].[TB_Rol] as base3
        on base2.ID_Rol = base3.ID_Rol
        WHERE base1.UserName = @UserName `,
    queryfinduserbyid: `SELECT TOP (1) [ID_User]
    from [GlobalCoDB].[dbo].[TB_Users]
    WHERE ID_User = @ID_User`,
    queryfindprofilebyid: `SELECT TOP (1) [ID_User]
    from [GlobalCoDB].[dbo].[TB_Directores]
    WHERE ID_User = @ID_User`
    ,

    querySelectprofileuserid: `SELECT *
        FROM [GlobalCoDB].[dbo].[TB_Directores]
        WHERE ID_User = @ID_User`,

    queryInsertUser: `INSERT INTO [GlobalCoDB].[dbo].[TB_Users]
        ([Password],[UserName] ,[Salt])
        VALUES
        (@Password  ,@UserName ,@Salt)
        SELECT SCOPE_IDENTITY() AS ID_User
        `,

    queryInserDirector: ` INSERT INTO [GlobalCoDB].[dbo].[TB_Directores] 
        ([Nombre],[Email],[Telefono],[Ciudad],[ID_User])
        VALUES
        (@Nombre,@Email,@Telefono,@Ciudad,@ID_User)
        SELECT SCOPE_IDENTITY() AS 'ID_Director'`,
    queryInsertRol: `INSERT INTO [GlobalCoDB].[dbo].[TB_Users_Rol]
        ([ID_User],[ID_Rol])
        VALUES
        (@ID_User,@ID_Rol)`,
    queryReadClientes: `SELECT TOP (1000) [NIT_Cliente] as id
        ,[Empresa_Cliente] as nombre, [Digito_Verificacion] as digito
        FROM [GlobalCoDB].[dbo].[TB_Clientes]
    `,
    queryReadClientesByDirector: `
    SELECT TOP (1000) [NIT_Cliente] as id
        ,[Empresa_Cliente] as nombre, [Digito_Verificacion] as digito
        FROM [GlobalCoDB].[dbo].[TB_Clientes]
        WHERE ID_Director = @ID_Director
 `,


    queryClientesbyDirector: `SELECT TOP (1000) base1.[NIT_Cliente] as nitCliente
    ,base1.[Empresa_Cliente] as empresaCliente
    ,base1.[Ciudad_Cliente] as ciudadCliente
    ,base1.[Nombre_Contacto] as nombreContacto
    ,base1.[Telefono_1] as telefono1
    ,base2.[Nombre] as director
    ,base3.[Nombre_Sector] as sector
    ,base1.[Digito_Verificacion] as digitoVerificacion
    ,base1.[Proveedor] FROM [GlobalCoDB].[dbo].[TB_Clientes] as base1
    left join [GlobalCoDB].[dbo].[TB_Directores] as base2 
    on base1.ID_Director = base2.ID_Director
    left join [GlobalCoDB].[dbo].[TB_Sectores] as base3
    on base1.ID_Sector = base3.ID_Sector
    left join [GlobalCoDB].[dbo].[TB_Users] as base4
    on base2.ID_User = base4.ID_User
    WHERE base4.ID_User = @ID_Director`,

    queryAllClientes: `SELECT TOP (1000) base1.[NIT_Cliente] as nitCliente
    ,base1.[Empresa_Cliente] as empresaCliente
    ,base1.[Ciudad_Cliente] as ciudadCliente
    ,base1.[Nombre_Contacto] as nombreContacto
    ,base1.[Telefono_1] as telefono1
    ,base2.[Nombre] as director
    ,base3.[Nombre_Sector] as sector
    ,base1.[Digito_Verificacion] as digitoVerificacion
    ,base1.[Proveedor] FROM [GlobalCoDB].[dbo].[TB_Clientes] as base1
    inner join [GlobalCoDB].[dbo].[TB_Directores] as base2 
    on base1.ID_Director = base2.ID_Director
    inner join [GlobalCoDB].[dbo].[TB_Sectores] as base3
    on base1.ID_Sector = base3.ID_Sector
  `,

    queryReadSectores: `SELECT TOP (1000) [ID_Sector] as id
    ,[Nombre_Sector] as nombre
    FROM [GlobalCoDB].[dbo].[TB_Sectores]`,

    queryClientebyId: `SELECT TOP (1000) [NIT_Cliente] as idCliente,
[Empresa_Cliente] as empresaCliente,  
[Ciudad_Cliente] as ciudadCliente,
[Nombre_Contacto] as nombreContacto,
[Telefono_1] as telefono1,
[ID_Director] as idDirector,
[ID_Sector] as idSector,
[Probabilidad] as probabilidad,
[Cargo_Contacto] as cargoContacto,
[Proveedor] as proveedor,
[Red_Social] as redSocial,
[Fecha_Ingreso] as fechaIngreso,
[Fuente] as fuente,
[Email] as email,
[Observaciones] as observaciones,
[Tipo_Cliente] as tipoCliente,
[Digito_Verificacion] as digitoVerificacion
FROM [GlobalCoDB].[dbo].[TB_Clientes]
WHERE NIT_Cliente = @NIT_Cliente AND Digito_Verificacion = @Digito`,

    queryReadServicios: `SELECT TOP (1000) [ID_Servicio] as idServicio
,[Tipo_Servicio] as tipoServicio
FROM [GlobalCoDB].[dbo].[TB_Servicios]`,
    queryServiciosbyClienteId: `SELECT TOP (1000) [ID_Servicio] as idServicio
FROM [GlobalCoDB].[dbo].[TB_Clientes_Servicios]
WHERE NIT_Cliente = @NIT_Cliente`,
    queryVentasbyClienteId: `SELECT TOP (1000) *
  FROM [GlobalCoDB].[dbo].[TB_Ventas]
  WHERE [NIT_Cliente] = @NIT_Cliente AND [Digito_Verificacion] = @Digito`,
    queryCreateAgenda: `INSERT INTO [GlobalCoDB].[dbo].[TB_Agenda]
                ([ID_Director],[NIT_Cliente],[Fecha_Inicio],[Fecha_Fin],[Observacion],[Proposito], [Delete_State], [Digito_Verificacion])
                OUTPUT INSERTED.ID_Agenda
                VALUES
                (@ID_Director,@NIT_Cliente,@FechaInicio,@FechaFin,@Obsevacion,@Proposito,0, @Digito)`,


    queryReadAgenda: `  SELECT TOP (1000) base.[ID_Agenda] as idAgenda , base.Fecha_Inicio as start,base.Fecha_Fin as [end]
,base.Observacion as descripcion,base.Proposito as title,base1.[Empresa_Cliente] as cliente
FROM [GlobalCoDB].[dbo].[TB_Agenda] as base
inner join [GlobalCoDB].[dbo].[TB_Clientes] as base1 
on base.NIT_Cliente = base1.NIT_Cliente AND base.Digito_Verificacion = base1.Digito_Verificacion
WHERE base.ID_Director = @ID_Director and base.Delete_State = 0`,

    queryDeleteAgenda: `UPDATE  [GlobalCoDB].[dbo].[TB_Agenda]
SET [Delete_State] = 1
WHERE ID_Agenda = @ID_Agenda`,
    queryCreateCliente
        : `INSERT INTO [GlobalCoDB].[dbo].[TB_Clientes]
([Empresa_Cliente],[NIT_CLIENTE],[Ciudad_Cliente],[Nombre_Contacto],[Telefono_1],[ID_Director],[ID_Sector],[Probabilidad],[Cargo_Contacto],[Proveedor],[Red_Social],[Fecha_Ingreso],[Fuente],[Email],[Observaciones],[Tipo_Cliente],[Digito_Verificacion])
VALUES
(@Empresa_Cliente,@NIT_Cliente,@Ciudad_Cliente,@Nombre_Contacto,@Telefono,@ID_Director,@ID_Sector,@Probabilidad,@Cargo_Contacto,@Proveedor,@Red_Social,@Fecha_Ingreso,@Fuente,@Email,@Observaciones,@Tipo_Cliente,@Digito)`,

    queryUpdateCliente
        : `UPDATE [GlobalCoDB].[dbo].[TB_Clientes]
SET [Empresa_Cliente] = @Empresa_Cliente
,[Ciudad_Cliente] = @Ciudad_Cliente
,[Nombre_Contacto] = @Nombre_Contacto
,[Telefono_1] = @Telefono_1
,[ID_Director] = @ID_Director
,[ID_Sector] = @ID_Sector
,[Probabilidad] = @Probabilidad
,[Cargo_Contacto] = @Cargo_Contacto
,[Proveedor] = @Proveedor
,[Red_Social] = @Red_Social
,[Fecha_Ingreso] = @Fecha_Ingreso
,[Fuente] = @Fuente
,[Email] = @Email
,[Observaciones] = @Observaciones
,[Tipo_Cliente] = @Tipo_Cliente
WHERE NIT_Cliente = @NIT_Cliente`,
    queryAddServiciosByCliente
        : `INSERT INTO [GlobalCoDB].[dbo].[TB_Clientes_Servicios]
([NIT_Cliente],[ID_Servicio])
VALUES
(@NIT_Cliente,@ID_Servicio)`,
    queryDeleteServiciosByCliente
        : `DELETE FROM [GlobalCoDB].[dbo].[TB_Clientes_Servicios]
WHERE NIT_Cliente = @NIT_Cliente and ID_Servicio = @ID_Servicio`,
    queryCreateVenta: `
INSERT INTO [GlobalCoDB].[dbo].[TB_Ventas]
([NIT_Cliente], [ID_Servicio], [Fecha_Acuerdo], [Fecha_Inicio],
[Fecha_Fin], [Ingresos_Facturacion], [ID_Director],
[N_Cotizacion], [Observaciones], [Tipo_Venta], [FechaAlta],
[Clipping], [SocialMedia], [InformesAnalisis], 
[CatalogoPublicitario], [Compliance], [Internacional], [OtrosServicios], [Proyeccion], [Digito_Verificacion],[Anunciante])

VALUES (@NIT_Cliente, @ID_Servicio, @Fecha_Acuerdo, @Fecha_Inicio,
@Fecha_Fin, @Valor_Venta, @ID_Director, @N_Cotizacion, 
@Observaciones, @Tipo_Venta, GETDATE(),
@Clipping, @SocialMedia, @InformesAnalisis, 
@CatalogoPublicitario, @Compliance, @Internacional, @OtrosServicios, @Proyeccion, @Digito, @Anunciante)
`,

    queryUpdateVenta: `UPDATE [GlobalCoDB].[dbo].[TB_Ventas]
SET 
    [NIT_Cliente] = @NIT_Cliente,
    [ID_Servicio] = @ID_Servicio,
    [Fecha_Acuerdo] = @Fecha_Acuerdo,
    [Fecha_Inicio] = @Fecha_Inicio,
    [Fecha_Fin] = @Fecha_Fin,
    [Ingresos_Facturacion] = @Ingresos_Facturacion,
    [ID_Director] = @ID_Director,
    [N_Cotizacion] = @N_Cotizacion,
    [Observaciones] = @Observaciones,
    [Tipo_Venta] = @Tipo_Venta,
    [Proyeccion] = @Proyeccion, 
    [Clipping] = @Clipping,
    [SocialMedia] = @Social_Media,
    [Compliance] = @Compliance,
    [InformesAnalisis] = @InformesAnalisis,
    [CatalogoPublicitario] = @CatalogoPublicitario,
    [Internacional] = @Internacional,
    [OtrosServicios] = @OtrosServicios
WHERE 
    ID_Venta = @ID_Venta;

`,


    queryDeleteCliente: `DELETE FROM [GlobalCoDB].[dbo].[TB_Clientes]
WHERE NIT_Cliente = @NIT_Cliente AND [Digito_Verificacion] = @Digito`,
    queryProyeccionDirector: `SELECT 
    ID_Proyeccion,
    Clipping AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Clipping' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Clipping IS NOT NULL AND Clipping > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    SocialMedia AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Social Media' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND SocialMedia IS NOT NULL AND SocialMedia > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    InformesAnalisis AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Informes de Análisis' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND InformesAnalisis IS NOT NULL AND InformesAnalisis > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    CatalogoPublicitario AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Catálogo Publicitario' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND CatalogoPublicitario IS NOT NULL AND CatalogoPublicitario > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    Compliance AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Compliance' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Compliance IS NOT NULL AND Compliance > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    Internacional AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Internacional' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND Internacional IS NOT NULL AND Internacional > 0

UNION ALL

SELECT 
    ID_Proyeccion,
    OtrosServicios AS proyeccionValor,
    Fecha_Inicio AS fechaInicio,
    'Otros Servicios' AS nombreServicio
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
WHERE ID_Director = @ID_Director 
  AND MONTH(Fecha_Inicio) = @Mes 
  AND YEAR(Fecha_Inicio) = @Anio
  AND OtrosServicios IS NOT NULL AND OtrosServicios > 0;
`,

    queryProyeccionMes: `SELECT  sum([Proyeccion_Valor]) as totalProyeccion
FROM [GlobalCoDB].[dbo].[TB_Proyeccion_Dir] 
where ID_Director = @ID_Director and MONTH(Fecha_Inicio) = @Mes and YEAR(Fecha_Inicio) = @Anio`,


    queryCreateProyeccionDirector: `INSERT INTO [GlobalCoDB].[dbo].[TB_Proyeccion_Dir]
([Fecha_Inicio],[Fecha_Fin],[ID_Director],[Proyeccion_Valor],[Clipping]
      ,[SocialMedia]
      ,[InformesAnalisis]
      ,[CatalogoPublicitario]
      ,[Compliance]
      ,[Internacional]
      ,[OtrosServicios])
VALUES
(@FechaInicio,@FechaFin,@ID_Director,@Proyeccion_Valor, @Clipping, @SocialMedia, @InformesAnalisis,
@CatalogoPublicitario,
@Compliance,
@Internacional,
@OtrosServicios)`,

    queryTotalVentasbyDirector: `SELECT TOP (1000) sum([Ingresos_Facturacion]) as totalVentas
FROM [GlobalCoDB].[dbo].[TB_Ventas] where ID_Director = @ID_Director`,
    queryTotalVentasbyDirectorMonth: `SELECT 
sum(Ingresos_Facturacion) as totalVentas
FROM    TB_Ventas
WHERE   ((MONTH(Fecha_Inicio) = @Mes) OR
(MONTH(Fecha_Fin) = @Mes) OR (Fecha_Inicio <= @FechaInicio) AND (Fecha_Fin >= @FechaFin))
and ID_Director = @ID_Director`,

}
