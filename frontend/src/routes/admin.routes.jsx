import React from 'react'
import { Route, Routes } from 'react-router'

import AccountsPage from '@Pages/accounts.page'
import DeleteAccountPage from '@Pages/DeleteAccount.page'
import EditAccountPage from '@Pages/EditAccount.page'
import CreateAccountPage from '@Pages/createAccount.page'
import DepartementsPage from '@Pages/departements.page'
import EditDepartementPage from '@Pages/EditDepartement.page'
import CreateDepartementPage from '@Pages/CreateDepartement.page'
import FacultiesPage from '@Pages/Faculties.page'
import DeleteDepartementPage from '@Pages/DeleteDepartement.page'
import EditFacultyPage from '@Pages/EditFaculty.page'
import CreateFacultyPage from '@Pages/CreateFaculty.page'
import DeleteFacultyPage from '@Pages/DeleteFaculty.page'

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
            <Route path='/accounts/edit/:id' element={<EditAccountPage />} />
            <Route path='/accounts/add' element={<CreateAccountPage />} />

			<Route path='/departements' element={<DepartementsPage />} />
			<Route path='/departements/edit/:id' element={<EditDepartementPage />} />
			<Route path='/departements/delete/:id' element={<DeleteDepartementPage />} />
			<Route path='/departements/add' element={<CreateDepartementPage />} />

			<Route path='/faculty' element={<FacultiesPage />} />
			<Route path='/faculty/edit/:id' element={<EditFacultyPage />} />
			<Route path='/faculty/delete/:id' element={<DeleteFacultyPage />} />
			<Route path='/faculty/add' element={<CreateFacultyPage />} />
		</Routes>
	)
}

export default AdminRoutes
