import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
//import { cleanup, render } from '@testing-library/react'
import Blog from './Blog'

describe('Testing Blog functioning', () => {


  test('details button works when clicking', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog= {blog} switchShowDetails={mockHandler}/>
    )

    const button = component.getByText('Details')
    fireEvent.click(button)
    const b = component.getByText('Less details')
    fireEvent.click(b)
    component.debug()

    expect(component.container).toHaveTextContent(
      'Title: Title Author: Author Details'
    )
  })

  test('Less details button works when clicking', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog= {blog} switchShowDetails={mockHandler}/>
    )

    const button = component.getByText('Details')
    fireEvent.click(button)

    component.debug()

    expect(component.container).toHaveTextContent(
      'Title: Title Author: Author URL: Url Less details'
    )
  })
})