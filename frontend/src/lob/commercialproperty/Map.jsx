import React from 'react';

export function MapView() {
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <iframe
        title="Google Map"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '12px',
        }}
        src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12090.324836224074!2d-74.0060!3d40.7128!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316b24938b%3A0x3f9e5180f4a3e6a!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1634485201153`}
        allowFullScreen
      ></iframe>
    </section>
  );
}

export default MapView;
