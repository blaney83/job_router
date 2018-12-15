import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./state";
import Landing from "./layouts/landings"

function App(props) {
  console.log(props)
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/:landing?" component={Landing}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
