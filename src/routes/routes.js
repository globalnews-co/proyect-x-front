import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import * as clintsCtrl from "../controllers/clientes.controller.js";
import * as directoresCtrl from "../controllers/directores.controller.js";

const router = Router();

// Rutas para la autenticación
router.post('/completeprofile', authCtrl.profile);
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/verifytoken', authCtrl.verifyToken);
router.post('/logout-log/:id', authCtrl.log);

// Rutas para los clientes
router.get('/clientes', clintsCtrl.listclientes);
router.get('/clientebydirector', clintsCtrl.clientesbydirector);
router.post('/cliente', clintsCtrl.clientebyid);
router.post('/crear', clintsCtrl.createCliente);
router.put('/clientes/', clintsCtrl.updateCliente);
router.delete('/clientes/eliminar', clintsCtrl.deleteCliente);
router.get('/sectores', clintsCtrl.listsectores);
router.get('/servicios', clintsCtrl.listservicios);
router.get('/servicios/servicios-by-cliente/:id', clintsCtrl.serviciosbyclienteid);
router.post('/serviciosbycliente', clintsCtrl.addServiciosByCliente);
router.post('/delete-servicios-by-cliente', clintsCtrl.deleteServiciosByCliente);
router.get('/ventas/ventas-by-cliente/:nitCliente/:digito', clintsCtrl.ventasbyclienteid);
router.post('/ventas', clintsCtrl.createVenta);
router.put('/ventas/:id', clintsCtrl.updateVenta);
router.get('/cotizacion', clintsCtrl.getCotizacion)

// Rutas para los directores
router.get('/directores', directoresCtrl.listdirectores);
router.post('/director/:id', directoresCtrl.getdirectorbyid);
router.get('/alldirectores', directoresCtrl.getiddirectores);
router.post('/agenda', directoresCtrl.createagenda);
router.get('/agenda/:id', directoresCtrl.listAgenda);
router.put('/agenda/:id', directoresCtrl.updateAgenda);
router.put('/agenda-detalle/:id', directoresCtrl.updateAgendaDetalle);
router.delete('/agenda/:id', directoresCtrl.deleteAgenda);
router.get('/totalproyeccion/:id', directoresCtrl.totalproyeccion);
router.post('/proyecciondir/:id', directoresCtrl.getproyecciondir);
router.post('/proyecciondir', directoresCtrl.createproyecciondir);
router.post('/ventasbydirector', directoresCtrl.ventasbydirector);



export default router;