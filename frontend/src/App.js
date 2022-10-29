import React from 'react'
import { Routes, Route } from 'react-router'

import LoginPage from './pages/login.page'
import MainPages from './pages/main.pages'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='login' element={<LoginPage />} />
				<Route index element={<MainPages />} />
			</Routes>
		</div>
	)
}

export default App
