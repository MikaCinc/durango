import React from "react";

const AbsoluteWrapper = ({ children }) => {
  return <div
    className="transition-item detail-page"
    style={{ height: '100vh' }}
  >
    {
      children
    }
  </div>;
};

export default AbsoluteWrapper;