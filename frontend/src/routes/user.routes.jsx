import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import ElementsPage from '@Pages/elements.page'
import FacultiesPage from '@Pages/faculties.page'
import ElementStatPage from '@Pages/elementstats.page'
import TeacherFacultyPage from '@Pages/teacherfaculty.page'

const UserRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='elements' />} />
            <Route path='/elements' element={<ElementsPage />} />
            <Route path='/element/:id' element={<ElementStatPage />} />
            <Route path='/faculty' element={<FacultiesPage />} />
            <Route path='/faculty/:id' element={<TeacherFacultyPage />} />
        </Routes>
    )
}

export default UserRoutes