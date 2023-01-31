import { React, useEffect, useState } from 'react';

const withAuth = (allowedRoles) => (Component) => {
    return function WithAuth(props) {
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState(false);
        const [newLocation, setNewLocation] = useState(null);

        const user = JSON.parse(localStorage.getItem('user'));

        useEffect(() => {
            // Check if the user is found.
            if (user !== null) {
                // Check if has the required role.
                if (allowedRoles.includes(user.rol)) {
                    setIsAuthorized(true);
                } else {
                    // Check if the component is 'Login' or 'Register'.
                    if (Component.name === 'Login' || Component.name === 'Register') {
                        // Redirect to the 'Index' page.
                        setNewLocation('/');
                    } else {
                        // Redirect to the 'Unauthorized' page.
                        setNewLocation('/acceso-no-autorizado')
                    }
                }
            } else {
                // Allow access to the 'Login' and 'Register' pages.
                if (Component.name === 'Login' || Component.name === 'Register') {
                    setIsAuthorized(true);
                }
            }

            setIsLoading(false);
        }, []);


        if (!isLoading) {    
            if (!isAuthorized) {
                window.location.href = newLocation;
            } else {
                return <Component {...props} />;
            }
        }
    };
};

export default withAuth;
