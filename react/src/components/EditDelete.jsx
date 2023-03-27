import React from 'react'
import { NavLink } from 'react-router-dom'

export default function EditDelete({className, edit, del}) {
  return (
    <div className={`edit-delete ${className}`}>
   { edit && <NavLink to={edit.url} className={"child edit"}>{edit.content}</NavLink>}
    { del && <button onClick={()=>{del.method()}} className="child delete">{del.content}</button>}
  </div>
  )
}
