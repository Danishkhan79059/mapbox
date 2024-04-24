

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const IndiaMap = ({ geoJsonData }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA';

    const initializeMap = ({ setMap, mapContainer }) => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [78.9629, 22.5937], // Centered on India
        zoom: 4
      });

      mapInstance.on('load', () => {
        setMap(mapInstance);
        mapInstance.resize();

        // Add the GeoJSON data for Indian state boundaries
        mapInstance.addSource('states', {
          type: 'geojson',
          data: geoJsonData
        });

        // Add a layer to render the state boundaries
        mapInstance.addLayer({
          id: 'state-boundaries',
          type: 'line',
          source: 'states',
          paint: {
            'line-color': '#888',
            'line-width': 1
          }
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });

    // Clean up on unmount
    return () => {
      if (map) map.remove();
    };
  }, [map, geoJsonData]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default IndiaMap;

