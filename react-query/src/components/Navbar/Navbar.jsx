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
                          }}>Super Heroes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq-super-heroes" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>RQ Super Heroes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq-parallel" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>RTK Parallel</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dynamic-parallel" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>Dynamic Parallel</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq-dependent" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>Dependent Queries</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rq-paginated" style={({ isActive }) => {
                            return { color: isActive ? "rgb(221, 74, 74)" : "black" };
                          }}>Paginated Queries</NavLink>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar