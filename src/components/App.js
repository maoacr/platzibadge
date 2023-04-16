import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import BadgeDetailsContainer from '../pages/BadgeDetailsContainer';
import NotFound from '../pages/NotFound';
import BadgeEdit from '../pages/BadgeEdit';

/*Se puede hacer con función cuando no haya ningún otro método declarado o que no usemos estado*/
/* switch Toma la dirección que está en el navegador y renderiza solamente una ruta, la primera que coincida con esa dirección*/
/* exact dice que la ruta tiene que ser exacta, de lo contrario BadgeNew coinde con Badges */
function App(){
    return(
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>    
                    <Route exact path="/badges" component={Badges}/>
                    <Route exact path="/badges/new" component={BadgeNew}/>
                    <Route exact path='/badges/:badgeId' component={BadgeDetailsContainer}/>
                    <Route exact path="/badges/:badgeId/edit" component={BadgeEdit}/>
                    <Route path="/404" component={NotFound}/>
                    <Redirect from="*" to="/404"/>
                </Switch>
            </Layout> 
        </BrowserRouter>
    )
}

export default App;
