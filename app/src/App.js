import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./state";
// import Signin from "./components/Signin/Signin";
// import Signup from './components/Signup/Signup';
import Landing from "./layouts/landings"

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/:landing" component={Landing}/>
          {/* <Route exact path="/signup" component={Signup}/> */}
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
