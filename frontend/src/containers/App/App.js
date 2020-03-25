import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { appState } from "../../helpers/states";
import { NotificationContainer } from 'react-notifications';
import '../../styles.css';

import 'react-notifications/lib/notifications.css';

import { PrivateRoute }  from '../../components/PrivateRoute/PrivateRoute';
import Dashboard from '../Dashboard';
import Authentication from "../Authentication";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
        )
    }
}

export default App;
