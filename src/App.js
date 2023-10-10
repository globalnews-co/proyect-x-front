import { Agenda } from "./Componets/Agenda";
import AgendaIndex from "./Componets/AgendaIndex"; // Corregir aquí
import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
import ListClientes  from "./Componets/ListClientes";
import Inicio from "./Componets/inicio";
import Navbar from "./Componets/Statics/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormClientes />} />
          <Route path="/Clientes" element={<ListClientes />} /> 
          <Route path="/fd" element={<Inicio />} />
         <Route path="/agenda" element={<Agenda />} />
          <Route path="/AgendaIndex" element={<AgendaIndex />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;

