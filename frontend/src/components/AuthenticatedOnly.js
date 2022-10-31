import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '@Context/AuthContext'

const AuthenticatedOnly = ({ loginUrl, children }) => {
	const { authenticated } = useContext(AuthContext)

	if (authenticated === undefined) return <></>

	else if (!authenticated) return <Navigate to={loginUrl || '/login'} />

	return <>{children}</>
}

export default AuthenticatedOnly
