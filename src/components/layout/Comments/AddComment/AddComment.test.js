import * as React from 'react'
import {render, screen} from '@testing-library/react'
import * as userEvent from '@testing-library/user-event'
import AddComment from './AddComment'

test('Add Comment', async () => {
  const onSubmit = jest.fn()
  const closePanel = jest.fn()
  render(<AddComment closePanel={closePanel} />)
  const username = 'adi'
  const useremail = 'a@b.c'
  const usermessage = 'lorem ipsum dolor'
  // console.log("S_C_R_E_E_N", screen.getByPlaceholderText('Your Name'));
  await userEvent.type(screen.getByPlaceholderText('Your Name'), username)
  await userEvent.type(screen.getByPlaceholderText('Your Email'), useremail)
  await userEvent.type(screen.getByPlaceholderText('Your Message'), usermessage)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(onSubmit).toHaveBeenCalledWith({
    username,
    useremail,
    usermessage
  })
  expect(onSubmit).toHaveBeenCalledTimes(1)
})