import React from "react";

const GoogleMap = ({ 
    src, 
    width = "100%", 
    height = "100%", 
    className = "",
    title = "Business Location"
}) => {
    return (
        <div className={`w-full h-full rounded-lg overflow-hidden ${className}`}>
            <iframe
                src={src}
                width={width}
                height={height}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={title}
                className="w-full h-full"
            />
        </div>
    );
};

export default GoogleMap;