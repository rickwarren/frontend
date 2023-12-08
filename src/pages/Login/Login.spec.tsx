import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AuthContext } from '@/contexts'
import Login from './Login'

const providerUserUnloggedMock = {
  user: undefined,
  isAuthenticated: false,
  loadingUserData: false,
  signIn: jest.fn(),
  signOut: jest.fn()
}

describe('Login page component', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={providerUserUnloggedMock}>
        <Login />
      </AuthContext.Provider>
    )
  })

  describe('when inputting email and password on the fields', () => {
    it('should have a value in the inputs', () => {
      const inputEmail = screen.getByLabelText(/email/i) as HTMLInputElement
      const inputPassword = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement

      fireEvent.change(inputEmail, { target: { value: 'email@site.com' } })
      fireEvent.change(inputPassword, { target: { value: 'pass@123' } })

      expect(inputEmail.value).toEqual('email@site.com')
      expect(inputPassword.value).toEqual('pass@123')
    })
  })

  it('should disabled button when submit form', async () => {
    const button = screen.getByRole('button', {
      name: /submit/i
    }) as HTMLButtonElement

    expect(button).not.toHaveAttribute('disabled')
    expect(button).toHaveTextContent(/Submit/)

    fireEvent.click(button)

    await waitFor(
      () => {
        expect(button).toHaveAttribute('disabled')
        expect(button).toHaveTextContent(/Loading/)
      },
      { timeout: 1000 }
    )
  })
})
