import { React } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ rol }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.rol === rol) {
        return <Outlet />;
    } else {
        return <Navigate to='/acceso-no-autorizado' />;
    }
}

export default PrivateRoute;