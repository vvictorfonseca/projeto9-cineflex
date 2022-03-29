import reactDom from "react-dom";
import React from "react"
import App from "./Componentes/App";

import "./css/reset.css";
import "./css/style.css";

reactDom.render(<App />, document.querySelector(".root"))