import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
        case "My part":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    {part.description && (
                        <p>Description: {part.description}</p>
                    )}
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Group Project Count: {part.groupProjectCount}</p>
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    {part.description && (
                        <p>Description: {part.description}</p>
                    )}
                    <p>Submission Link: {part.exerciseSubmissionLink}</p>
                </div>
            )
        default:
            return assertNever(part);
    }
}

export default Part;