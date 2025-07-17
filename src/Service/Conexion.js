import axios from "axios";

const url = "http://192.168.1.156:8087/";
const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"))
const profile = JSON.parse(localStorage.getItem("profile"))

class Conexion {
  //Metodo para loguearse
  login = async (form) => {
    try {
      const response = await axios.post(url + "login", form);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  //Metodo para registrarse
  register = async (form) => {
    try {
      const response = await axios.post(url + "register", form);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  getAllDirectores = async () => {
    try {
      const response = await axios.get(url + "alldirectores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  };

  getDirectorById = async (id, anio) => {
    try {
      const response = await axios.post(
        url + "director/" + id,
        { anio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    }
    catch (error) {
      console.error("Error al obtener director:", error);
      return [];
    }
  }

  getVentasByDirector = async (anio, mes, id) => {
    try {
      const response = await axios.post(
        url + "ventasbydirector", {
        anio: anio,
        mes: mes,
        id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      return response.data;
    }
    catch {
      return [];
    }
  }


  //Metodo para verificar el token
  verifyToken = async () => {
    try {
      const response = await axios.get(
        url + "verifytoken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch {
      return false;
    }
  };



  getListClientes = async (idPerfil) => {
    try {
      const response = await axios.get(
        url + "clientes", {
        headers: {
          Authorization: `Bearer ${token}`,
          id_director: idPerfil
        }
      }
      );
      return response.data;
    } catch (error) {
      return [];
    }
  };

  //Metodo para obtener los clientes
  getClientes = async () => {
    try {
      const response = await axios.get(
        url + "clientebydirector", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response.data;
    }
    catch {
      return [];
    }
  }

  //Metodo para obtener los clientes por id
  getClienteById = async (data) => {
    try {
      const response = await axios.post(url + "cliente",
        data
      );
      return response.data;
    }
    catch {
      return null;
    }
  }

  completeProfile = async (form) => {
    form.id_user = user._id;
    try {
      const response = await axios.post(url + "completeprofile",
        form
      );
      return response.data;
    }
    catch {
      return null;
    }
  }

  //Metodo para obtener los directores
  listDirectores = async () => {
    try {
      const response = await axios.get(url + "directores", {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Profile': JSON.stringify(profile.ID_User),
        },
      });
      return response.data;
    } catch {
      return [];
    }
  };

  //Metodo para obtener los sectores

  listSectores = async () => {
    try {
      const response = await axios.get(
        url + "sectores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response.data;
    }
    catch {
      return [];
    }
  }


  //Metodo para crear clientes
  createCliente = async (form) => {
    return await axios.post(
      url + "crear",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

  };


  //Metodo para verificar la existencia de un cliente
  verifyClient = async (id) => {
    try {
      const response = await axios.post(
        url + "clientes/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response
    } catch { }
  }
  //Metodo para actualizar clientes
  updateCliente = async (form) => {
    try {
      const response = await axios.put(
        url + "clientes",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch { }
  };

  // Metodo para eliminar clientes
  deleteCliente = async (form) => {
    try {
      return await axios.delete(url + "clientes/eliminar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          nitCliente: form.nitCliente,
          digito: form.digito
        }
      });
    } catch (error) {
      console.log('Ha ocurrido un error');
    }
  };


  CreateAgenda = async (form) => {
    await axios.post(
      url + "agenda/", form, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    }

    ).then((response) => {
      return response
    }).catch((error) => {
      return error
    })


  }

  getProyeccionDir = async (id, mes, anio) => {
    const response = await axios.post(
      url + "proyecciondir/" + id,
      { mes: mes, anio: anio },
      {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      }
    );
    return response


  }

  CreateProyeccion = async (form) => {
    form.id_director = profile.ID_Director;
    const response = await axios.post(
      url + "proyecciondir", form, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    }
    );
    return response;

  }
  DeleteProyeccion = async (form) => {

    try {

      await axios.delete(
        url + "Director/Proyeccion", form, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      }

      );
    }
    catch {

    }
  }
  UpdateProyeccion = async (form) => {

    try {

      await axios.put(
        url + "Director/Proyeccion", form, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      }

      );
    }
    catch {

    }
  }
  listAgenda = async (id) => {
    try {
      const response = await axios.get(
        url + "agenda/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response.data;
    } catch (error) {

    }
  }

  deleteAgenda = async (id) => {
    try {
      await axios.delete(
        url + "agenda/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
    } catch { }
  }



  GetServicios = async () => {
    try {
      const response = await axios.get(url + "servicios/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  }


  CreateVenta = async (form) => {

    const response = await axios.post(url + "ventas/", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }

  ObtenerIdCotizacion = async (form) => {
    const response = await axios.get(url + "cotizacion/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.idCot
  }

  UpdateVenta = async (form, id) => {
    const response = await axios.put(url + "ventas/" + id, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  updateAgenda = async (id, form) => {

    const response = await axios.put(url + "agenda/" + id, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  updateAgendaDetalle = async (id, form) => {
    await axios.put(url + "agenda-detalle/" + id, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
  }

  logOutRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      const profile = JSON.parse(localStorage.getItem('profile'));

      await axios.post(`${url}logout-log/${profile.ID_User}`,
        { userName: profile.Nombre },  // Enviamos el nombre del perfil
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error al registrar logout:', error);
    }
  }

  ListVentasByCliente = async (nitCliente, digito) => {
    try {
      if (nitCliente != null || digito != null) {
        const response = await axios.get(url + `ventas/ventas-by-cliente/${nitCliente}/${digito}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    } catch (error) {
      return [];
    }
  };



  ListServiciosByCliente = async (id) => {
    try {
      if (id.length > 15) {
        return [];
      }

      const response = await axios.get(url + "servicios/servicios-by-cliente/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    catch (error) {
      return [];
    }
  }


  DeleteServicioCliente = async (form) => {
    try {
      await axios.post(url + "delete-servicios-by-cliente", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: "application/json"
        },
      });
    } catch (error) {
      return [];
    }
  }
  CreateServicioCliente = async (form) => {
    try {
      const response = await axios.post(url + "serviciosbycliente/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return [];
    }
  }

  GetTotalProyeccion = async (id) => {


    const response = await axios.get(url + "totalproyeccion/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response

  }


}

export default new Conexion();