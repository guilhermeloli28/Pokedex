import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../hooks/auth/AuthContext';

interface PrivateRouteProps extends RouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !!user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default PrivateRoute;