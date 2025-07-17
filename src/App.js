import Agenda from "./Componets/Agenda/Agenda";
import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
import ClientesPage from "./Componets/Clientes/Page";
import Home from "./Componets/Home/Home";
import AddProfile from "./Componets/Statics/AddProfile";
import Servandsec from "./Componets/Adminsas/Servandsec";
import Conexion from "./Service/Conexion";
import { useEffect, useState } from "react";
import NotFound from "./Componets/Statics/NotFound";
import Navbar from "./Componets/Statics/Navbar";

function App() {
  const getidDir = JSON.parse(localStorage.getItem("profile")) || {};
  let token = '';
  let [pass, setPass] = useState(null); // Estado para gestionar el token
  let [loading, setLoading] = useState(true); // Estado para gestionar la carga

  useEffect(() => {
    async function checkToken() {
      try {
        token = localStorage.getItem("token");
        const verify = await Conexion.verifyToken();
        setPass(verify);
      } catch (error) {
        console.log("No se encontró el token");
        setPass(false);
      } finally {
        setLoading(false); // Cambiar el estado de carga después de la comprobación
      }
    }

    checkToken();
  }, []);

  // Mientras se realiza la comprobación del token, mostrar una página de carga
  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <div>
      <Router>



        {
          pass ? 
          <div>
            <Navbar/>
            <Routes>

              <Route path="/" element={<Home/>} />
              <Route path="/form" element={<FormClientes/>} />
              <Route path="/agenda" element={<Agenda/>} />
              <Route path="/Clientes" element={<ClientesPage/>} />
              {Object.keys(getidDir).length === 0    ?  <Route path="/addProfile" element={<AddProfile/>} /> : null}
              <Route path="/adminsection" element={<Servandsec/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
            :
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="*" element={<Login/>} />
            </Routes>
            
        }



      </Router>
    </div>
  );
}

export default App;


