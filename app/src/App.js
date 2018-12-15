import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import store from "./state";
import Landing from "./layouts/landing/Landing"
import Dashboard from './layouts/dashboard/Dashboard';


function App(props) {
  console.log(store.getState().auth.authenticated)
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/signin" component={Landing}/>
          <Route exact path="/signup" component={Landing}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
