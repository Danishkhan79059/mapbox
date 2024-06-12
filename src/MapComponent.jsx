import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapComp = () => {
  const mapContainerRef = useRef(null);
  const popup = new mapboxgl.Popup();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
      center: [78.9629, 23.5937],
      zoom: 4,
    });

    map.on("load", () => {
      fetch("./stateData.geojson")
        .then((response) => response.json())
        .then((data) => {
          console.log("GeoJSON Data Loaded:", data); 

          map.addSource("states", {
            type: "geojson",
            data: data,
          });

          map.addLayer({
            id: "states-layer",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["==", ["get", "NAME_1"], "Assam"],
                "#0000FF", // Blue color
                "#b0b0b0",
              ],
              "fill-opacity": 0.8,
            },
          });

          map.on("mouseenter", "states-layer", () => {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", "states-layer", () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });
        })
        .catch((error) => {
          console.error("Error loading GeoJSON data: ", error);
        });
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
  );
};

export default MapComp;

























// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// import 'mapbox-gl/dist/mapbox-gl.css';

// const MapComponent = () => {
//     useEffect(() => {
//         mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';
//         const map = new mapboxgl.Map({
//             container: 'map', // container ID
//             style: 'mapbox://styles/mapbox/satellite-streets-v12',
//             // style:"mapbox://styles/khandanish/clvvz9op2022v01qrgqyg439m" ,// style URL
//             center: [77.2090, 28.6139], // starting position [lng, lat]
//             zoom: 9 // starting zoom
//         });

//         map.addControl(
//             new MapboxGeocoder({
//                 accessToken: mapboxgl.accessToken,
//                 mapboxgl: mapboxgl
//             })
//         );

//         const layerList = document.getElementById('menu');
//         const inputs = layerList.getElementsByTagName('input');

//         const handleLayerClick = (layer) => {
//             const layerId = layer.target.id;
//             map.setStyle('mapbox://styles/mapbox/' + layerId);
//         };

//         for (const input of inputs) {
//             input.addEventListener('click', handleLayerClick);
//         }

//         return () => {
//             for (const input of inputs) {
//                 input.removeEventListener('click', handleLayerClick);
//             }
//         };
//     }, []);

//     return (
//         <div>
//             <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
//             <div id="menu" style={{ position: 'absolute', background: '#efefef', padding: '10px', fontFamily: 'Open Sans, sans-serif' }}>
//                 <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite" defaultChecked />
//                 <label htmlFor="satellite-streets-v12">satellite streets</label>
//                 <input id="light-v11" type="radio" name="rtoggle" value="light" />
//                 <label htmlFor="light-v11">light</label>
//                 <input id="dark-v11" type="radio" name="rtoggle" value="dark" />
//                 <label htmlFor="dark-v11">dark</label>
//                 <input id="streets-v12" type="radio" name="rtoggle" value="streets" />
//                 <label htmlFor="streets-v12">streets</label>
//                 <input id="outdoors-v12" type="radio" name="rtoggle" value="outdoors" />
//                 <label htmlFor="outdoors-v12">outdoors</label>
                
//             </div>
//         </div>
//     );
// };

// export default MapComponent;




// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
// } from "mapbox-gl";
// import Papa from "papaparse";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     map.addControl(new FullscreenControl(), "top-left");
//     map.addControl(
//       new GeolocateControl({
//         positionOptions: { enableHighAccuracy: true },
//         trackUserLocation: true,
//       })
//     );
//     map.addControl(
//       new NavigationControl({
//         showCompass: true,
//         showZoom: true,
//         visualizePitch: true,
//       }),
//       "top-left"
//     );
//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     const loadCSV = async (url) => {
//       return new Promise((resolve, reject) => {
//         Papa.parse(url, {
//           download: true,
//           header: true,
//           complete: (results) => {
//             resolve(results.data);
//           },
//           error: (error) => {
//             reject(error);
//           },
//         });
//       });
//     };

//     const styleStates = async () => {
//       try {
//         const csvData = await loadCSV("./stateData.csv");
//         console.log("CSV Data:", csvData);
//         const stateColors = {};

//         csvData.forEach((row) => {
//           stateColors[row.state] = row.color;
//         });

//         map.on("load", () => {
//           map.getStyle().layers.forEach((layer) => {
//             if (
//               layer.type === "fill" &&
//               layer["source-layer"] === "boundaries_admin_2"
//             ) {
//               map.setPaintProperty(layer.id, "fill-color", [
//                 "match",
//                 ["get", "name"],
//                 ...Object.entries(stateColors).flat(),
//                 "red",
//               ]);
//             }
//           });
//         });
//       } catch (error) {
//         console.error("Error loading CSV:", error);
//       }
//     };

//     styleStates();

//     return () => map.remove();
//   }, []);

//   return (
//     <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//   );
// };

// export default MapComp;








// colro chagne in map 
import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
//   Popup,
// } from "mapbox-gl"; //Ensure Mapbox CSS is imported

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     const fullscreenControl = new FullscreenControl();
//     map.addControl(fullscreenControl, "top-left");

//     const geolocateControl = new GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//     });
//     map.addControl(geolocateControl);

//     const navigationControl = new NavigationControl({
//       showCompass: true,
//       showZoom: true,
//       visualizePitch: true,
//     });
//     map.addControl(navigationControl, "top-left");

//     map.on("load", () => {
//       map.addSource("places", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.setFog({});

//       fetch("./india_state_geo.json")
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           map.addSource("states", {
//             type: "geojson",
//             data: data,
//           });

//           map.addLayer({
//             id: "states-layer",
//             type: "fill",
//             source: "states",
//             layout: {},
//             paint: {
//               "fill-color": [
//                 "case",
//                 ["==", ["get", "NAME_1"], "Gujarat"],
//                 "red",
//                 ["==", ["get", "NAME_1"], "Haryana"],
//                 "green",
//                 ["==", ["get", "NAME_1"], "Delhi"],
//                 "#fcba03",
//                 ["==", ["get", "NAME_1"], "Goa"],
//                 "#727551",
//                 ["==", ["get", "NAME_1"], "Himachal Pradesh"],
//                 "#87e689",
//                 ["==", ["get", "NAME_1"], "Jammu and Kashmir"],
//                 "#27a9ba",
//                 ["==", ["get", "NAME_1"], "Jharkhand"],
//                 "#4e527a",
//                 ["==", ["get", "NAME_1"], "Karnataka"],
//                 "#6f3799",
//                 ["==", ["get", "NAME_1"], "Kerala"],
//                 "#91475d",
//                 ["==", ["get", "NAME_1"], "Madhya Pradesh"],
//                 "#787777",
//                 ["==", ["get", "NAME_1"], "Maharashtra"],
//                 "#e6b0a5",
//                 ["==", ["get", "NAME_1"], "Manipur"],
//                 "#9e9b4d",
//                 ["==", ["get", "NAME_1"], "Meghalaya"],
//                 "#5f8754",
//                 ["==", ["get", "NAME_1"], "Mizoram"],
//                 "#d5edce",
//                 ["==", ["get", "NAME_1"], "Nagaland"],
//                 "#bcf5ea",
//                 ["==", ["get", "NAME_1"], "Orissa"],
//                 "#5fa4ad",
//                 ["==", ["get", "NAME_1"], "Puducherry"],
//                 "#4e7091",
//                 ["==", ["get", "NAME_1"], "Punjab"],
//                 "#5d74c7",
//                 ["==", ["get", "NAME_1"], "Rajasthan"],
//                 "#887ff0",
//                 ["==", ["get", "NAME_1"], "Sikkim"],
//                 "#775aa3",
//                 ["==", ["get", "NAME_1"], "Tamil Nadu"],
//                 "#a754b8",
//                 ["==", ["get", "NAME_1"], "Tripura"],
//                 "#782c6f",
//                 ["==", ["get", "NAME_1"], "Uttar Pradesh"],
//                 "#233136",
//                 ["==", ["get", "NAME_1"], "Uttaranchal"],
//                 "#7c848f",
//                 ["==", ["get", "NAME_1"], "West Bengal"],
//                 "#730b18",
//                 ["==", ["get", "NAME_1"], "Andaman and Nicobar"],
//                 "#733c0b",

//                 ["==", ["get", "NAME_1"], "Andhra Pradesh"],
//                 "#544104",

//                 ["==", ["get", "NAME_1"], "Arunachal Pradesh"],
//                 "#6f7d06",

//                 ["==", ["get", "NAME_1"], "Assam"],
//                 "#2a7a0c",

//                 ["==", ["get", "NAME_1"], "Bihar"],
//                 "#3f5438",

//                 ["==", ["get", "NAME_1"], "Chandigarh"],
//                 "#41baa8",

//                 ["==", ["get", "NAME_1"], "Chhattisgarh"],
//                 "#2b5d8f",

//                 ["==", ["get", "NAME_1"], "Dadra and Nagar Haveli"],
//                 "#311d52",

//                 ["==", ["get", "NAME_1"], "Daman and Diu"],
//                 "#250726",

//                 "white",
//               ],
//               "fill-opacity": 0.9,
//             },
//           });

//           map.on("mouseenter", "states-layer", (e) => {
//             map.getCanvas().style.cursor = "pointer";
//             const stateName = e.features[0].properties.NAME_1;
//             popup
//               .setLngLat(e.lngLat)
//               .setHTML(stateName)
//               .addTo(map);
//           });

//           map.on("mouseleave", "states-layer", () => {
//             map.getCanvas().style.cursor = "";
//             popup.remove();
//           });
//         })
//         .catch((error) => console.error("Error fetching GeoJSON:", error));
//     });

//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     return () => map.remove();
//   }, []);

//   return (
//     <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//   );
// };

// export default MapComp;







// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
//   Popup,
// } from "mapbox-gl"; //Ensure Mapbox CSS is imported

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();

//   useEffect(() => {
//     // mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';
//     // mapboxgl.accessToken ="pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA"
//     // mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA'
//     // mapboxgl.accessToken =
//     //   "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";
//     mapboxgl.accessToken ="pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA"
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       // style: 'mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex',
//       // style:"mapbox://styles/khandanish/clvozjo4n01ny01occ05g786u",
//       // style:"mapbox://styles/khandanish/clv8evsmw00nq01qz4d18hizk",
//       // style: "mapbox://styles/khandanish/clvp21vrm01l201qre4ghasqx",
//       style:"mapbox://styles/khandanish/clvvz9op2022v01qrgqyg439m",
//       // style: 'mapbox://styles/mapbox/satellite-streets-v12',
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     const fullscreenControl = new FullscreenControl();
//     map.addControl(fullscreenControl, "top-left");

//     const geolocateControl = new GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//     });
//     map.addControl(geolocateControl);

//     const navigationControl = new NavigationControl({
//       showCompass: true,
//       showZoom: true,
//       visualizePitch: true,
//     });
//     map.addControl(navigationControl, "top-left");

//     map.on("load", () => {
//       map.addSource("places", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   " <p><strong>viztaLab company softwere company </strong>.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [-77.038659, 38.931567],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [-77.003168, 38.894651],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [-77.052477, 38.943951],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [92.8196, 12.2261],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [94.7278, 27.1004],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [92.9376, 26.2006],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [85.3131, 25.0961],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [76.7794, 30.7333],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [81.8661, 21.2787],
//               },
//             },

//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [81.8661, 21.2787],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.1025, 28.7041],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [76.5762, 33.7782],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [85.2799, 23.6102],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>softwere company .</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [75.7139, 15.3173],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in Rajasthan.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [74.2179, 27.0238], // Rajasthan (Jaipur coordinates used)
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in Noida Sector 16.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.3151, 28.5733], // Noida Sector 16
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in Gurgaon.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.0266, 28.4595], // Gurgaon
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in Faridabad.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.3163, 28.4089], // Faridabad
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in Greater Noida.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.536, 28.4744], // Greater Noida
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [77.2295, 28.6139], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [75.8577, 22.7196], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [75.8648, 25.2138], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [79.9865, 23.1815], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [79.9222, 24.8318], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [80.3319, 26.4499], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [78.0028, 27.1767], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",

//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [82.9755, 25.3176], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [82.9755, 25.3176], // New Delhi
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [81.1034, 17.0458],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [83.1907, 17.0458],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [83.1907, 17.0458],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [83.1907, 15.6917],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   "<strong>viztaLab company</strong><p>Software company in New Delhi.</p>",
//                 placeToVisit: "New Delhi",
//                 whomToVisit: "ViztaLab office",
//                 checkInDate: "2024-04-15",
//                 checkOutDate: "2024-04-20",
//                 reasonToVisit: "Business meetings and project discussions",
//               },
//               geometry: {
//                 type: "Point",
//                 coordinates: [81.1034, 15.6917],
//               },
//             },
//             // Add more features here...
//           ],
//         },
//       });

//       map.setFog({});

//       map.addSource("states", {
//         type: "geojson",
//         data: "public/indianStates2.geojson",
//       });

//       map.addLayer({
//         id: "places",
//         type: "circle",
//         source: "places",
//         paint: {
//           "circle-color": " blue",
//           "circle-radius": 4,
//           "circle-stroke-width": 4,
//           "circle-stroke-color": "blue",
//           "fill-color": [
//             "match",
//             ["get", "STATE_NAME"],
//             "Andhra Pradesh",
//             "red",
//             "Karnataka",
//             "blue",
//             "Maharashtra",
//             "green",
//             "default-color",
//           ],

//         },
//       });

//       map.on("mouseenter", "places", (e) => {
//         map.getCanvas().style.cursor = "pointer";
//         const coordinates = e.features[0].geometry.coordinates.slice();
//         const description = e.features[0].properties.description;
//         popup.setLngLat(coordinates).setHTML(description).addTo(map);
//       });

//       map.on("mouseleave", "places", () => {
//         map.getCanvas().style.cursor = "";
//         popup.remove();
//       });
//     });
//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     return () => map.remove(); // Clean up on unmount
//   }, []);

//   return (
//     <>
//       <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//     </>
//   );
// };

// export default MapComp;






// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new mapboxgl.Popup();

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     map.on("load", () => {
//       fetch("./stateData.geojson")
//         .then((response) => response.json())
//         .then((data) => {
//           map.addSource("states", {
//             type: "geojson",
//             data: data,
//           });

//           map.addLayer({
//             id: "states-layer",
//             type: "fill",
//             source: "states",
//             layout: {},
//             paint: {
//               "fill-color": [
//                 "case",
//                 ["==", ["get", "state"], "Bihar"],
//                 "red",

//                 "gray",
//               ],
//               "fill-opacity": 0.5,
//             },
//           });

//           map.on("mouseleave", "states-layer", () => {
//             map.getCanvas().style.cursor = "";
//             popup.remove();
//           });
//         })
//         .catch((error) => {
//           console.error("Error loading GeoJSON data: ", error);
//         });
//     });

//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     return () => {
//       map.remove();
//     };
//   }, []);

//   return (
//     <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//   );
// };

// export default MapComp;
















// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
//   Popup,
// } from "mapbox-gl";

// const stateColors = {
//   "Andaman and Nicobar Islands": "#FF0000",
//   "Andhra Pradesh": "#00FF00",
//   "Arunachal Pradesh": "#0000FF",
//   "Assam": "#FFFF00",
//   "Bihar": "#00FFFF",
//   "Chandigarh": "#FF00FF",
//   "Chhattisgarh": "#800000",
//   "Dadra and Nagar Haveli and Daman and Diu": "#008000",
//   "Goa": "#808000",
//   "Gujarat": "#FFA500",
//   "Haryana": "#FFD700",
//   "Himachal Pradesh": "#008080",
//   "Jammu and Kashmir": "#800080",
//   "Jharkhand": "#000080",
//   "Karnataka": "#008080",
//   "Kerala": "#800000",
//   "Ladakh": "#008000",
//   "Lakshadweep": "#808000",
//   "Madhya Pradesh": "#FFA500",
//   "Maharashtra": "#FFD700",
//   "Manipur": "#800080",
//   "Meghalaya": "#000080",
//   "Mizoram": "#008080",
//   "Nagaland": "#800000",
//   "Odisha": "#808000",
//   "Puducherry": "#FFA500",
//   "Punjab": "#FFD700",
//   "Rajasthan": "#800080",
//   "Sikkim": "#000080",
//   "Tamil Nadu": "#008080",
//   "Telangana": "#800000",
//   "Tripura": "#808000",
//   "Uttar Pradesh": "#FFA500",
//   "Uttarakhand": "#FFD700",
//   "West Bengal": "#800080",
//   "Delhi": "#FCBA03",
// };

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     const fullscreenControl = new FullscreenControl();
//     map.addControl(fullscreenControl, "top-left");

//     const geolocateControl = new GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//     });
//     map.addControl(geolocateControl);

//     const navigationControl = new NavigationControl({
//       showCompass: true,
//       showZoom: true,
//       visualizePitch: true,
//     });
//     map.addControl(navigationControl, "top-left");

//     map.on("load", () => {
//       map.addSource("places", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.setFog({});

//       fetch("./india_state_geo.json")
//         .then((response) => response.json())
//         .then((data) => {
//           // Update GeoJSON properties based on stateColors object
//           data.features.forEach((feature) => {
//             const stateName = feature.properties.NAME_1;
//             feature.properties.fillColor = stateColors[stateName] || "white"; // Default color
//           });

//           // Add GeoJSON data as a source and layer to the map
//           map.addSource("states", {
//             type: "geojson",
//             data: data,
//           });

//           map.addLayer({
//             id: "states-layer",
//             type: "fill",
//             source: "states",
//             layout: {},
//             paint: {
//               "fill-color": ["get", "fillColor"],
//               "fill-opacity": 1,
//             },
//           });

//           // Add mouse events as before
//         })
//         .catch((error) => console.error("Error fetching GeoJSON:", error));
//     });

//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     return () => map.remove();
//   }, []);

//   return (
//     <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//   );
// };

// export default MapComp;

//specifti dsitct color 3

// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
//   Popup,
// } from "mapbox-gl";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();

//   useEffect(() => {
//     mapboxgl.accessToken = "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     map.addControl(new FullscreenControl(), "top-left");
//     map.addControl(
//       new GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//       })
//     );
//     map.addControl(new NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "top-left");

//     map.on("load", () => {
//       map.addSource("places", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.setFog({});

//       fetch("./indiandistrict.geojson")
//         .then((response) => response.json())
//         .then((data) => {
//           map.addSource("districts", {
//             type: "geojson",
//             data,
//           });

//           map.addLayer({
//             id: "districts-layer",
//             type: "fill",
//             source: "districts",
//             layout: {},
//             paint: {
//               "fill-color": [
//                 "match",
//                 ["get", "NAME_2"],
//                 // Add specific colors for each district in Uttar Pradesh
//                 "Agra", "#e6194b",
//                 "Aligarh", "#3cb44b",
//                 "Allahabad", "#ffe119",
//                 "Ambedkar Nagar", "#4363d8",
//                 "Amethi", "#f58231",
//                 "Amroha", "#911eb4",
//                 "Auraiya", "#46f0f0",
//                 "Azamgarh", "#f032e6",
//                 "Baghpat", "#bcf60c",
//                 "Bahraich", "#fabebe",
//                 "Ballia", "#008080",
//                 "Balrampur", "#e6beff",
//                 "Banda", "#9a6324",
//                 "Barabanki", "#fffac8",
//                 "Bareilly", "#800000",
//                 "Basti", "#aaffc3",
//                 "Bhadohi", "#808000",
//                 "Bijnor", "#ffd8b1",
//                 "Budaun", "#000075",
//                 "Bulandshahr", "#808080",
//                 "Chandauli", "#e6194b",
//                 "Chitrakoot", "#3cb44b",
//                 "Deoria", "#ffe119",
//                 "Etah", "#4363d8",
//                 "Etawah", "#f58231",
//                 "Ayodhya", "#911eb4",
//                 "Farrukhabad", "#46f0f0",
//                 "Fatehpur", "#f032e6",
//                 "Firozabad", "#bcf60c",
//                 "Gautam Buddh Nagar", "#fabebe",
//                 "Ghaziabad", "#008080",
//                 "Ghazipur", "black",
//                 "Gonda", "#9a6324",
//                 "Gorakhpur", "#fffac8",
//                 "Hamirpur", "#800000",
//                 "Hapur", "#aaffc3",
//                 "Hardoi", "#808000",
//                 "Hathras", "#ffd8b1",
//                 "Jalaun", "#000075",
//                 "Jaunpur", "#808080",
//                 "Jhansi", "#e6194b",
//                 "Kannauj", "#3cb44b",
//                 "Kanpur Dehat", "#ffe119",
//                 "Kanpur Nagar", "#4363d8",
//                 "Kasganj", "#f58231",
//                 "Kaushambi", "#911eb4",
//                 "Kushinagar", "#46f0f0",
//                 "Lakhimpur Kheri", "#f032e6",
//                 "Lalitpur", "#bcf60c",
//                 "Lucknow", "#fabebe",
//                 "Maharajganj", "#008080",
//                 "Mahoba", "#e6beff",
//                 "Mainpuri", "#9a6324",
//                 "Mathura", "#fffac8",
//                 "Mau", "#800000",
//                 "Meerut", "#aaffc3",
//                 "Mirzapur", "#808000",
//                 "Moradabad", "#ffd8b1",
//                 "Muzaffarnagar", "#000075",
//                 "Pilibhit", "#808080",
//                 "Pratapgarh", "#e6194b",
//                 "Raebareli", "#3cb44b",
//                 "Rampur", "#ffe119",
//                 "Saharanpur", "#4363d8",
//                 "Sambhal", "#f58231",
//                 "Sant Kabir Nagar", "#911eb4",
//                 "Shahjahanpur", "#46f0f0",
//                 "Shamli", "#f032e6",
//                 "Shrawasti", "#bcf60c",
//                 "Siddharthnagar", "#fabebe",
//                 "Sitapur", "#008080",
//                 "Sonbhadra", "#e6beff",
//                 "Sultanpur", "#9a6324",
//                 "Unnao", "#fffac8",
//                 "Varanasi", "#800000",
//                 "Araria", "#4363d8",
//                 "Arwal", "#f58231",
//                 "Aurangabad", "#911eb4",
//                 "Banka", "#46f0f0",
//                 "Begusarai", "#f032e6",
//                 "Bhagalpur", "#bcf60c",
//                 "Bhojpur", "#fabebe",
//                 "Buxar", "#008080",
//                 "Darbhanga", "#e6beff",
//                 "East Champaran", "#9a6324",
//                 "Gaya", "#fffac8",
//                 "Gopalganj", "#800000",
//                 "Jamui", "#aaffc3",
//                 "Jehanabad", "#808000",
//                 "Kaimur", "#ffd8b1",
//                 "Katihar", "#000075",
//                 "Khagaria", "#808080",
//                 "Kishanganj", "#e6194b",
//                 "Lakhisarai", "#3cb44b",
//                 "Madhepura", "#ffe119",
//                 "Madhubani", "#4363d8",
//                 "Munger", "#f58231",
//                 "Muzaffarpur", "#911eb4",
//                 "Nalanda", "#46f0f0",
//                 "Nawada", "#f032e6",
//                 "Patna", "#bcf60c",
//                 "Purnia", "#fabebe",
//                 "Rohtas", "#008080",
//                 "Saharsa", "#e6beff",
//                 "Samastipur", "#9a6324",
//                 "Saran", "#fffac8",
//                 "Sheikhpura", "#800000",
//                 "Sheohar", "#aaffc3",
//                 "Sitamarhi", "#808000",
//                 "Siwan", "#ffd8b1",
//                 "Supaul", "#000075",
//                 "Vaishali", "#808080",
//                 "West Champaran", "#e6194b",
//                 "Ahmedabad", "#e6194b",
//                 "Amreli", "#3cb44b",
//                 "Anand", "#ffe119",
//                 "Aravalli", "#4363d8",
//                 "Banaskantha", "#f58231",
//                 "Bharuch", "#911eb4",
//                 "Bhavnagar", "#46f0f0",
//                 "Botad", "#f032e6",
//                 "Chhota Udaipur", "#bcf60c",
//                 "Dahod", "#fabebe",
//                 "Dang", "#008080",
//                 "Devbhoomi Dwarka", "#e6beff",
//                 "Gandhinagar", "#9a6324",
//                 "Gir Somnath", "#fffac8",
//                 "Jamnagar", "#800000",
//                 "Junagadh", "#aaffc3",
//                 "Kheda", "#808000",
//                 "Kutch", "#ffd8b1",
//                 "Mahisagar", "#000075",
//                 "Mehsana", "#808080",
//                 "Morbi", "#e6194b",
//                 "Narmada", "#3cb44b",
//                 "Navsari", "#ffe119",
//                 "Panchmahal", "#4363d8",
//                 "Patan", "#f58231",
//                 "Porbandar", "#911eb4",
//                 "Rajkot", "#46f0f0",
//                 "Sabarkantha", "#f032e6",
//                 "Surat", "#bcf60c",
//                 "Surendranagar", "#fabebe",
//                 "Tapi", "#008080",
//                 "Vadodara", "#e6beff",
//                 "Valsad", "#9a6324",
//                 "Baksa", "#e6194b",
//                 "Barpeta", "#3cb44b",
//                 "Biswanath", "#ffe119",
//                 "Bongaigaon", "#4363d8",
//                 "Cachar", "#f58231",
//                 "Charaideo", "#911eb4",
//                 "Chirang", "#46f0f0",
//                 "Darrang", "#f032e6",
//                 "Dhemaji", "#bcf60c",
//                 "Dhubri", "#fabebe",
//                 "Dibrugarh", "#008080",
//                 "Dima Hasao", "#e6beff",
//                 "Goalpara", "#9a6324",
//                 "Golaghat", "#fffac8",
//                 "Hailakandi", "#800000",
//                 "Hojai", "#aaffc3",
//                 "Jorhat", "#808000",
//                 "Kamrup", "#ffd8b1",
//                 "Kamrup Metropolitan", "#000075",
//                 "Karbi Anglong", "#808080",
//                 "Karimganj", "#e6194b",
//                 "Kokrajhar", "#3cb44b",
//                 "Lakhimpur", "#ffe119",
//                 "Majuli", "#4363d8",
//                 "Morigaon", "#f58231",
//                 "Nagaon", "#911eb4",
//                 "Nalbari", "#46f0f0",
//                 "Sivasagar", "#f032e6",
//                 "Sonitpur", "#bcf60c",
//                 "South Salmara-Mankachar", "#fabebe",
//                 "Tinsukia", "#008080",
//                 "Udalguri", "#e6beff",
//                 "West Karbi Anglong", "#9a6324",
//                 "Bengaluru Urban", "#e6194b",
//                 "Bengaluru Rural", "#3cb44b",
//                 // Add more districts and colors as needed for Uttar Pradesh
//                 // Default color
//                 "#aaaaaa",
//               ],
//               "fill-opacity": 0.8,
//             },
//           });

//           map.on("mouseenter", "districts-layer", (e) => {
//             map.getCanvas().style.cursor = "pointer";
//             const districtName = e.features[0].properties.NAME_2;
//             popup.setLngLat(e.lngLat).setHTML(districtName).addTo(map);
//           });

//           map.on("mouseleave", "districts-layer", () => {
//             map.getCanvas().style.cursor = "";
//             popup.remove();
//           });
//         })
//         .catch((error) => console.error("Error fetching GeoJSON:", error));
//     });

//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl,
//       })
//     );

//     return () => map.remove();
//   }, []);

//   return <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />;
// };

// export default MapComp;

//generate the random color of each state and map it to single
// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import { FullscreenControl, GeolocateControl, NavigationControl, Popup } from "mapbox-gl";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();

//   // Function to generate a random color
//   const generateRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   useEffect(() => {
//     mapboxgl.accessToken = "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     const fullscreenControl = new FullscreenControl();
//     map.addControl(fullscreenControl, "top-left");

//     const geolocateControl = new GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//     });
//     map.addControl(geolocateControl);

//     const navigationControl = new NavigationControl({
//       showCompass: true,
//       showZoom: true,
//       visualizePitch: true,
//     });
//     map.addControl(navigationControl, "top-left");

//     map.on("load", () => {
//       map.addSource("places", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.setFog({});

//       fetch("./india_state_geo.json")
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           map.addSource("states", {
//             type: "geojson",
//             data: data,
//           });

//           // Generate a unique color for each state
//           const stateColors = {};
//           data.features.forEach(feature => {
//             const stateName = feature.properties.NAME_1;
//             stateColors[stateName] = generateRandomColor();
//           });

//           map.addLayer({
//             id: "states-layer",
//             type: "fill",
//             source: "states",
//             layout: {},
//             paint: {
//               "fill-color": [
//                 "match",
//                 ["get", "NAME_1"],
//                 ...Object.entries(stateColors).flat(),
//                 "white" // default color if no match
//               ],
//               "fill-opacity": 1,
//             },
//           });

//           map.on("mouseenter", "states-layer", (e) => {
//             map.getCanvas().style.cursor = "pointer";
//             const stateName = e.features[0].properties.NAME_1;
//             popup.setLngLat(e.lngLat).setHTML(stateName).addTo(map);
//           });

//           map.on("mouseleave", "states-layer", () => {
//             map.getCanvas().style.cursor = "";
//             popup.remove();
//           });
//         })
//         .catch((error) => console.error("Error fetching GeoJSON:", error));
//     });

//     map.addControl(
//       new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       })
//     );

//     return () => map.remove();
//   }, []);

//   return (
//     <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
//   );
// };

// export default MapComp;

// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import { FullscreenControl, GeolocateControl, NavigationControl } from "mapbox-gl";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
//       center: [78.9629, 23.5937],
//       zoom: 4,
//     });

//     map.addControl(new FullscreenControl(), "top-left");
//     map.addControl(new GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));
//     map.addControl(new NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "top-left");
//     map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }));

//     const fetchData = async () => {
//       try {
//         const response = await fetch("./stateData.geojson");
//         const data = await response.json();

//         console.log("Fetched Data:", data); // Data ko console mein print karna

//         map.on("load", () => {
//           map.addSource("states", {
//             type: "geojson",
//             data: data
//           });

//           map.addLayer({
//             id: "states-layer",
//             type: "fill",
//             source: "states",
//             paint: {
//               "fill-color": [
//                 "case",
//                 ["==", ["get", "NAME_1"], "Andaman and Nicobar"], "yellow",
//                 "red" // Default color for other states
//               ],
//               "fill-opacity": 0.7
//             }
//           });
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();

//     return () => map.remove();
//   }, []);

//   return <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />;
// };

// export default MapComp;
