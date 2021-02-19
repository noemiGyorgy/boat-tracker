import React, { useRef, useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Style, Stroke } from "ol/style";
import Feature from "ol/Feature";
import { LineString } from "ol/geom";
//import { ship } from "../components/Ship";

const recordingStyle = [
  new Style({
    stroke: new Stroke({
      color: "#000000",
      width: 2,
    }),
  }),
];

function MapView(props) {
  const [map, setMap] = useState();
  const view = new View({
    center: [0, 0],
    zoom: 1,
  });
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  console.log(props.positions);
  console.log("Bne");

  const move = () => {
    console.log(props.positions);

    let lastIndex = props.positions.length - 1;
    let coordOld = fromLonLat(
      props.positions[lastIndex - 1].lon,
      props.positions[lastIndex - 1].lat
    );
    let coordNew = fromLonLat(
      props.positions[lastIndex].lon,
      props.positions[lastIndex].lat
    );

    let lineStr = new LineString([coordOld, coordNew]);

    let line = new Vector({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: lineStr,
            name: "Line",
          }),
        ],
      }),
    });

    line.setStyle(recordingStyle);
    map.addLayer(line);
    //map.addLayer(ship(coordinates, heading));
    let newView = map
      .getView()
      .fit(lineStr, { padding: [170, 50, 30, 150], maxZoom: 17 });
    map.setView(newView);
  };

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
    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (
      props.positions.length &&
      props.positions.length > 1 &&
      map !== undefined
    ) {
      move();
    }
  }, [props.positions]);

  return <div ref={mapElement} className="map-container"></div>;
}

export default MapView;
