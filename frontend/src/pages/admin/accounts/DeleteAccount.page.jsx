import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConfirmCard from '@Components/ConfirmCard'
import { deleteAccount, getAccount } from '@Services/accounts.admin'

const DeleteAccountPage  = () => {
    const [account, setAccount] = useState(undefined)

    const { id } = useParams()
    const navigate = useNavigate()

    const fetchAccount = async () => {
        const data = await getAccount(id)
        setAccount(data)
    }

    const goBack = () => navigate(-1)

    const deleteAccountCallback = () => {
        deleteAccount(id).then(() => {
            goBack()
        })
    }

    const accountFullName = useMemo(() => {
        if (account?.first_name || account?.last_name) 
            return `${account.last_name || ''} ${account.first_name || ''}`

        return account?.email
    }, [account])

    useEffect(() => {
        fetchAccount()
    }, [id])

    if (!account) return <></>

    return (
        <div className='DeleteAccountPage py-3 px-5'>
            <h2 className='mb-3'>Supprimer un compte</h2>
            <div className='card mb-4'>
                <div className='card-body'>
                    <p>Nom : <strong>{account.last_name} {account.first_name}</strong></p>
                    <p>Email : <strong>{account.email}</strong></p>
                </div>
            </div>

            <ConfirmCard 
                msg={`Voulez-vous vraiment supprimer le compte de ${accountFullName} ?`}
                confirmBtn='Confimer'
                returnBtn='Revenir'
                confirmCallback={deleteAccountCallback}
            />
        </div>
    )
}

export default DeleteAccountPage 