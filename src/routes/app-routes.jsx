import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgetPasswordPage from '../auth/forget-pass'
import LoginPage from '../auth/login'
import RegisterPage from '../auth/register'
import ResetPasswordPage from '../auth/reset-pass'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forget-pass" element={<ForgetPasswordPage />} />
                <Route path="/reset-pass" element={<ResetPasswordPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
