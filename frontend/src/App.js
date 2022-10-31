import React from 'react'
import { Routes, Route } from 'react-router'

import AuthenticatedOnly from '@Components/AuthenticatedOnly'
import LoginPage from '@Pages/login.page'
import MainPages from '@Pages/main.pages'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='login' element={<LoginPage />} />
				<Route index element={<AuthenticatedOnly><MainPages /></AuthenticatedOnly>} />
			</Routes>
		</div>
	)
}

export default App
