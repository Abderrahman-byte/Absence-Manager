import React, { useEffect, useState } from 'react'

import { blacklistToken, verifyAuth } from '@Services/authentication'
import { JWT_TOKEN_KEY } from '@Utils/env'
import { parseJWT } from '@Utils/generic'
import { getAccountInfo as getAccountInfoRemote } from '@Services/account'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(undefined)
    const [userClaims, setUserClaims] = useState(undefined)
    const [accountInfo, setAccountInfo] = useState(undefined)

    const getAccountInfo = async () => {
        if (accountInfo === null) return
        if (accountInfo) return accountInfo
        
        const data = await getAccountInfoRemote()

        setAccountInfo(data || null)

        return data
    }

    const setAuthenticationData = (data) => {
        setAuthenticated(data && data?.user_id ? true : false)
        setUserClaims(data && data?.user_id ? data : data)
        setAccountInfo(undefined)
    }

    const checkAuthentication = async () => {
        const data = await verifyAuth()
        setAuthenticationData(data)
    }

    const authenticate = (authToken) => {
        localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(authToken))
        setAuthenticationData(parseJWT(authToken?.refresh))
    }

    const logout = async () => {
        const authTokenStr = localStorage.getItem(JWT_TOKEN_KEY)

        if (!authTokenStr) return

        const authTokens = JSON.parse(authTokenStr)

        await blacklistToken(authTokens)

        localStorage.removeItem(JWT_TOKEN_KEY)
        setAuthenticated(false)
        setUserClaims(null)
        setAccountInfo(null)
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ 
            authenticated, 
            userClaims, 
            authenticate, 
            getAccountInfo, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    )
}