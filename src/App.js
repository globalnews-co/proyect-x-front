import FormClientes from "./Componets/FormClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Statics/Login";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormClientes />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
