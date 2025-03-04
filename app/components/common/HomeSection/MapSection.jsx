import React from "react";

function MapSection() {
  return (
    <div className="w-full h-[450px] md:h-[500px] lg:h-[600px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d18026425.889497504!2d79.02125131854163!3d21.943363730559387!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20map%20starbucks%20in%20india!5e0!3m2!1sen!2sin!4v1739607811079!5m2!1sen!2sin"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapSection;
