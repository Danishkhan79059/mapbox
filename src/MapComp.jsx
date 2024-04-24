

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure Mapbox CSS is imported

const MapComp = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex',
      center: [78.9629, 23.5937],
      zoom: 4
    });

    map.on('load', () => {
      map.fitBounds([[68.1766451354, 6.75492974974], [97.4025614766, 35.4940095078]]);

      // Add Indian state data source (replace 'indian-states' with your data source name)
      map.addSource('indian-states', {
        type: 'geojson',
        data: '/Indianstates.geojson' // Path to your GeoJSON file
      });

      // Add layer for Indian states
    //   map.addLayer({
    //     id: 'states-layer',
    //     type: 'fill',
    //     source: 'indian-states',
    //     paint: {
    //       'fill-color': 'red',
    //       'fill-opacity': 0.6
    //     }
    //   });

    map.addLayer({
        id: 'states-layer',
        type: 'fill',
        source: 'indian-states',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'density'], // Replace 'density' with the property in your GeoJSON that you want to visualize
            0, '#f0f9e8',
            100, '#bae4bc',
            500, '#7bccc4',
            1000, '#43a2ca',
            2000, '#0868ac'
          ],
          'fill-opacity': 0.7
        }
      });

      // Add hover effect
    //   map.on('mousemove', 'states-layer', (e) => {
    //     map.getCanvas().style.cursor = 'pointer';

    //     const state = e.features[0];
    //     const density = state.properties.density; // Assuming this property exists in your data
    //     const name = state.properties.name; // Assuming this property holds the state name

    //     map.setFilter('states-layer', ['==', 'name', name]);

    //     new mapboxgl.Popup()
    //       .setLngLat(e.lngLat)
    //       .setHTML(`<h3>${name}</h3><p>Population: ${density} per sq. km</p>`)
    //       .addTo(map);
    //   });


    map.on('mousemove', 'states-layer', (e) => {
        if (!map.getPopup()) {
          const state = e.features[0];
          const density = state.properties.density; // Replace 'density' with your actual property name
          const name = state.properties.name; // Replace 'name' with the state name property in your GeoJSON
      
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${name}</h3><p>Density: ${density} per sq. km</p>`)
            .addTo(map);
        }
      });
      
      
   
      map.on('mouseleave', 'states-layer', () => {
        map.getCanvas().style.cursor = '';
        map.setFilter('states-layer', ['==', 'name', '']);
      });
    });
    // map.on('mouseleave', 'states-layer', () => {
    //     map.getCanvas().style.cursor = '';
    //     map.closePopup();
    //   });
    // });

    return () => map.remove(); // Clean up on unmount
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapComp;






















































































































































// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';

// const MapComp = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [-98, 38.88],
//       minZoom: 2,
//       zoom: 3
//     });

//     const zoomThreshold = 6;

    
//     map.on('load', () => {
//       map.addSource('population', {
//         type: 'vector',
//         url: 'mapbox://mapbox.660ui7x6'
//       });

//       map.addLayer({
//         id: 'state-population',
//         source: 'population',
//         'source-layer': 'state_county_population_2014_cen',
//         maxzoom: zoomThreshold,
//         type: 'fill',
//         filter: ['==', 'isState', true],
//         paint: {
//           'fill-color': [
//             'interpolate',
//             ['linear'],
//             ['get', 'population'],
//             0, '#F2F12D',
//             500000, '#EED322',
//             750000, '#E6B71E',
//             1000000, '#DA9C20',
//             2500000, '#CA8323',
//             5000000, '#B86B25',
//             7500000, '#A25626',
//             10000000, '#8B4225',
//             25000000, '#723122'
//           ],
//           'fill-opacity': 0.75
//         }
//       }, 'road-label-simple');

//       map.addLayer({
//         id: 'county-population',
//         source: 'population',
//         'source-layer': 'state_county_population_2014_cen',
//         minzoom: zoomThreshold,
//         type: 'fill',
//         filter: ['==', 'isCounty', true],
//         paint: {
//           'fill-color': [
//             'interpolate',
//             ['linear'],
//             ['get', 'population'],
//             0, '#F2F12D',
//             100, '#EED322',
//             1000, '#E6B71E',
//             5000, '#DA9C20',
//             10000, '#CA8323',
//             50000, '#B86B25',
//             100000, '#A25626',
//             500000, '#8B4225',
//             1000000, '#723122'
//           ],
//           'fill-opacity': 0.75
//         }
//       }, 'road-label-simple');

//       map.on('zoom', () => {
//         if (map.getZoom() > zoomThreshold) {
//           stateLegendEl.style.display = 'none';
//           countyLegendEl.style.display = 'block';
//         } else {
//           stateLegendEl.style.display = 'block';
//           countyLegendEl.style.display = 'none';
//         }
//       });
//     });

//     return () => map.remove();
//   }, []); // Only run on mount and unmount

//   return (

//     <>
//     <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
//       <div id="state-legend" className="legend">
//         <h4>Population</h4>
//         {/* <div><span style="background-color: #723122"></span>25,000,000</div>
//     <div><span style="background-color: #8b4225"></span>10,000,000</div>
//     <div><span style="background-color: #a25626"></span>7,500,000</div>
//     <div><span style="background-color: #b86b25"></span>5,000,000</div>
//     <div><span style="background-color: #ca8323"></span>2,500,000</div>
//     <div><span style="background-color: #da9c20"></span>1,000,000</div>
//     <div><span style="background-color: #e6b71e"></span>750,000</div>
//     <div><span style="background-color: #eed322"></span>500,000</div>
//     <div><span style="background-color: #f2f12d"></span>0</div> */}
//       </div>
//       <div id="county-legend" className="legend" style={{ display: 'none' }}>
//         <h4>Population</h4>
//         {/* <div><span style="background-color: #723122"></span>1,000,000</div>
//     <div><span style="background-color: #8b4225"></span>500,000</div>
//     <div><span style="background-color: #a25626"></span>100,000</div>
//     <div><span style="background-color: #b86b25"></span>50,000</div>
//     <div><span style="background-color: #ca8323"></span>10,000</div>
//     <div><span style="background-color: #da9c20"></span>5,000</div>
//     <div><span style="background-color: #e6b71e"></span>1,000</div>
//     <div><span style="background-color: #eed322"></span>100</div>
//     <div><span style="background-color: #f2f12d"></span>0</div> */}
//       </div>
//     </div>


  

//     </>
    
//   );
// };

// export default MapComp;





// // // import React, { useEffect, useRef } from 'react';
// // // import mapboxgl from 'mapbox-gl';

// // // const MapComp = () => {
// // //   const mapContainerRef = useRef(null);

// // //   useEffect(() => {
// // //     mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

// // //     const map = new mapboxgl.Map({
// // //       container: mapContainerRef.current,
// // //       style: 'mapbox://styles/examples/cjgioozof002u2sr5k7t14dim',
// // //       center: [-98, 38], // set initial center of the map
// // //       zoom: 3, // set initial zoom level
// // //     });

// // //     map.on('load', () => {
// // //       // Add map layers, legends, and interaction here
// // //     });

// // //     // Clean up map instance on unmount
// // //     return () => map.remove();
// // //   }, []);

// // //   return <div ref={mapContainerRef} className="map-container" />;
// // // };

// // // export default MapComp;







// // // import React, { useEffect } from 'react';
// // // import mapboxgl from 'mapbox-gl';

// // // // Define Mapbox access token
// // // mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

// // // const MapComp = () => {
// // //   useEffect(() => {
// // //     const map = new mapboxgl.Map({
// // //       container: 'map',
// // //       style: 'mapbox://styles/khandanish/clv6cgpd200lk01qp6timcqsj',
// // //       center: [78.9629, 23.5937], 
// // //       zoom: 3, // Initial zoom level
// // //     });

// // //     map.on('load', () => {
// // //       // Pointer cursor
// // //       map.getCanvas().style.cursor = 'default';

// // //       // Set map bounds to the continental US
// // //       // map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);
// // //       map.fitBounds = [
// // //         [68.1766451354, 7.96553477623],   // Southwest coordinates (longitude, latitude)
// // //         [97.4025614766, 35.4940095078]    // Northeast coordinates (longitude, latitude)
// // //     ];
    

// // //       // Layer names and colors
// // //       const layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
// // //       const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

// // //       // Create legend
// // //       const legend = document.getElementById('legend');

// // //       layers.forEach((layer, i) => {
// // //         const color = colors[i];
// // //         const item = document.createElement('div');
// // //         const key = document.createElement('span');
// // //         key.className = 'legend-key';
// // //         key.style.backgroundColor = color;

// // //         const value = document.createElement('span');
// // //         value.innerHTML = `${layer}`;
// // //         item.appendChild(key);
// // //         item.appendChild(value);
// // //         legend.appendChild(item);
// // //       });

// // //       // Change info window on hover
// // //       map.on('mousemove', (event) => {
// // //         const states = map.queryRenderedFeatures(event.point, { layers: ['statedata'] });
// // //         document.getElementById('pd').innerHTML = states.length
// // //           ? `<h3>${states[0].properties.name}</h3><p><strong><em>${states[0].properties.density}</strong> people per square mile</em></p>`
// // //           : `<p>Hover over a state!</p>`;
// // //       });
// // //     });

// // //     // Clean up
// // //     return () => map.remove();
// // //   }, []); // Empty dependency array ensures this effect runs only once on mount

// // //   return (
// // //     <div>
// // //       <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
// // //       <div className="map-overlay" style={{ position: 'absolute', bottom: 0, right: 0, background: '#fff', marginRight: '20px', fontFamily: 'Arial, sans-serif', overflow: 'auto', borderRadius: '3px' }}>
// // //         <h2>US population density</h2>
// // //         <div id="pd"><p>Hover over a state!</p></div>
// // //       </div>
// // //       <div className="map-overlay" id="legend" style={{ padding: '10px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', lineHeight: '18px', height: '150px', marginBottom: '40px', width: '100px' }} />
// // //     </div>
// // //   );
// // // };

// // // export default MapComp;






// // // import React, { useEffect } from 'react';
// // // import mapboxgl from 'mapbox-gl';

// // // const MapComp = () => {
// // //     useEffect(() => {
// // //         mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

// // //         const map = new mapboxgl.Map({
// // //             container: 'map',
// // //             style: 'mapbox://styles/mapbox/light-v11',
// // //             center: [78.9629, 23.5937], // Centered on India
// // //             zoom: 4
// // //         });

// // //         // Data: Indian State HDI (example data)
// // //         const indiaStateData = [
// // //             { 'state': 'Kerala', 'hdi': 0.78 },
// // //             { 'state': 'Maharashtra', 'hdi': 0.83 },
// // //             { 'state': 'Karnataka', 'hdi': 0.81 },
// // //             { 'state': 'Tamil Nadu', 'hdi': 0.79 },
// // //             // Add more states with their respective HDI values
// // //         ];

// // //         map.on('load', () => {
// // //             // Add vector tile source for Indian state boundaries
// // //             map.addSource('states', {
// // //                 type: 'vector',
// // //                 url: 'mapbox://mapbox.mapbox-streets-v8' // Example vector tile source URL
// // //                 // Replace URL with the appropriate vector tile source for Indian states
// // //             });

// // //             // Define a fill layer to render the Indian state data
// // //             map.addLayer(
// // //                 {
// // //                     id: 'state-fill',
// // //                     type: 'fill',
// // //                     source: 'states',
// // //                     'source-layer': 'admin-1-boundaries', // Assuming the source layer contains state boundaries
// // //                     paint: {
// // //                         'fill-opacity': 0.8,
// // //                         'fill-color': [
// // //                             'case',
// // //                             ['in', ['get', 'name'], ['literal', indiaStateData.map(state => state.state)]],
// // //                             [
// // //                                 'match',
// // //                                 ['get', 'name'],
// // //                                 ...indiaStateData.map(state => [state.state, `rgba(0, ${Math.round(state.hdi * 255)}, 0)`]),
// // //                                 'rgba(0, 0, 0, 0)' // Default color where no data matches
// // //                             ],
// // //                             'rgba(0, 0, 0, 0)' // Default color for other states
// // //                         ]
// // //                     }
// // //                 },
// // //                 'waterway-label' // Place the layer below waterway labels
// // //             );
// // //         });

// // //         return () => map.remove(); // Clean up on unmount
// // //     }, []);

// // //     return <div id="map" style={{ width: '100%', height: '100vh' }} />;
// // // };

// // // export default MapComp;










// // // // import React, { useEffect } from 'react';
// // // // import mapboxgl from 'mapbox-gl';

// // // // // Define Mapbox access token
// // // // mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

// // // // const MapComp = () => {
// // // //   useEffect(() => {
// // // //     const map = new mapboxgl.Map({
// // // //       container: 'map',
// // // //       style: 'mapbox://styles/khandanish/clv6cgpd200lk01qp6timcqsj', // Use a suitable Mapbox style for India
// // // //       center: [78.9629, 23.5937], // Centered on India
// // // //       zoom: 4, // Adjust zoom level as needed
// // // //     });

// // // //     map.on('load', () => {
// // // //       // Pointer cursor
// // // //       map.getCanvas().style.cursor = 'default';

// // // //       // Set map bounds to India
// // // //       map.fitBounds([
// // // //         [68.1766451354, 7.96553477623],   // Southwest coordinates (longitude, latitude)
// // // //         [97.4025614766, 35.4940095078]    // Northeast coordinates (longitude, latitude)
// // // //       ]);

// // // //       // Layer names and colors (update according to your data)
// // // //       const layers = ['Low', 'Medium', 'High']; // Example density categories
// // // //       const colors = ['#FFEDA0', '#FEB24C', '#F03B20']; // Example colors for legend

// // // //       // Create legend
// // // //       const legend = document.getElementById('legend');

// // // //       layers.forEach((layer, i) => {
// // // //         const color = colors[i];
// // // //         const item = document.createElement('div');
// // // //         const key = document.createElement('span');
// // // //         key.className = 'legend-key';
// // // //         key.style.backgroundColor = color;

// // // //         const value = document.createElement('span');
// // // //         value.innerHTML = `${layer}`;
// // // //         item.appendChild(key);
// // // //         item.appendChild(value);
// // // //         legend.appendChild(item);
// // // //       });

// // // //       // Change info window on hover (update according to your data)
// // // //       map.on('mousemove', (event) => {
// // // //         const states = map.queryRenderedFeatures(event.point, { layers: ['statedata'] });
// // // //         document.getElementById('pd').innerHTML = states.length
// // // //           ? `<h3>${states[0].properties.name}</h3><p><strong>Density:</strong> ${states[0].properties.density} people per square kilometer</p>` // Update density unit and property names
// // // //           : `<p>Hover over a state!</p>`;
// // // //       });
// // // //     });

// // // //     // Clean up
// // // //     return () => map.remove();
// // // //   }, []); // Empty dependency array ensures this effect runs only once on mount

// // // //   return (
// // // //     <div>
// // // //       <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
// // // //       <div className="map-overlay" style={{ position: 'absolute', bottom: 0, right: 0, background: '#fff', marginRight: '20px', fontFamily: 'Arial, sans-serif', overflow: 'auto', borderRadius: '3px' }}>
// // // //         <h2>India State Population Density</h2>
// // // //         <div id="pd"><p>Hover over a state!</p></div>
// // // //       </div>
// // // //       <div className="map-overlay" id="legend" style={{ padding: '10px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', lineHeight: '18px', height: '100px', marginBottom: '40px', width: '100px' }} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MapComp;






// import React, { useEffect, useRef } from 'react';
//  import mapboxgl from 'mapbox-gl';

//  const MapboxMap = () => {
//    const mapContainerRef = useRef(null);

//   useEffect(() => {
//      mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA'; // Set your Mapbox access token here

//      const map = new mapboxgl.Map({
//        container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//        center: [-93.261, 44.971],
//       zoom: 10.5
//    });

//     map.on('load', () => {
//        map.addLayer({
//          id: 'historical-places',
//         type: 'circle',
//          source: {
//           type: 'vector',
//           url: 'mapbox://examples.8ribcg3i'
//         },
//          'source-layer': 'HPC_landmarks-a88vge',
//         paint: {
//           'circle-radius': [
//              ['linear'],
//             ['zoom'],
//            10,
//             ['/', ['-', 2017, ['number', ['get', 'Constructi'], 2017]], 30],
//             13,
//             ['/', ['-', 2017, ['number', ['get', 'Constructi'], 2017]], 10]
//            ],
//         'circle-color': 'rgb(171, 72, 33)'
//        }
//       });
//     });

//      return () => map.remove();
//    }, []);

//    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
//  };

//  export default MapboxMap;
//  import React, { useEffect, useRef } from 'react';
//  import mapboxgl from 'mapbox-gl';

// const MapComp = () => {
//    const mapContainerRef = useRef(null);

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//        container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [-98, 38.88],
//       minZoom: 2,
//      zoom: 3
//     });

//     const zoomThreshold = 4;

//     map.on('load', () => {
//       map.addSource('population', {
//         type: 'vector',
//        url: 'mapbox://mapbox.660ui7x6'
//      });

//       map.addLayer({
//         id: 'state-population',
//         source: 'population',
//         maxzoom: zoomThreshold,
//          type: 'fill',
//         filter: ['==', 'isState', true],
//         paint: {
//           'fill-color': [
//             'interpolate',
//             ['linear'],
//             ['get', 'population'],
//             0, '#F2F12D',
//             500000, '#EED322',
//             750000, '#E6B71E',
//             1000000, '#DA9C20',
//             2500000, '#CA8323',
//             5000000, '#B86B25',
//             7500000, '#A25626',
//             10000000, '#8B4225',
//             25000000, '#723122'
//           ],
//           'fill-opacity': 0.75
//         }
//       }, 'road-label-simple');

//       map.addLayer({
//         id: 'county-population',
//         source: 'population',
//         'source-layer': 'state_county_population_2014_cen',
//         minzoom: zoomThreshold,
//         type: 'fill',
//         filter: ['==', 'isCounty', true],
//         paint: {
//           'fill-color': [
//             'interpolate',
//             ['linear'],
//             ['get', 'population'],
//             0, '#F2F12D',
//             100, '#EED322',
//             1000, '#E6B71E',
//             5000, '#DA9C20',
//             10000, '#CA8323',
//             50000, '#B86B25',
//             100000, '#A25626',
//             500000, '#8B4225',
//             1000000, '#723122'
//           ],
//           'fill-opacity': 0.7         }
//        }, 'road-label-simple');

//        // Add hover effect and popup
//        map.on('mousemove', 'state-population', (e) => {
//          const feature = e.features[0];
//        });

//       map.on('mousemove', 'county-population', (e) => {
//         const feature = e.features[0];
//         new mapboxgl.Popup()
//           .setLngLat(e.lngLat)
//           .setHTML(`<h3>${feature.properties.name}</h3><p>Population: ${feature.properties.population}</p>`)
//           .addTo(map);
//       });

//       map.on('mouseleave', 'state-population', () => {
//         map.getCanvas().style.cursor = '';
//       });

//       map.on('mouseleave', 'county-population', () => {
//         map.getCanvas().style.cursor = '';
//       });

//       map.on('zoom', () => {
//         if (map.getZoom() > zoomThreshold) {
//           document.getElementById('state-legend').style.display = 'none';
//           document.getElementById('county-legend').style.display = 'block';
//         } else {
//           document.getElementById('state-legend').style.display = 'block';
//           document.getElementById('county-legend').style.display = 'none';
//         }
//       });
//     });

//     return () => map.remove();
//   }, []); // Only run on mount and unmount

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
//       <div id="state-legend" className="legend">
//         <h4>Population (State)</h4>
//         {/* State population legend here */}
//       </div>
//       <div id="county-legend" className="legend" style={{ display: 'none' }}>
//         <h4>Population (County)</h4>
//         {/* County population legend here */}
//       </div>
//     </div>
//   );
// };

// export default MapComp;