import * as React from "react";
import L from "leaflet";
import cytoscape, { Core } from "cytoscape";
import "./utils/styles.css";
import "./leaflet.css";
import "./leaf.css";
import { generateGraph } from "./utils/utils";
// @ts-ignore
import leaflet from 'cytoscape-leaf';

// let leaflet = require("cytoscape-leaf");
cytoscape.use(leaflet); // register extension

export default function App() {
  const cyRef = React.useRef<HTMLDivElement>(null);
  const cyLeafletRef = React.useRef<HTMLDivElement>(null);
  const [elements, setElements] = React.useState(() => generateGraph(6));
  const [mapLeaf, setMapLeaf] = React.useState<any>(undefined);

  // const reload = () => {
  //   mapLeaf?.off();
  //   mapLeaf?.remove();
  //   // setElements(generateGraph(6))
  // }

  React.useEffect(() => {
    const config = {
      container: cyRef.current, // container.current,
      // the data field for latitude
      // latitude: "lat",
      // // the data field for longitude
      // longitude: "lng",

      style: [
        {
          selector: "node",
          style: { content: "data(label)" },
        },
        // {
        //   selector: "edge",
        //   style: { content: "data(id)" },
        // },
      ],
      elements: elements
      // [
      //   { data: { id: "n1", lat: 45.0703, lng: 7.6869 } },
      //   { data: { id: "n2", lat: 41.9028, lng: 12.4964 } },
      //   { data: { id: "e1", source: "n1", target: "n2" } },
      // ],
    };

    var cy = cytoscape(config);
    cy.autoungrabify(true);

    // cytoscape leaflet
    // const leaf = (cy as any).leaflet({
    //   container: cyLeafletRef.current,
    // });
    // // console.log(leaf.map)
    // // setMapLeaf(leaf.map);

    // var cartodbAttribution =
    //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

    // L.tileLayer(
    //   "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    //   {
    //     attribution: cartodbAttribution,
    //   }
    // ).addTo(leaf.map);
  });

  return (
    <div>
      {/* <button onClick={reload}>Reload</button> */}
      <div
        id="cy-leaflet"
        ref={cyLeafletRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 0,
        }}
      />
      <div
        id="cy"
        ref={cyRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      
    </div>
  );
}
