import "./App.css";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MapView from "./layout/MapView";

function App() {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });
    socket.on("connection", (message) => {
      console.log(message);
    });
    socket.on("position", (message) => {
      console.log(message);
      let newPositions = positions;
      newPositions.push(message);
      setPositions(newPositions);
    });
    socket.on("endOfTrack", (message) => {
      console.log(message);
    });
  }, [setPositions]);

  return (
    <div className="App">
      <div className="nav">Tracks</div>
      <MapView key={positions.length} positions={positions} />
    </div>
  );
}

export default App;
