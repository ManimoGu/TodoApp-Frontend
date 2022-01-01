import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgetPasswordPage from '../auth/FogottenPass'
import LoginPage from '../auth/Login'
import RegisterPage from '../auth/Register'
import ResetPasswordPage from '../auth/ResetPass'




const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route
                    
                    path="/register"
                    element={<RegisterPage/>}
                />

                <Route
                    
                    path="/Login"
                    element={<LoginPage/>}
                />

                <Route
                    
                    path="/ForgottenPass"
                    element={<ForgetPasswordPage/>}
                />

                <Route
                    
                    path="/ResetPass/:email/code/:token"
                    element={<ResetPasswordPage/>}
                />

                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute