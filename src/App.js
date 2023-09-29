import { Agenda } from "./Componets/Agenda";
import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
import ListClientes  from "./Componets/ListClientes";
import Inicio from "./Componets/inicio";


function App() {
  return (
    <div>
    <Router>
        <Routes>
         <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormClientes />} />
         <Route path="/Clientes" element={<ListClientes />} /> 
          <Route path="/fd" element={<Inicio/>} />
          <Route path="/agenda" element={<Agenda />} />

        </Routes> 
      </Router>
    </div>
  );
}

export default App;


