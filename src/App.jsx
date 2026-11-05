import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReservationProvider } from './context/ReservationContext'

// Layouts
import ClientLayout from './components/common/ClientLayout'
import AdminLayout from './components/common/AdminLayout'

// Páginas del Módulo Cliente
import Home from './pages/Home'
import BookingWizard from './pages/BookingWizard'
import BookingSuccess from './pages/BookingSuccess'

// Páginas del Módulo Administrador
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCalendar from './pages/AdminCalendar'
import AdminReservations from './pages/AdminReservations'

// Protege las rutas del admin: si no hay sesión iniciada, manda al login.
function AdminProtectedRoute({ children }) {
  const hasSession =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('ambar_admin_session') === 'authenticated'

  if (!hasSession) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// Define todas las rutas (páginas) de la aplicación.
// El ReservationProvider envuelve todo para compartir las reservas entre cliente y admin.
export default function App() {
  return (
    <ReservationProvider>
      <BrowserRouter>
        <Routes>
          {/* MÓDULO CLIENTE (Rutas Públicas) */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/reservar" element={<BookingWizard />} />
            <Route path="/reserva-exitosa" element={<BookingSuccess />} />
          </Route>

          {/* MÓDULO ADMINISTRADOR (Autenticación) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* MÓDULO ADMINISTRADOR (Rutas Privadas / Panel) */}
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

          {/* Ruta por defecto (404 redirect) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ReservationProvider>
  )
}
