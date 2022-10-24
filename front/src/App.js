import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import AdminPacientes from './pages/Admin/Pacientes/Pacientes';
import AdminMedicos from './pages/Admin/Medicos/Medicos';


function App() {
	return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/panel-admin' element={<Admin />} />
                <Route path='/panel-admin/medicos' element={<AdminMedicos />} />                
            </Routes>
        </Router>
	);
}

export default App;
