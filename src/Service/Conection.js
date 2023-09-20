import axios from "axios";

class Connetion {
  createCliente = async (form) => {
    try {
      const response = await axios.post(
        "http://193.198.1.166:5052/" + "api/Cliente",
        form
      );
    } catch {}
  };
}
