import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SignUpSuccess from './pages/SignUpSuccess'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AuthCallback from './pages/AuthCallback'
import RedirectToAuthCallback from './pages/RedirectToAuthCallback'
import RedirectToResetPassword from './pages/RedirectToResetPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/success" element={<SignUpSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login/reset-password" element={<RedirectToResetPassword />} />
      <Route path="/login/auth/callback" element={<RedirectToAuthCallback />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
