import React from 'react'
import { useParams } from 'react-router-dom'

export default function View3() {
  let { id } = useParams();
  return (
    <div>
      <p>I am view3</p>
      <p>current href: {window.location.href}</p>
      <p>id: {id}</p>
    </div>
  )
}
