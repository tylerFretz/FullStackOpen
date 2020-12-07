import React from "react";

const Filter = ({value, onChange}) => {

    return (
        <div>
            <strong>Filter countries</strong> <input value={value} onChange={onChange}/>
        </div>
    );
};

export default Filter;