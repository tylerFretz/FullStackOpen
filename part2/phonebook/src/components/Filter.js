import React from "react";

const Filter = ({value, onChange}) => {

    return (
        <div className="filter">
            filter by name: <input value={value} onChange={onChange}/>
        </div>
    );
};

export default Filter;