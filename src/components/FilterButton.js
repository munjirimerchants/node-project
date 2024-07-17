import React, { useState } from "react";

const FilterButton = ({ onFilter }) => {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFilter(newFilter); // Call the onFilter callback with the selected filter
  };

  return (
    <div>
      <button onClick={() => handleFilterChange("open")}>Open Orders</button>
      <button onClick={() => handleFilterChange("closed")}>
        Closed Orders
      </button>
      <button onClick={() => handleFilterChange(null)}>All Orders</button>
    </div>
  );
};

export default FilterButton;
