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

const Statistics = ({ stats }) => {

  const getTotal = () => stats[0] + stats[1] + stats[2]

  const getAverage = () => {
    let totalResponse = getTotal()
    let score = stats[0] - stats[2]
    return (score / totalResponse).toFixed(2)
  }

  const getPositive = () => {
    let totalResponse = getTotal()
    return ((stats[0] / totalResponse) * 100).toFixed(2)
  }

  if ( getTotal() === 0 ) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <table>
      <thead>
        <th>
          Rating
        </th>
        <th>
          Amount
        </th>
      </thead>
      <tbody>
        <tr>
          <td>good</td>
          <td>{stats[0]}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{stats[1]}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{stats[2]}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{getTotal() || 0}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{getAverage() || 0}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{getPositive() || 0} %</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Title text="statistics" />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)