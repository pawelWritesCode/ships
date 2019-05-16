import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import '../../styles.css';

import 'react-notifications/lib/notifications.css';

import { PrivateRoute }  from '../../components/PrivateRoute/PrivateRoute';
import Dashboard from '../../components/Dashboard';
import Authentication from "../Authentication";

const App = (props) => {

    return (
        <div>
            <NotificationContainer/>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route exact path="/authentication" component={Authentication} />
                </Switch>
            </Router>
        </div>
    );

}

export default App;
