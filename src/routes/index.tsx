import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Pokemons from '../pages/Pokemons';
import SearchPokemon from '../pages/SearchPokemon';
import Signup from '../pages/Signup';
import PrivateRoute from './privateRoute';

function Routes() {
    return (
        <BrowserRouter>
            <PrivateRoute path="/pesquisarPokemon" component={SearchPokemon} />
            <PrivateRoute path="/pokemons" component={Pokemons} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/signup" component={Signup}/>
        </BrowserRouter>
    );
};

export default Routes;