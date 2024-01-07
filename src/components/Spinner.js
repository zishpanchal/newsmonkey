import React from "react";

export default function Spinner(props) 
 {
    return (
      <div className="text-center">
        <div className={"spinner-border m-5 text-"+props.color} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

