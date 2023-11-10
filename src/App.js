import { Agenda } from "./Componets/Agenda";
import Sector from "./Componets/Sector.js";
import SectorIndex from "./Componets/SectorIndex";
import AgendaIndex from "./Componets/AgendaIndex";
import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
import ListClientes from "./Componets/ListClientes";
import Inicio from "./Componets/inicio";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormClientes />} />
          <Route path="/Clientes" element={<ListClientes />} />
          <Route path="/fd" element={<Inicio />} />
          <Route path="/sector" element={<Sector />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/SectorIndex" element={<SectorIndex />} />
          <Route path="/AgendaIndex" element={<AgendaIndex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
