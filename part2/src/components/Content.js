import React from 'react';
import Part from './Part';
import './List.css';

const Content = ({ parts }) => {

    return (
        <ul>
        {parts.map((part, id) => <Part key={id} part={part} />)}
        </ul>
    )
}

export default Content