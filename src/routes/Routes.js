import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Pages
import Home from '../pages/Home/Home';
import Settings from '../pages/Settings/Settings';

export default function routes(props) {
    const { user } = props;
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route>
                <h1>Artists</h1>
            </Route>
            <Route path='/settings' exact>
                <Settings user={user} />
            </Route>
        </Switch>
    );
}
