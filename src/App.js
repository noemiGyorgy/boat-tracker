import "./App.css";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MapView from "./layout/MapView";
import Sidebar from "./layout/Sidebar";

function App() {
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });
    socket.on("connection", (message) => {
      console.log(message);
    });
    socket.on("position", (message) => {
      console.log(message);
      setStopped(message.stopped);
    });
    socket.on("endOfTrack", (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div className="App">
      <div id="content">
        <MapView />
      </div>
      <Sidebar stopped={stopped} />
    </div>
  );
}

export default App;
