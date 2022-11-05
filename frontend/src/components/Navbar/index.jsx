import React from 'react'
import { NavLink } from 'react-router-dom'

import AccountDropdown from '@Components/AccountDropodown'

const Navbar = ({ navLinks = [], account }) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px" }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">LOGO</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
			      {navLinks.map((link, i) => <li key={i} className="nav-item">
            	<NavLink end to={link.to} className='nav-link text-white'>{link.label}</NavLink>
          	</li>)}
        </ul>
        <hr/>
        <AccountDropdown account={account} />
      </div>
    )
}

export default Navbar