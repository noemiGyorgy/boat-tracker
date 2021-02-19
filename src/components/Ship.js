import { Style, RegularShape, Fill, Stroke } from "ol/style";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const triangle = new Style({
  image: new RegularShape({
    fill: new Fill({ color: "red" }),
    stroke: new Stroke({ color: "black", width: 2 }),
    points: 3,
    radius: 10,
    angle: 0,
  }),
});

export function ship(coordinates, heading) {
  const triangle = new Style({
    image: new RegularShape({
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({ color: "black", width: 2 }),
      points: 3,
      radius: 10,
      rotation: heading,
      angle: 0,
    }),
  });

  let newFeature = new Feature(new Point(coordinates));
  newFeature.setStyle(triangle);

  return new VectorLayer({
    source: new VectorSource({
      features: [newFeature],
    }),
  });
}
