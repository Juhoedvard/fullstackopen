import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  
    const blog = {
        title: "title",
        url: "www.test.fi",
        likes: 0,
        author: "author",
        user: {
            user:"username",
            name: "name"
        }

    }


let component
const likeMockHandler = jest.fn()

beforeEach(() =>{
    component = render(
        <Blog key={blog.id} blog = {blog} like={likeMockHandler} />
    )
})
test('renders content', async () => {
    expect(component.container.querySelector(".title")).toHaveTextContent(
        blog.title
    )
    expect(component.container.querySelector(".url")).not.toBeInTheDocument(
        blog.url
    )
    expect(component.queryByText(".author")).not.toBeInTheDocument(
        blog.author
    )
    expect(component.queryByText(".likes")).not.toBeInTheDocument(
        blog.likes
    )
})

test ('At start all the blog info is not displayed', async () =>{
    const info = component.container.querySelector(".togglableContent")

    expect(info).toEqual(null)
})

test('Shows all the blog info when clicked button', async () =>{
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const info = component.container.querySelector('.togglableContent')
    expect(info).toBeInTheDocument()
})

test('Like button clicked twice calls eventhandler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
})


})
