import axios from "axios";

class Conexion {
  createCliente = async (form) => {
    try {
      const response = await axios.post(
        "http://193.198.1.166:5052/" + "api/Cliente",
        form
      );
    } catch {}
  };
}
export default new Conexion();