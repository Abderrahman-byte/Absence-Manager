import React, { useEffect, useState } from 'react'

import AccountsList from '@Components/AccountsList'
import { getAccountsList } from '@Services/accounts.admin'

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchvalue] = useState(null)
    const itemsPerPage = 10

    const fetchAccountsData = async () => {
        const data = await getAccountsList(currentPage, itemsPerPage)
        setAccounts(data.results || [])
        setHasNext(data.next ? true : false)
        setHasPrevious(data.previous ? true : false)
    }

    const nextPage = () => setCurrentPage(currentPage + 1)
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        fetchAccountsData()
    }, [currentPage])

    return (
        <div className='AccountPage'>
            <h2 className='mb-3'>Accounts Page</h2>

            <div className='mb-2'>
                <input 
                    value={searchValue} 
                    onChange={e => setSearchvalue(e.target.value)} 
                    type='text' 
                    className='form-control' 
                    placeholder='Rechercher les comptes' 
                />
            </div>

            <AccountsList 
                accounts={searchValue ? [] : accounts} 
                hasNext={searchValue ? false : hasNext} 
                hasPrevious={searchValue ? false : hasPrevious} 
                nextPage={nextPage} 
                previousPage={previousPage} 
            />
        </div>
    )
}

export default AccountsPage