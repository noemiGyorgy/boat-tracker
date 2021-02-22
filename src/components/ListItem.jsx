import React, { useContext, useState } from "react";
import axios from "axios";
import { TrackContext } from "../context/TrackContext";

function ListItem(props) {
  const context = useContext(TrackContext);
  const [activeItem, setActiveItem] = useState("");

  const handleClick = () => {
    context.setRecordedPositions([]);
    let newFeatures = context.features;
    delete newFeatures[props.start];
    context.setFeatures(newFeatures);

    if (context.details[props.start] !== undefined) {
      let newDetails = context.details;
      newDetails[props.start].visible = !newDetails[props.start].visible;
      context.setDetails(newDetails);
      setActiveItem(
        context.details[props.start].visible ? "text-white bg-info" : ""
      );
      if (context.details[props.start].visible) {
        context.setCurrentTrack(props.start);
      } else {
        context.setCurrentTrack(0);
      }
    } else {
      axios
        .get(process.env.REACT_APP_SERVER + "/track/" + props.trackId, {
          withCredentials: true,
        })
        .then((response) => {
          let newDetails = context.details;
          newDetails[props.start] = { track: response.data, visible: true };
          context.setDetails(newDetails);
          setActiveItem("text-white bg-info");
          context.setCurrentTrack(props.start);
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
        <span className="text-danger">{props.live ? "⦿ " : ""}</span>
        {new Date(props.start).toLocaleString()}
      </a>
    </React.Fragment>
  );
}

export default ListItem;
