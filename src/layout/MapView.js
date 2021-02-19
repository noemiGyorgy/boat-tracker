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

function MapView() {
  const [map, setMap] = useState();
  const view = new View({
    center: [0, 0],
    zoom: 1,
  });
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  const positions = [
    [20.73990023, 48.21496414],
    [20.73991757, 48.21490818],
  ];

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
    if (positions.length && map !== undefined) {
      let posOld = fromLonLat(positions[0]);
      let posNew = fromLonLat(positions[1]);

      let recordingStyle = [
        new Style({
          stroke: new Stroke({
            color: "#d12710",
            width: 2,
          }),
        }),
      ];
      let lineStr = new LineString([posOld, posNew]);

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
      map.getView().fit(lineStr, { padding: [170, 50, 30, 150], maxZoom: 17 });
    }
  }, [positions]);

  return <div ref={mapElement} className="map-container"></div>;
}

export default MapView;
