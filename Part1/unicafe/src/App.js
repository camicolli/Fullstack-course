import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Average = ({average}) => {
  const avg=average.reduce((a,b) => a + b) / average.length
  return (
    <tr><td>Average </td><td>{avg}</td></tr>
  )
}

const Positive = ({total,positive}) => {
  const p =(100*positive)/total 
  return (
    <tr><td>Positive</td><td> {p} %</td></tr>
  )
}

const Statistics = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState([])
  const [total, setTotal] = useState(0)
  const [positive, setPositive] = useState(0)

  const handlegoodClick = () => {
      setGood(good+1)
      setTotal(total+1)
      setAverage(average.concat(1))
      setPositive(positive+1)
  }

  const handleneutralClick = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
    setAverage(average.concat(0))
  }

  const handlebadClick = () => {
    setBad(bad+1)
    setTotal(total+1)
    setAverage(average.concat(-1))
  }

  if (total === 0) {
    return (
    <div>
      <Header text="Give Feedback" />
      <ul>
        <Button handleClick={handlegoodClick} text= 'Good' />
        <Button handleClick={handleneutralClick} text= 'Neutral' />
        <Button handleClick={handlebadClick} text= 'Bad' />
      
      </ul>
      <Header text="Statistics" />
      <ul>No feedback given</ul>
    </div>
    )
  }
  return (
    <>
      <Header text="Give Feedback" />
      <ul>
        <Button handleClick={handlegoodClick} text= 'Good' />
        <Button handleClick={handleneutralClick} text= 'Neutral' />
        <Button handleClick={handlebadClick} text= 'Bad' />
      
      </ul>
      <Header text="Statistics" />
      <table>
        <tbody>

          <Statistics text="Good" value={good} />
          <Statistics text="Neutral" value={neutral} />
          <Statistics text="Bad" value={bad} />
          <Statistics text="Total" value={total} />
          <Average average={average}/>
          <Positive total={total} positive={positive} />
        </tbody>
      </table>

    </>
  )
}

export default App
