import React, { useContext, useState } from "react";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";

function ListItem(props) {
  const context = useContext(TrackContext);
  const [activeItem, setActiveItem] = useState("");

  const handleClick = () => {
    if (context.details[props.trackId] !== undefined) {
      let newDetails = context.details;
      newDetails[props.trackId].visible = !newDetails[props.trackId].visible;
      context.setDetails(newDetails);
      setActiveItem(
        context.details[props.trackId].visible ? "bg-info text-white" : ""
      );
    } else {
      axios
        .get(process.env.REACT_APP_SERVER + "/track/" + props.trackId, {
          withCredentials: true,
        })
        .then((response) => {
          let newDetails = context.details;
          newDetails[props.trackId] = { track: response.data, visible: true };
          context.setDetails(newDetails);
          setActiveItem("bg-info");
        });
    }
  };

  return (
    <React.Fragment>
      <a
        href="#!"
        key={props.trackId}
        className={`list-group-item list-group-item-action ${activeItem}`}
        onClick={handleClick}
      >
        {new Date(props.start).toLocaleString()}
      </a>
    </React.Fragment>
  );
}

export default ListItem;
