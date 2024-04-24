import React, { useState } from 'react';
import './App.css';
import MapComp from './MapComp';
// import Ulegend from './Ulegend';
// import IndiaMap from './IndiaMap';
// import indiaGeoJson from './indianStates2.Json'; 

const App = () => {
  const layers = ['0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600-700', '700+'];
  const colors = ['red', 'green', 'blue', 'purple', 'yellow', '#41ab5d', '#238b45', '#005a32'];

  // State to hold the currently hovered state's population density
  const [hoveredStateDensity, setHoveredStateDensity] = useState(null);

  // Event handler for when hovering over a state
  const handleStateHover = (stateName) => {
    console.log("hello");
    // Example: Perform an API call or lookup to get the population density of the hovered state
    // For demonstration purposes, using a static data object as if it were fetched from an API
    const statePopulations = {
      Maharashtra: 365,
      Karnataka: 250,
      Gujarat: 300,
      // Add more state population data here...
    };

    // Update the hovered state's population density in the state
    setHoveredStateDensity(statePopulations[stateName] || 'Data not available');
  };

  return (
    <div className="App">
      <h2>Indian State Population Density</h2>
      <div style={{ position: 'relative' }}>
        <MapComp onStateHover={handleStateHover} />
        {/* Display population density when hovering over a state */}
        <div className="map-overlay" style={{ bottom: 0, right: 0 }}>
          <div id="pd">
            {/* Display the hovered state's population density */}
            <p>{hoveredStateDensity ? `Population Density: ${hoveredStateDensity} / sq km` : 'Hover over a state!'}</p>
          </div>
        </div>
      </div>
      <MapComp layers={layers} colors={colors} />
    </div>
  );

  // return (
  //   <div className="App">
  //     <h1>India Map</h1>
  //     <MapComp geoJsonData={indiaGeoJson} />
  //   </div>
  // );

};

export default App;


// // import React, { useState, useEffect } from 'react';
// // import * as d3 from 'd3';
// // import * as topojson from 'topojson-client';

// // const App = () => {
// //   const [countyData, setCountyData] = useState([]);
// //   const [educationData, setEducationData] = useState([]);
  
// //   useEffect(() => {
// //     const countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
// //     const educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

// //     const fetchData = async () => {
// //       try {
// //         const countyResponse = await fetch(countyURL);
// //         const countyData = await countyResponse.json();

// //         const educationResponse = await fetch(educationURL);
// //         const educationData = await educationResponse.json();

// //         setCountyData(topojson.feature(countyData, countyData.objects.counties).features);
// //         setEducationData(educationData);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     if (countyData.length > 0 && educationData.length > 0) {
// //       drawMap();
// //     }
// //   }, [countyData, educationData]);

// //   const drawMap = () => {
// //     const canvas = d3.select('#canvas');
// //     const tooltip = d3.select('#tooltip');

// //     canvas.selectAll('path')
// //       .data(countyData)
// //       .enter()
// //       .append('path')
// //       .attr('d', d3.geoPath())
// //       .attr('class', 'county')
// //       .attr('fill', (countyDataItem) => {
// //         const id = countyDataItem.id;
// //         const county = educationData.find((item) => item.fips === id);
// //         const percentage = county.bachelorsOrHigher;
// //         if (percentage <= 15) {
// //           return 'tomato';
// //         } else if (percentage <= 30) {
// //           return 'orange';
// //         } else if (percentage <= 45) {
// //           return 'lightgreen';
// //         } else {
// //           return 'limegreen';
// //         }
// //       })
// //       .attr('data-fips', (countyDataItem) => countyDataItem.id)
// //       .attr('data-education', (countyDataItem) => {
// //         const id = countyDataItem.id;
// //         const county = educationData.find((item) => item.fips === id);
// //         return county.bachelorsOrHigher;
// //       })
// //       .on('mouseover', (countyDataItem) => {
// //         tooltip.transition()
// //           .style('visibility', 'visible');

// //         const id = countyDataItem.id;
// //         const county = educationData.find((item) => item.fips === id);

// //         tooltip.text(`${county.fips} - ${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`);

// //         tooltip.attr('data-education', county.bachelorsOrHigher);
// //       })
// //       .on('mouseout', () => {
// //         tooltip.transition()
// //           .style('visibility', 'hidden');
// //       });
// //   };

// //   return (
// //     <div>
// //       <svg id="canvas"></svg>
// //       <div id="tooltip"></div>
// //     </div>
// //   );
// // };

// // export default App;
// import React from 'react';
// import ChoroplethMap from './ChoroplethMap';
// import ButtonLoadingSpinner from './ButtonLoadingSpinner';

// const App = () => {
//   return (
//     <div className="App">
//       {/* <ChoroplethMap /> */}
//       <ButtonLoadingSpinner/>
//     </div>
//   );
// };

// export default App;


// import React from "react";
// import ReactDOM from "react-dom";
// import ButtonLoader from "./Buttonloader/index.jsx";

// // import "./styles.css";

// function App() {
//   return (
//     <div className="App">
//       <ButtonLoader />
//       <p>
//         If you like my work, please support by subscribing{" "}
//         <a
//           style={{ color: "red" }}
//           target="_blank"
//           rel="noopener noreferrer"
//           href="https://www.youtube.com/channel/UCdItDI6oTgPW7l9WOJI7ItA/"
//         >
//           D'coders youtube channel
//         </a>
//       </p>
//     </div>
//   );
// }

// // const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


// import React from "react";

// import ReactDOM from 'react-dom'
// import ButtonLoader from "./Buttonloader/index";

// export default function App() {
//   return (
//     <div className="App">
//       <ButtonLoader />
//       <p>
//        spinner 
      
        
     
//       </p>
//     </div>
//   )
// }
