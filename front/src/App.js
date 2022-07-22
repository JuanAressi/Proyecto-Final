import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import AdminUsuarios from './pages/Admin/Usuarios/Usuarios';

function App() {
	return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/panel-admin' element={<Admin />} />
                <Route path='/panel-admin/usuarios' element={<AdminUsuarios />} />
            </Routes>
        </Router>
	);
}

export default App;
