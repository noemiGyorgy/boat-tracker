import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TrackProvider } from "./context/TrackContext";

ReactDOM.render(
  <React.StrictMode>
    <TrackProvider>
      <App />
    </TrackProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
