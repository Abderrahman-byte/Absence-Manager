import React, { useEffect, useMemo, useState } from 'react'

import AccountsList from '@Components/AccountsList'
import { getAccountsList, searchAccounts } from '@Services/accounts.admin'
import AccountSearchForm from '@Components/AccountSearchForm'
import { Link } from 'react-router-dom'

// TODO : add filter admin only on main list

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchvalue] = useState(null)
    const [searchResults, setSearchResults] = useState({})
    const [adminOnly, setAdminOnly] = useState(false)
    const itemsPerPage = 10

    const fetchAccountsData = async () => {
        const data = await getAccountsList(currentPage, itemsPerPage)
        setAccounts(data.results || [])
        setHasNext(data.next ? true : false)
        setHasPrevious(data.previous ? true : false)
    }

    const updateSearchResults = () => {
        if (!searchValue || searchValue.length <= 0 || searchValue in searchResults) return

        const cached = searchValue

        setTimeout(async () => {
            if (searchValue !== cached) return

            const data = await searchAccounts(searchValue, itemsPerPage)

            if (!data) return

            setSearchResults(prev => {
                prev[searchValue] = [...data]
                return {...prev}
            })
        }, 500)
    }

    const nextPage = () => setCurrentPage(currentPage + 1)
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const accountsData = useMemo(() => {
        const accountsList = !searchValue || searchValue.length <= 0 ? 
            accounts : 
            (searchResults[searchValue] || [])

        
        return adminOnly ? accountsList.filter(account => account.is_admin) : accountsList 
    }, [accounts, searchValue, adminOnly])

    useEffect(() => {
        updateSearchResults()
    }, [searchValue])

    useEffect(() => {
        fetchAccountsData()
    }, [currentPage])

    return (
        <div className='AccountPage'>
            <h3 className='mb-4'>Administration des comptes</h3>

            <div className='d-flex justify-content-end mb-3'>
                <Link to='/accounts/add' className='btn btn-primary'>Créer un compte</Link>
            </div>

            <AccountSearchForm 
                searchValue={searchValue} 
                adminOnly={adminOnly}
                setSearchvalue={setSearchvalue} 
                setAdminOnly={setAdminOnly}
            />

            <AccountsList 
                accounts={accountsData} 
                hasNext={searchValue ? false : hasNext} 
                hasPrevious={searchValue ? false : hasPrevious} 
                nextPage={nextPage} 
                previousPage={previousPage} 
            />
        </div>
    )
}

export default AccountsPage