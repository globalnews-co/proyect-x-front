import axios from "axios";

const url = "http://localhost:5000/api/";
const token = localStorage.getItem("token");

class Conexion {
  //Metodo para loguearse
  login = async (form) => {
    console.log("form", form);
    try {
      const response = await axios.post(url + "auth/login", form);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };


  createCliente = async (form) => {
    try {
      const response = await axios.post(
        "http://193.198.1.166:5052/" + "api/Cliente",
        form
      );
    } catch { }
  };

  //Metodo para obtener los clientes
  getClientes = async () => {
    try {
      const response = await axios.get(
        url + "Cliente"  , {
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
  getClienteById = async (id) => {
    try {
      const response = await axios.get(
        url + "Cliente/" + id, {
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


  completeProfile = async (form) => {
    try {
      const response = await axios.post(url + "auth/registerDirector",
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
    try{
      const response = await axios.get(
        url + "Director/get-directors", {
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
    try {
      const response = await axios.post(
        url + "Cliente",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch { }
  };
  //Metodo para actualizar clientes
  updateCliente = async (form) => {
    try {
      const response = await axios.put(
        url + "Cliente",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch { }
  };
}
export default new Conexion();