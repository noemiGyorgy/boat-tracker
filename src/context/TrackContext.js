import React, { createContext, useState } from "react";

export const TrackContext = createContext();

export const TrackProvider = (props) => {
  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState({});

  return (
    <TrackContext.Provider value={{ tracks, setTracks, details, setDetails }}>
      {props.children}
    </TrackContext.Provider>
  );
};
