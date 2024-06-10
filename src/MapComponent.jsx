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