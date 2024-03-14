import React from 'react';

const Maps = () => {
    return (
      <div style={{ width: '100%' }}>
        <iframe
          style={{ border: '0', width: '100%', height: '300px', margin: '0', padding: '0' }}
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Nairobi+(hotel-booking)&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    );
};

export default Maps;
