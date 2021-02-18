import "./App.css";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import MapView from "./layout/MapView";

function App() {
  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });
    socket.on("connection", (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div className="App">
      <div className="nav">Tracks</div>
      <MapView />
    </div>
  );
}

export default App;
