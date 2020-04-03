import React from "react";

const AbsoluteWrapper = ({ children }) => {
  return <div
    className="position-absolute w-100"
    style={{ height: '100vh' }}
  >
    {
      children
    }
  </div>;
};

export default AbsoluteWrapper;