import { deleteAccount, getAccount } from '@Services/accounts.admin'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

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

            <div className='alert alert-warning'>
                <p className='text-center'>Voulez-vous vraiment supprimer le compte de {account.last_name} {account.first_name} ?</p>
                
                <div className='d-flex justify-content-center'>
                    <button onClick={deleteAccountCallback} className='btn btn-danger me-3'>Confimer</button>
                    <button onClick={goBack} className='btn btn-primary'>Revenir</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountPage 