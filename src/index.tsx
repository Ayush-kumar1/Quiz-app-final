import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CategoryProvider } from "./CategoryContext";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import Mediator from "./Mediator";

ReactDOM.render(
  <React.StrictMode>
    <Mediator />
  </React.StrictMode>,
  document.getElementById("root")
);
