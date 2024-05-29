import { useContext, useState } from "react"
import { ThemeContext } from "./ThemeContext"

export const Box = () => {
    const [toggleTheme,setToggleTheme]=useState(true)
    const theme = useContext(ThemeContext)
    const day = {
        backgroundColor: theme.primary.main,
        color: theme.primary.text,
        border: theme.primary.border,
        padding:'15px'
    }
    const night = {
        backgroundColor: theme.secondary.main,
        color: theme.secondary.text,
        border: theme.secondary.border,
        padding:'15px'
    }
  return (
    <>
        <div style={toggleTheme?day:night}>
            <h2>Theme Context</h2>
            <button style={toggleTheme?day:night} onClick={()=>setToggleTheme(!toggleTheme)}>Switch Theme</button>
        </div>
    </>
  )
}
