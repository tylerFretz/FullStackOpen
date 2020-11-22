import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({text}) => (
  <h1>
    {text}
  </h1>
)

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ good, neutral, bad}) => (
  <div>
    <p>
      good {good}
    </p>
    <p>
      neutral {neutral}
    </p>
    <p>
      bad {bad}
    </p>
  </div>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newGood => {
    setGood(newGood)
  }

  const setToNeutral = newNeutral => {
    setNeutral(newNeutral)
  }

  const setToBad = newBad => {
    setBad(newBad)
  }

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Title text="statistics" />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)