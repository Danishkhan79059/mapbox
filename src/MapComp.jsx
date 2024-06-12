import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "mapbox-gl";

const statesList = [
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Orissa",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttaranchal",
  "West Bengal",
  "Delhi",
];

const MapComp = () => {
  const mapContainerRef = useRef(null);
  const popup = new Popup();
  const [selectedState, setSelectedState] = useState("");
  const [color, setColor] = useState("");
  const [stateColors, setStateColors] = useState({});

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
      center: [78.9629, 23.5937],
      zoom: 4,
    });

    const fullscreenControl = new FullscreenControl();
    map.addControl(fullscreenControl, "top-left");

    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocateControl);

    const navigationControl = new NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    });
    map.addControl(navigationControl, "top-left");

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.setFog({});

      fetch("./india_state_geo.json")
        .then((response) => response.json())
        .then((data) => {
          data.features.forEach((feature) => {
            const stateName = feature.properties.NAME_1;
            feature.properties.fillColor = stateColors[stateName] || "white"; // Default color
          });

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
              "fill-color": ["get", "fillColor"],
              "fill-opacity": 1,
            },
          });
        })
        .catch((error) => console.error("Error fetching GeoJSON:", error));
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    return () => map.remove();
  }, [stateColors]); // Include stateColors in dependencies

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    if (selectedState && e.target.value) {
      const updatedStateColors = { ...stateColors, [selectedState]: e.target.value };
      setStateColors(updatedStateColors);

      const map = mapContainerRef.current;
      const layerId = "states-layer";

      map.setPaintProperty(layerId, "fill-color", [
        "case",
        ["==", ["get", "NAME_1"], selectedState],
        e.target.value,
        ["get", "fillColor"],
      ]);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        ref={mapContainerRef}
        style={{
          height: "90vh",
          width: "70%",
          marginBottom: "20px",
          border: "5px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <select
          value={selectedState}
          onChange={handleStateChange}
          style={{ marginRight: "20px", padding: "5px", borderRadius: "5px" }}
        >
          <option value="">Select a State</option>
          {statesList.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default MapComp;



// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// import {
//   FullscreenControl,
//   GeolocateControl,
//   NavigationControl,
//   Popup,
// } from "mapbox-gl";

// const statesList = [
//   "Andaman and Nicobar",
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chandigarh",
//   "Chhattisgarh",
//   "Dadra and Nagar Haveli",
//   "Daman and Diu",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jammu and Kashmir",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Ladakh",
//   "Lakshadweep",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Orissa",
//   "Puducherry",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttaranchal",
//   "West Bengal",
//   "Delhi",
// ];

// const MapComp = () => {
//   const mapContainerRef = useRef(null);
//   const popup = new Popup();
//   const [selectedState, setSelectedState] = useState("");
//   const [color, setColor] = useState("");
//   const [stateColors, setStateColors] = useState({}); // State to store colors for each state

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
//           data.features.forEach((feature) => {
//             const stateName = feature.properties.NAME_1;
//             feature.properties.fillColor = stateColors[stateName] || "white"; // Default color
//           });

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
//   }, [stateColors]); // Include stateColors in dependencies

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//   };

//   const handleColorChange = (e) => {
//     setColor(e.target.value);
//   };

//   const applyColor = () => {
//     if (selectedState && color) {
//       const updatedStateColors = { ...stateColors, [selectedState]: color };
//       setStateColors(updatedStateColors);

//       const map = mapContainerRef.current;
//       const layerId = "states-layer";

//       map.setPaintProperty(layerId, "fill-color", [
//         "case",
//         ["==", ["get", "NAME_1"], selectedState],
//         color,
//         ["get", "fillColor"],
//       ]);
//     }
//   };

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div
//         ref={mapContainerRef}
//         style={{
//           height: "90vh",
//           width: "70%",
//           marginBottom: "20px",
//           border: "5px solid #ccc",
//           borderRadius: "5px",
//         }}
//       />
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <select
//           value={selectedState}
//           onChange={handleStateChange}
//           style={{ marginRight: "20px", padding: "5px", borderRadius: "5px" }}
//         >
//           <option value="">Select a State</option>
//           {statesList.map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//         <input
//           type="color"
//           value={color}
//           onChange={handleColorChange}
//           style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
//         />
//         <button
//           onClick={applyColor}
//           style={{
//             padding: "5px 10px",
//             borderRadius: "5px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Apply Color
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MapComp;
