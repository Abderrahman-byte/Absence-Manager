import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@Context/AuthContext'
import Navbar from '@Components/Navbar'
import AccountDropdown from '@Components/AccountDropodown'

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
    
    return (
        <div className='MainPage d-flex flex-nowrap'>
            <Navbar>
                <AccountDropdown username={account?.last_name + ' ' + account?.first_name} />
            </Navbar>
            {account?.is_admin ?
                <p>If you enter this page, that means you're admin</p> 
                : <p>If you enter this page, that means you're authenticated</p>
            }
        </div>
    )
}

export default MainPages