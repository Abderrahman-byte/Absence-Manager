import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@Context/AuthContext'
import Navbar from '@Components/Navbar'
import AccountDropdown from '@Components/AccountDropodown'
import AdminRoutes from '@Routes/admin.routes'
import UserRoutes from '@Routes/user.routes'

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
            <div className='content p-3 pb-5'>
                {account?.is_admin ? <AdminRoutes />: <UserRoutes />}
            </div>
        </div>
    )
}

export default MainPages