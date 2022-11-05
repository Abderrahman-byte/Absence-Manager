import React from 'react'
import { Route, Routes } from 'react-router'

import AccountsPage from '@Pages/accounts.page'
import DeleteAccountPage from '@Pages/DeleteAccount.page'

const AdminRoutes = () => {
	return (
		<Routes>
			<Route index
				element={
					<div>
						<h6>Main page is not implement yet</h6>
					</div>
				}
			/>
            <Route path='/accounts' element={<AccountsPage />} />
            <Route path='/accounts/delete/:id' element={<DeleteAccountPage />} />
		</Routes>
	)
}

export default AdminRoutes
