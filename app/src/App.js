import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from "./state";
import Landing from "./layouts/landing/Landing"
import Dashboard from './layouts/dashboard/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});


function App(props) {
  console.log(store.getState().auth.authenticated)
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Landing} />
            <Route exact path="/signup" component={Landing} />
            <Route path="/dashboard/:params?" component={Dashboard} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App;
