import React from 'react';
import Part from './Part';
import './List.css';


const Content = ({ parts }) => {

    const total = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))

    return (
        <>
            <ul>
            {parts.map((part, id) => <Part key={id} part={part} />)}
            <li>total of {total.exercises} exercises</li>
            </ul>
        </>
    )
}

export default Content