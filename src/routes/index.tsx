import { Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Route from './Route';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
// import Consulta from '../pages/Consulta';
// import TipoExame from '../pages/TipoExame';
import Home from '../pages/home';
// import Instituicoes from '../pages/instituicoes';
// import ListaTipoExames from '../pages/listaTipoExames';


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" exact component={ Login } />
            <Route path="/cadastro" exact component={ Cadastro } />
            <Route path="/" exact component={ Home } isPrivate />
            {/*<Route path="/consultas" exact component={ Consulta } isPrivate />
            <Route path="/tipoExames" exact component={ TipoExame } isPrivate />
            <Route path="/instituicoes" exact component={ Instituicoes } isPrivate />
            <Route path="/listaTipoExames" exact component={ ListaTipoExames } isPrivate />*/}
            <Redirect to="/" /> 
        </Switch>
    )
}

export default Routes;