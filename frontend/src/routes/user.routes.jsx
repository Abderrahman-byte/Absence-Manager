import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import TeacherElementsPage from '@Pages/teacher/TeacherElements.page'
import TeacherFacultiesPage from '@Pages/teacher/TeacherFaculties.page'
import TeacherElementStatPage from '@Pages/teacher/TeacherElementStat.page'
import TeacherFacultyPage from '@Pages/teacher/TeacherFaculty.page'

const UserRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='elements' />} />
            <Route path='/elements' element={<TeacherElementsPage />} />
            <Route path='/element/:id' element={<TeacherElementStatPage />} />
            <Route path='/faculty' element={<TeacherFacultiesPage />} />
            <Route path='/faculty/:id' element={<TeacherFacultyPage />} />
        </Routes>
    )
}

export default UserRoutes