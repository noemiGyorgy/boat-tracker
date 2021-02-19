import "./App.css";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MapView from "./layout/MapView";
import Sidebar from "./layout/Sidebar";

function App() {
  const [stopped, setStopped] = useState(false);
  const [positions, setPositions] = useState([]);
  const [mapView, setMapView] = useState(<MapView positions={positions} />);

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
      let newPositions = positions;
      newPositions.push(message);
      setPositions(newPositions);
      setMapView(<MapView positions={positions} />);
    });
    socket.on("endOfTrack", (message) => {
      console.log(message);
    });
  }, [setPositions, setStopped]);

  return (
    <div className="App">
      <div id="content">{mapView}</div>
      <Sidebar stopped={stopped} />
    </div>
  );
}

export default App;
