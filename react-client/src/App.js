import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
    </div>
  );
}

export default App;
