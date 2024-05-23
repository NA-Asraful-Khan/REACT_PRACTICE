import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" 
                         style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/super-heroes" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>Super Heroes Page</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq-super-heroes" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>React Query Super Heroes Page</NavLink>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar