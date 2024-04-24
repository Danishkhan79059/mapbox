import React from 'react';

const Ulegend = ({ layers, colors }) => {
  return (
    <div id="legend">
      {layers.map((layer, i) => (
        <div key={layer} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div
            className="legend-key"
            style={{ backgroundColor: colors[i], width: '10px', height: '10px', borderRadius: '20%' }}
          />
          <span>{layer}</span>
        </div>
      ))}
    </div>
  );
};

export default Ulegend;
