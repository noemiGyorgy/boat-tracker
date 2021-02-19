import React from "react";
import axios from "axios";

function Sidebar({ stopped }) {
  const changeStatus = (event) => {
    axios
      .put(process.env.REACT_APP_SERVER + "/status", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        event.target.value(
          response.data.stopped ? "START RECORDING" : "STOP RECORDING"
        );
      });
  };
  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <h3 className="text-info">Tracks</h3>
      </div>
      <button type="button" onClick={(e) => changeStatus(e)}>
        {stopped ? "START RECORDING" : "STOP RECORDING"}
      </button>
    </div>
  );
}

export default Sidebar;
