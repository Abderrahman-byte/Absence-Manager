import React, { useMemo } from 'react'

import TableGeneric from '@Components/TableGeneric'
import { Link } from 'react-router-dom'

const AccountsList = ({ accounts, hasNext, hasPrevious, nextPage, previousPage }) => {
    const accountsRows = useMemo(() => {
        return accounts.map(account => {
            return [
                account.last_name + ' ' + account.first_name,
                account.email, 
                (account.is_admin ? <input className='form-check-input' checked type='checkbox' readOnly/> : null),
                (<button className='btn btn-success'>Modifier</button>),
                (<Link to={`/accounts/delete/${account.id}`} className='btn btn-danger'>Supprimer</Link>)
            ]
        })
    }, [accounts])

    return (
        <div className='Accounts'>
            <TableGeneric colomns={['Nom', 'Email', 'Administrateur', '', '']} data={accountsRows} />

            {hasNext || hasPrevious ? (
                <div className='pagination-buttons'>
                    <button disabled={!hasPrevious} onClick={previousPage} className='btn btn-success d-inlineblock mx-1'>previous</button>
                    <button disabled={!hasNext} onClick={nextPage} className='btn btn-success d-inlineblock mx-1'>next</button>
                </div>
            ) : (null)}
        </div>
    )
}

export default AccountsList