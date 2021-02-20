import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import MapView from "./layout/MapView";
import Sidebar from "./layout/Sidebar.jsx";
import { TrackContext } from "./context/TrackContext";

function App() {
  const context = useContext(TrackContext);
  const [stopped, setStopped] = useState(false);
  const [positions, setPositions] = useState([]);
  const [mapView, setMapView] = useState(<MapView positions={positions} />);

  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });
    socket.on("connection", (tracks) => {
      console.log("Connected to the server.");
      context.setTracks(tracks);
    });
    socket.on("position", (message) => {
      console.log(message);
      setStopped(message.stopped);
      let newPositions = positions;
      newPositions.push(message);
      setPositions(newPositions);
      setMapView(<MapView positions={positions} />);
    });
    socket.on("endOfTrack", (tracks) => {
      context.setTracks(tracks);
    });
  }, [setPositions, setStopped, context.setTracks]);

  return (
    <div className="App">
      <div id="content">{mapView}</div>
      <Sidebar stopped={stopped} />
    </div>
  );
}

export default App;
