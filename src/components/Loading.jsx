import React from "react";

function Loading() {
  return (
    <div id="loading">
      <div className="wrapper">
        <div className="loader">
          <div className="dot"></div>
        </div>
        <div className="loader">
          <div className="dot"></div>
        </div>
        <div className="loader">
          <div className="dot"></div>
        </div>
        <div className="loader">
          <div className="dot"></div>
        </div>
        <div className="loader">
          <div className="dot"></div>
        </div>
        <div className="loader">
          <div className="dot"></div>
        </div>
      </div>
      <div className="text">Please wait</div>
    </div>
  );
}

export default Loading;
