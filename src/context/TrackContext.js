import React, { createContext, useState } from "react";

export const TrackContext = createContext();

export const TrackProvider = (props) => {
  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState({});
  const [currentTrack, setCurrentTrack] = useState(0);
  const [features, setFeatures] = useState({});
  const [recordedPositions, setRecordedPositions] = useState([]);

  return (
    <TrackContext.Provider
      value={{
        tracks,
        setTracks,
        details,
        setDetails,
        currentTrack,
        setCurrentTrack,
        features,
        setFeatures,
        recordedPositions,
        setRecordedPositions,
      }}
    >
      {props.children}
    </TrackContext.Provider>
  );
};
