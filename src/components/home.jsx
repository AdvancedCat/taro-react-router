import React from 'react'
// import { useMatch, useLocation, useHref } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <p>I am home</p>
      <p>current href: {window.location.href}</p>
    </div>
  )
}
