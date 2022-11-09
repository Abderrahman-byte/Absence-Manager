import React from 'react'
import { useNavigate } from 'react-router'

const ConfirmCard = ({ msg, confirmCallback, confirmBtn, returnBtn }) => {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div className='alert alert-warning'>
            <p className='text-center'>{msg}</p>
                
            <div className='d-flex justify-content-center'>
                <button onClick={confirmCallback} className='btn btn-danger me-3'>{confirmBtn || 'confirm'}</button>
                <button onClick={goBack} className='btn btn-primary'>{returnBtn || 'Return'}</button>
            </div>
        </div>
    )
}

export default ConfirmCard