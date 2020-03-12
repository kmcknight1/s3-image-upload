import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Homepage from "./components/Homepage";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
