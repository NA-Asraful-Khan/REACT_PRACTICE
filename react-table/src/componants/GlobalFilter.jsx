import React, { useState } from 'react'

export const GlobalFilter = ({filter,setFilter}) => {
  const [value, setValue]=useState()

  setTimeout(() => {
    // Set the new value after the delay
    setFilter(value);
  }, 700);
  return (
    <span>
        Search:{' '}
        <input value={value} onChange={e=>{
          setValue(e.target.value)
        }} />
    </span>
  )
}
