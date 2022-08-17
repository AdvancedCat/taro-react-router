import React from 'react'
import { useLocation } from 'react-router-dom'

export default function View1() {
  let location = useLocation()
  return (
    <div>
      <p>I am view1</p>
      <p>search: {location.search}</p>
      <p>current href: {window.location.href}</p>
    </div>
  )
}
