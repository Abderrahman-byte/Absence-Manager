import React from 'react'
import { NavLink } from 'react-router-dom'

// This should be generic

const Navbar = ({ children }) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px" }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">LOGO</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to='/elements' className='nav-link text-white'>Elements</NavLink>
          </li>
          <li>
            <NavLink to='/faculty' className='nav-link text-white'>Filières</NavLink>
          </li>
          <li>
            <NavLink to='/sessions' className='nav-link text-white'>Séances</NavLink>
          </li>
        </ul>
        <hr/>
        {children}
      </div>
    )
}

export default Navbar