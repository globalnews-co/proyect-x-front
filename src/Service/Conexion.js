import axios from "axios";

const url = "http://localhost:5000/api/";


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
}
export default new Conexion();