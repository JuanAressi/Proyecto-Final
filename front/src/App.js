import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import MedicoAgenda from './pages/Admin/Agenda/Agenda';
import AdminPacientes from './pages/Admin/Pacientes/Pacientes';
import AdminMedicos from './pages/Admin/Medicos/Medicos';
import AdminTurnos from './pages/Admin/Turnos/Turnos';
import Turnos from './pages/Turnos/Turnos';


function App() {
	return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/panel-admin' element={<Admin />} />
                <Route path='/panel-admin/agenda' element={<MedicoAgenda />} />
                <Route path='/panel-admin/pacientes' element={<AdminPacientes />} />
                <Route path='/panel-admin/medicos' element={<AdminMedicos />} />
                <Route path='/panel-admin/turnos' element={<AdminTurnos />} />
                <Route path='/turnos' element={<Turnos />} />
            </Routes>
        </Router>
	);
}

export default App;
