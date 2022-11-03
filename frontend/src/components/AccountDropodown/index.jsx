import { AuthContext } from '@Context/AuthContext'
import React, { useContext } from 'react'

import defaultAvatar from '../../assets/avatar-default.svg'

const AccountDropdown = ({ username }) => {
	const { logout } = useContext(AuthContext)

    return (
    	<div className="dropdown">
        	<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        		<img src={defaultAvatar} alt="" width="32" height="32" className="rounded-circle me-2" />
            	<strong>{username}</strong>
          	</a>
          	<ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            	{/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
            	<li><a className="dropdown-item" href="#">Settings</a></li>
            	{/* <li><a className="dropdown-item" href="#">Profile</a></li> */}
            	<li><hr className="dropdown-divider" /></li>
            	<li><button className="dropdown-item" onClick={logout}>Sign out</button></li>
          	</ul>
        </div>
    )
}

export default AccountDropdown