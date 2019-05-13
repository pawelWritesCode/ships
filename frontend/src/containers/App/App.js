import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { PrivateRoute }  from '../../components/PrivateRoute/PrivateRoute';
import Authentication from "../Authentication";

function App() {
  return (
      <div>
          <Router>
              <Switch>
                  <Route exact path="/" component={Authentication} />
              </Switch>
          </Router>
      </div>
  );
}

export default App;
