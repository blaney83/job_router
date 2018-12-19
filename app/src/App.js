import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { persistor, store} from "./state";
import Landing from "./layouts/landing/Landing"
import Dashboard from './layouts/dashboard/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#696969',
    },
    secondary: {
      main: '#e77316',
    },
  },
});
// febd6c
function App(props) {
  console.log(store.getState().auth.authenticated)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default App;
