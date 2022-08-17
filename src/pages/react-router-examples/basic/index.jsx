import * as React from 'react'
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom'

export default function BasicPage() {

  React.useEffect(()=>{
    window.history.pushState({}, '', '/')
    console.log(window.location)
  }, [])

  return (
    <BrowserRouter>
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router including nested <code>&lt;Route&gt;</code>
        s, <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a "*" route (aka "splat route") to render
        a "not found" page when someone visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <div style={{margin: '10px 0', border: '2px solid black'}}></div>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>当前链接：{window.location.href}</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>当前链接：{window.location.href}</p>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>当前链接：{window.location.href}</p>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>当前链接：{window.location.href}</p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
