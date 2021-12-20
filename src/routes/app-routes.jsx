import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from '../auth/register'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
