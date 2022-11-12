import React from 'react'
import { Route, Routes } from 'react-router'

import AccountsPage from '@Pages/admin/accounts/accounts.page'
import DeleteAccountPage from '@Pages/admin/accounts/DeleteAccount.page'
import EditAccountPage from '@Pages/admin/accounts/EditAccount.page'
import CreateAccountPage from '@Pages/admin/accounts/CreateAccount.page'
import DepartementsPage from '@Pages/admin/departements/departements.page'
import EditDepartementPage from '@Pages/admin/departements/EditDepartement.page'
import CreateDepartementPage from '@Pages/admin/departements/CreateDepartement.page'
import FacultiesPage from '@Pages/admin/faculty/Faculties.page'
import DeleteDepartementPage from '@Pages/admin/departements/DeleteDepartement.page'
import EditFacultyPage from '@Pages/admin/faculty/EditFaculty.page'
import CreateFacultyPage from '@Pages/admin/faculty/CreateFaculty.page'
import DeleteFacultyPage from '@Pages/admin/faculty/DeleteFaculty.page'
import ModulesPage from '@Pages/admin/modules/modules.page'
import EditModulePage from '@Pages/admin/modules/EditModule.page'
import CreateModulePage from '@Pages/admin/modules/CreateModule.page'
import DeleteModulePage from '@Pages/admin/modules/DeleteModule.page'
import ElementsPage from '@Pages/admin/elements/elements.page'
import EditElementPage from '@Pages/admin/elements/EditElement.page'
import CreateElementPage from '@Pages/admin/elements/CreateElement.page'
import DeleteElementPage from '@Pages/admin/elements/DeleteElement.page'

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

			<Route path='/modules' element={<ModulesPage />} />
			<Route path='/modules/edit/:id' element={<EditModulePage />} />
			<Route path='/modules/add' element={<CreateModulePage />} />
			<Route path='/modules/delete/:id' element={<DeleteModulePage />} />

			<Route path='/elements' element={<ElementsPage />} />
			<Route path='/elements/edit/:id' element={<EditElementPage />} />
			<Route path='/elements/delete/:id' element={<DeleteElementPage />} />
			<Route path='/elements/add' element={<CreateElementPage />} />
		</Routes>
	)
}

export default AdminRoutes
