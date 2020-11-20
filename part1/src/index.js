import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises} 
    </p>
  )
}

const Total = ({parts}) => {
  let total = 0;
  if (parts) {
    parts.forEach(part => {
      total += part.exercises;
    });
  }
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
      name: "Half Stack application development",
      parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
