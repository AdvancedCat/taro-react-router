import * as React from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom'
import {Link} from '../../../components'

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true
    window.setTimeout(callback, 100) // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false
    window.setTimeout(callback, 100)
  },
}

export default function App() {
  return (
    <BrowserRouter basename='pages/react-router-examples/auth/index'>
      <AuthProvider>
        <h1>Auth Example</h1>

        <p>
          This example demonstrates a simple login flow with three pages: a public page, a protected page, and a login
          page. In order to see the protected page, you must first login. Pretty standard stuff.
        </p>

        <p>
          First, visit the public page. Then, visit the protected page. You're not yet logged in, so you are redirected
          to the login page. After you login, you are redirected back to the protected page.
        </p>

        <p>
          Notice the URL change each time. If you click the back button at this point, would you expect to go back to
          the login page? No! You're already logged in. Try it out, and you'll see you go back to the page you visited
          just *before* logging in, the public page.
        </p>

        <div style={{margin: '10px 0', border: '2px solid black'}}></div>

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  )
}

let AuthContext = React.createContext(null)

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null)

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return React.useContext(AuthContext)
}

function AuthStatus() {
  let auth = useAuth()
  let navigate = useNavigate()

  if (!auth.user) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'))
        }}
      >
        Sign out
      </button>
    </p>
  )
}

function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function LoginPage() {
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()

  let from = location.state?.from?.pathname || '/'

  function handleSubmit(event) {
    event.preventDefault()

    let username = "Taro"

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: Taro
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function PublicPage() {
  return <h3>Public</h3>
}

function ProtectedPage() {
  return <h3>Protected</h3>
}
