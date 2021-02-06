import React from 'react'

const Header = (props) => <h1>{props.name}</h1> 

const Content = ({parts}) => (
  <>
    {parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </>
)

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>Total of {total} exercises </b>
  )
}

const Course = ({course}) => (
  <div>
  <Header name={course.name} />
  <Content parts={course.parts} />
  <Total parts = {course.parts} />

  </div>

)

export default Course