import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import AdminPacientes from './pages/Admin/Pacientes/Pacientes';
import AdminMedicos from './pages/Admin/Medicos/Medicos';
import AdminTurnos from './pages/Admin/Turnos/Turnos';


function App() {
	return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/panel-admin' element={<Admin />} />
                <Route path='/panel-admin/pacientes' element={<AdminPacientes />} />                
                <Route path='/panel-admin/medicos' element={<AdminMedicos />} />                
                <Route path='/panel-admin/turnos' element={<AdminTurnos />} />                
            </Routes>
        </Router>
	);
}

export default App;
