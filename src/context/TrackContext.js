import React, { createContext, useState } from "react";

export const TrackContext = createContext();

export const TrackProvider = (props) => {
  const [tracks, setTracks] = useState([]);

  return (
    <TrackContext.Provider value={{ tracks, setTracks }}>
      {props.children}
    </TrackContext.Provider>
  );
};
