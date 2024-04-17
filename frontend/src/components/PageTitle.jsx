import React from "react";

const PageTitle = ({ title }) => {
  return (
    <div className="d-flex py-4">
      <div className="page-title">
        {title}
        <div className="title-line"></div>
      </div>
    </div>
  );
};

export default PageTitle;
