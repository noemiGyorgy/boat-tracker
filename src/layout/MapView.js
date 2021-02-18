import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

function MapView() {
  const view = new View({
    center: [0, 0],
    zoom: 1,
  });
  const mapElement = useRef();

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: view,
      controls: [],
    });
  }, []);

  return <div ref={mapElement} className="map-container"></div>;
}

export default MapView;
