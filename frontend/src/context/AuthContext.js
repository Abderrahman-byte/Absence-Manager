import React, { useEffect, useState } from 'react'

import { verifyAuth } from '@Services/authentication'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(undefined)
    const [userClaims, setUserClaims] = useState(undefined)

    const checkAuthentication = async () => {
        const data = await verifyAuth()

        setAuthenticated(data && data?.user_id ? true : false)
        setUserClaims(data && data?.user_id ? data : data)
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, userClaims }}>
            {children}
        </AuthContext.Provider>
    )
}