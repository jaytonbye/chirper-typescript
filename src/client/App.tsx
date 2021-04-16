import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Compose from "./pages/Compose";

const App = (props: AppProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/compose">
          <Compose />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

interface AppProps {}

export default App;
