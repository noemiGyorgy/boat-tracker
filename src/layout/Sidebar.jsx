import React, { useState, useContext } from "react";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";

function Sidebar(props) {
  const context = useContext(TrackContext);
  const [buttonValue, setButtonValue] = useState(
    props.stopped ? "START RECORDING" : "STOP RECORDING"
  );

  const changeStatus = () => {
    axios
      .put(process.env.REACT_APP_SERVER + "/status", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.stopped);
        setButtonValue(
          response.data.stopped ? "START RECORDING" : "STOP RECORDING"
        );
      });
  };

  return (
    <div id="sidebar" className="container">
      <div className="tracks">
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

      <button
        id="stop"
        type="button"
        className="btn btn-outline-info p-4 pl-5 pr-5 mt-5"
        onClick={changeStatus}
      >
        {buttonValue}
      </button>
    </div>
  );
}

export default Sidebar;
