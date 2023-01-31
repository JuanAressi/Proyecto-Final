// Utilities.
import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components.
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Pages.
import Index          from './pages/Index/Index';
import Login          from './pages/Login/Login';
import Register       from './pages/Register/Register';
import Admin          from './pages/Admin/Admin';
import MedicoAgenda   from './pages/Admin/Agenda/Agenda';
import AdminPacientes from './pages/Admin/Pacientes/Pacientes';
import AdminMedicos   from './pages/Admin/Medicos/Medicos';
import AdminTurnos    from './pages/Admin/Turnos/Turnos';
import AdminReportes  from './pages/Admin/Reportes/Reportes';
import Turnos         from './pages/Turnos/Turnos';

// Modulo de paciente.
import Usuario         from './pages/Usuario/Usuario';
import MisTurnos       from './pages/Usuario/MisTurnos';
import DatosPersonales from './pages/Usuario/DatosPersonales';


// Render the App.
function App() {
	return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/turnos' element={<Turnos />} />

                {/* Modulo de paciente */}
                <Route path='/panel-usuario' element={<ProtectedRoute rol='paciente' />}>
                    <Route path='/panel-usuario' element={<Usuario />} />
                </Route>

                <Route path='/panel-usuario/mis-turnos' element={<ProtectedRoute rol='paciente' />}>
                    <Route path='/panel-usuario/mis-turnos' element={<MisTurnos />} />
                </Route>

                <Route path='/panel-usuario/datos-personales' element={<ProtectedRoute rol='paciente' />}>
                    <Route path='/panel-usuario/datos-personales' element={<DatosPersonales />} />
                </Route>


                {/* Modulo de medico */}
                <Route path='/panel-medico' element={<ProtectedRoute rol='medico' />}>
                    <Route path='/panel-medico' element={<Admin />} />
                </Route>

                <Route path='/panel-medico/agenda' element={<ProtectedRoute rol='medico' />}>
                    <Route path='/panel-medico/agenda' element={<MedicoAgenda />} />
                </Route>

                <Route path='/panel-medico/pacientes' element={<ProtectedRoute rol='medico' />}>
                    <Route path='/panel-medico/pacientes' element={<AdminPacientes />} />
                </Route>

                <Route path='/panel-medico/turnos' element={<ProtectedRoute rol='medico' />}>                    
                    <Route path='/panel-medico/turnos' element={<AdminTurnos />} />
                </Route>


                {/* Modulo de admin */}
                <Route path='/panel-admin' element={<ProtectedRoute rol='admin' />}>
                    <Route path='/panel-admin' element={<Admin />} />
                </Route>

                <Route path='/panel-admin/pacientes' element={<ProtectedRoute rol='admin' />}>
                    <Route path='/panel-admin/pacientes' element={<AdminPacientes />} />
                </Route>

                <Route path='/panel-admin/medicos' element={<ProtectedRoute rol='admin' />}>
                    <Route path='/panel-admin/medicos' element={<AdminMedicos />} />
                </Route>

                <Route path='/panel-admin/turnos' element={<ProtectedRoute rol='admin' />}>                    
                    <Route path='/panel-admin/turnos' element={<AdminTurnos />} />
                </Route>

                <Route path='/panel-admin/reportes' element={<ProtectedRoute rol='admin' />}>                    
                    <Route path='/panel-admin/reportes' element={<AdminReportes />} />
                </Route>
            </Routes>
        </Router>
	);
}

export default App;
