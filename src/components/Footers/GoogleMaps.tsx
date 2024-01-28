import React from "react";
function GoogleMaps() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7177.718505795423!2d28.033082!3d-25.906997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x325b4bc90aec6164!2sEvetech!5e0!3m2!1sen!2sza!4v1664642683669!5m2!1sen!2sza"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="FooterMap"
      style={{ border: 0, width: "100%", height: "100%" }}
    ></iframe>
  );
}

export default GoogleMaps;
