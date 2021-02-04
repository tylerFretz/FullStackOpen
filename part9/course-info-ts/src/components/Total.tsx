import React from "react";

//Total should render the total sum of exercises in all parts.

const Total: React.FC<{ total: number }> = ({ total }) => (
    <p>Number of exercies: {total}</p>
);

export default Total;