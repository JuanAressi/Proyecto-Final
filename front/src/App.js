import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index          from './pages/Index/Index';
import Login          from './pages/Login/Login';
import Register       from './pages/Register/Register';
import Admin          from './pages/Admin/Admin';
import MedicoAgenda   from './pages/Admin/Agenda/Agenda';
import AdminPacientes from './pages/Admin/Pacientes/Pacientes';
import AdminMedicos   from './pages/Admin/Medicos/Medicos';
import AdminTurnos    from './pages/Admin/Turnos/Turnos';
import Turnos         from './pages/Turnos/Turnos';

// Modulo de usuario.
import Usuario from './pages/Usuario/Usuario';
import MisTurnos from './pages/Usuario/MisTurnos';
import DatosPersonales from './pages/Usuario/DatosPersonales';

// UserContext.
import { UserProvider } from './context/UserContext';


function App() {
	return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/* Modulo de admin */}
                    <Route path='/panel-admin' element={<Admin />} />
                    <Route path='/panel-admin/agenda' element={<MedicoAgenda />} />
                    <Route path='/panel-admin/pacientes' element={<AdminPacientes />} />
                    <Route path='/panel-admin/medicos' element={<AdminMedicos />} />
                    <Route path='/panel-admin/turnos' element={<AdminTurnos />} />

                    {/* Modulo de usuario */}
                    <Route path='/panel-usuario' element={<Usuario />} />
                    <Route path='/panel-usuario/mis-turnos' element={<MisTurnos />} />
                    <Route path='/panel-usuario/datos-personales' element={<DatosPersonales />} />

                    <Route path='/turnos' element={<Turnos />} />
                </Routes>
            </Router>
        </UserProvider>
	);
}

export default App;
