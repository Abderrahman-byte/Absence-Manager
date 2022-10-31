import { AuthContext } from '@Context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'

const MainPages = () => {
    const { getAccountInfo } = useContext(AuthContext)
    const [account, setAccount] = useState(undefined)

    const retreiveAccount = async () => {
        const accountInfo = await getAccountInfo()
        setAccount(accountInfo)
    }

    useEffect(() => {
        retreiveAccount()
    }, [])

    if (account === undefined) return <></>

    if (account?.is_admin) {
        return (
            <div className='MainPage'>
                <p>If you enter this page, that means you're admin</p>
            </div>
        )
    }

    return (
        <div className='MainPage'>
            <p>If you enter this page, that means you're authenticated</p>
        </div>
    )
}

export default MainPages