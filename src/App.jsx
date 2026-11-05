import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReservationProvider } from './context/ReservationContext'

import ClientLayout from './components/common/ClientLayout'
import AdminLayout from './components/common/AdminLayout'

import Home from './pages/Home'
import BookingWizard from './pages/BookingWizard'
import BookingSuccess from './pages/BookingSuccess'

import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCalendar from './pages/AdminCalendar'
import AdminReservations from './pages/AdminReservations'

// si no hay sesión, manda al login
function AdminProtectedRoute({ children }) {
  const hasSession =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('ambar_admin_session') === 'authenticated'

  if (!hasSession) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// rutas de la app
export default function App() {
  return (
    <ReservationProvider>
      <BrowserRouter>
        <Routes>
          {/* rutas del cliente */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/reservar" element={<BookingWizard />} />
            <Route path="/reserva-exitosa" element={<BookingSuccess />} />
          </Route>

          {/* login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* rutas del admin */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="calendario" element={<AdminCalendar />} />
            <Route path="reservas" element={<AdminReservations />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ReservationProvider>
  )
}
