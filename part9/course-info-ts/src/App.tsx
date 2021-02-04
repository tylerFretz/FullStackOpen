import React from "react";
import { v4 as uuidv4 } from 'uuid';

import { CoursePart } from './types';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      id: uuidv4(),
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      id: uuidv4(),
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      id: uuidv4(),
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      id: uuidv4(),
      name: "My part",
      exerciseCount: 99,
      description: "Another description"
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;