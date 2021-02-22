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
    let live = 0;
    socket.on("connection", (tracks) => {
      console.log("Connected to the server.");
      context.setTracks(tracks);
    });
    socket.on("position", (message) => {
      setStopped(message.stopped);
      let newPositions = positions;
      newPositions.push(message);
      setPositions(newPositions);
      live = message.start;
      if (context.currentTrack === 0) {
        context.setCurrentTrack(live);
      }

      setMapView(<MapView positions={positions} start={live} />);
    });
    socket.on("endOfTrack", (tracks) => {
      context.setTracks(tracks);
      alert("The journey is over.");
    });
  }, [setPositions, setStopped, context.setTracks, context.features]);

  useEffect(() => {
    if (
      context.currentTrack !== 0 &&
      context.details[context.currentTrack] !== undefined
    ) {
      context.details[context.currentTrack].track.forEach((pos, i) =>
        setTimeout(() => {
          let newRecordedPositions = context.recordedPositions;
          newRecordedPositions.push(pos);
          context.setRecordedPositions(newRecordedPositions);
          setMapView(
            <MapView
              positions={context.recordedPositions}
              start={context.currentTrack}
            />
          );
        }, 10 * i)
      );
    }
  }, [context.setRecordedPositions, context.currentTrack]);

  return (
    <div className="App">
      <div id="content">{mapView}</div>
      <Sidebar stopped={stopped} />
    </div>
  );
}

export default App;
