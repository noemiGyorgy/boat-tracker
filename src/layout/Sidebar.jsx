import React, { useState, useContext } from "react";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";
import ListItem from "../components/ListItem";

function Sidebar(props) {
  const context = useContext(TrackContext);
  const [buttonValue, setButtonValue] = useState(
    props.stopped ? "START RECORDING" : "STOP RECORDING"
  );

  let tracks = "No recorded tracks";

  if (context.tracks && context.tracks.length > 0) {
    tracks = context.tracks.map((track) => (
      <ListItem key={track.id} trackId={track.id} start={track.start} />
    ));
  }

  const changeStatus = () => {
    axios
      .put(process.env.REACT_APP_SERVER + "/status", {
        withCredentials: true,
      })
      .then((response) => {
        setButtonValue(
          response.data.stopped ? "START RECORDING" : "STOP RECORDING"
        );
      });
  };

  return (
    <div
      id="sidebar"
      className="container d-flex flex-column justify-content-between"
    >
      <div>
        <h2 className="text-info">Tracks</h2>
        <a
          href={process.env.REACT_APP_UPLOAD}
          target="_self"
          rel="noopener noreferrer"
          className="text-secondary"
        >
          <span>UPLOAD NEW FILE</span>
        </a>
      </div>

      <div className="tracks list-group mt-5 mb-5">{tracks}</div>

      <div>
        <button
          id="stop"
          type="button"
          className="btn btn-outline-info p-4 pl-5 pr-5"
          onClick={changeStatus}
        >
          {buttonValue}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
