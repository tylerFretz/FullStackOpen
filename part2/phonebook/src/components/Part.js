import React from 'react';

const Part = ({ part }) => {
    return (
        <li key={part.id}>{part.name} {part.exercises}</li>
    );
}

export default Part;