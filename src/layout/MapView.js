import React, { useRef, useEffect, useState, useContext } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import { Style, Stroke } from "ol/style";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { LineString } from "ol/geom";
import { TrackContext } from "../context/TrackContext";
import { ship } from "../components/Ship";

const stoppedStyle = [
  new Style({
    stroke: new Stroke({
      color: "#ff0000",
      width: 2,
    }),
  }),
];

const recordingStyle = [
  new Style({
    stroke: new Stroke({
      color: "#000000",
      width: 2,
    }),
  }),
];

function MapView(props) {
  const context = useContext(TrackContext);
  let pos = [...props.positions];
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  const move = (positions, setMap) => {
    let lastIndex = positions.length - 1;
    let coordOld = fromLonLat([
      positions[lastIndex - 1].lon,
      positions[lastIndex - 1].lat,
    ]);
    let coordNew = fromLonLat([
      positions[lastIndex].lon,
      positions[lastIndex].lat,
    ]);

    let lineStr = new LineString([coordOld, coordNew]);
    let newFeature = new Feature({
      geometry: lineStr,
      name: "Line",
    });
    newFeature.setStyle(
      positions[lastIndex].stopped ? stoppedStyle : recordingStyle
    );

    let newFeatures = context.features;
    if (newFeatures[props.start] === undefined) {
      newFeatures[props.start] = [];
    }
    newFeatures[props.start].push(newFeature);
    context.setFeatures(newFeatures);

    let line = new Vector({
      source: new VectorSource({
        features: context.features[props.start],
      }),
    });
    map.addLayer(line);
    map.getLayers().forEach((layer) => {
      if (layer && layer.get("name") === "ship") {
        map.removeLayer(layer);
      }
    });
    map.addLayer(ship(coordNew, positions[lastIndex].heading));

    map.getView().fit(lineStr, { padding: [170, 50, 30, 150], maxZoom: 17 });
  };

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      controls: [],
    });
    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (pos.length && pos.length > 1 && map !== undefined) {
      move(pos, setMap);
    }
  }, [pos, setMap]);

  return <div ref={mapElement} className="map-container"></div>;
}

export default MapView;
