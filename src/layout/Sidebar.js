import React, { useState } from "react";
import axios from "axios";

function Sidebar({ stopped }) {
  const [buttonValue, setButtonValue] = useState(
    stopped ? "START RECORDING" : "STOP RECORDING"
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
      <div className="sidebar-header">
        <h3 className="text-info">Tracks</h3>
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
