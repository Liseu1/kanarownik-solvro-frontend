import React from "react";

const Stats = ({ title, value }) => {
  return (
    <div className="stats">
      <h3>{title}</h3>
      <p>{value}</p>
      <button>View all</button>
    </div>
  );
};

export default Stats;
