import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@Context/AuthContext'
import Navbar from '@Components/Navbar'
import AdminRoutes from '@Routes/admin.routes'
import UserRoutes from '@Routes/user.routes'

const userRoutes = [
	{
		to: '/elements',
		label: 'Elements',
	},
	{
		label: 'Filières',
		to: '/faculty',
	},
	{
		to: '/sessions',
		label: 'Séances',
	},
]

const adminRoutes = [
	{
		to: '',
		label: 'Principale',
	},
	{
		label: 'Gestion des Comptes',
		to: '/accounts',
	},
]

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
            <Navbar navLinks={account?.is_admin ? adminRoutes : userRoutes} account={account} />
            <div className='content p-3 pb-5'>
                {account?.is_admin ? <AdminRoutes />: <UserRoutes />}
            </div>
        </div>
    )
}

export default MainPages