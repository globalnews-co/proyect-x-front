import { Agenda } from "./Componets/Agenda";
import { AgendaIndex } from "./Componets/AgendaIndex";
import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
import ClientesPage from "./Componets/Clientes/Page";
import Inicio from "./Componets/inicio";
import  Proyeccion  from "./Componets/ProyeccionDirectores/Proyeccion";
import AddProfile from "./Componets/Statics/AddProfile";

function App() {
  const getidDir = localStorage.getItem("IDdirector");
  console.log(typeof getidDir);
  return (
    <div>
    <Router>
        <Routes>
         <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormClientes />} />
          <Route path="/angendaindex" element={<AgendaIndex />} />
          <Route path="/Clientes" element={<ClientesPage />} /> 
          <Route path="/fd" element={<Inicio/>} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/Proyeccion" element={<Proyeccion />} />
          {getidDir === 'null' ? <Route path="/addProfile" element={<AddProfile/>} /> : null}
          <Route path="/addProfile" element={<AddProfile/>} /> 
       
        </Routes> 
      </Router>
    </div>
  );
}

export default App;


