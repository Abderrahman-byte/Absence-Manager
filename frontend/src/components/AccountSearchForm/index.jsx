import React from 'react'

const AccountSearchForm = ({ searchValue, adminOnly, setSearchvalue, setAdminOnly}) => {
    return (
        <div className='card mb-3'>
            <div className='card-body'>
                <h3 className='card-title mb-3'>Filtrer les comptes</h3>
                <form className='d-flex align-items-center flex-wrap'>
                    <div class="me-5">
                        <input 
                            value={searchValue} 
                            onChange={e => setSearchvalue(e.target.value)} 
                            type='text' 
                            className='form-control' 
                            id='account-seach-input'
                            placeholder='Saisir pour filtrer' 
                        />
                    </div>

                    <div class="flex-shrink-0 form-check">
                        <input 
                            type='checkbox'
                            checked={adminOnly} 
                            onChange={e => setAdminOnly(e.target.checked)} 
                            className='form-check-input'
                            id='admin-only-input'
                            />
                        <label class="form-check-label" for="admin-only-input">Administrateur</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccountSearchForm