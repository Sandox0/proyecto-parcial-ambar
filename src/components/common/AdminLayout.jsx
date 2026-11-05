import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CircleDot,
  User,
} from 'lucide-react'
import { useReservationContext } from '../../context/ReservationContext'

// Estructura del panel admin: menú lateral, encabezado móvil y botón de cerrar sesión.
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { stats, isLoading } = useReservationContext()
  const navigate = useNavigate()
  const location = useLocation()

  // Revisa si hay sesión iniciada (se guarda en sessionStorage)
  const hasSession =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('ambar_admin_session') === 'authenticated'

  // Cambia el título de la pestaña
  useEffect(() => {
    const adminTitles = {
      '/admin/dashboard': 'Ámbar | Panel de Control (Dashboard)',
      '/admin/calendario': 'Ámbar | Calendario de Ocupación',
      '/admin/reservas': 'Ámbar | Gestor de Reservas',
    }
    document.title = adminTitles[location.pathname] || 'Ámbar | Panel de Control'
  }, [location.pathname])

  if (!hasSession) {
    return <Navigate to="/admin/login" replace />
  }

  const navItems = [
    {
      name: 'Dashboard Operativo',
      to: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Calendario de Ocupación',
      to: '/admin/calendario',
      icon: Calendar,
      badge: null,
    },
    {
      name: 'Gestor de Reservas',
      to: '/admin/reservas',
      icon: ClipboardList,
      badge: stats.pending > 0 ? `${stats.pending} pend.` : null,
    },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('ambar_admin_session')
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#101010] font-golos flex flex-col md:flex-row selection:bg-[#6F1D1B] selection:text-[#F3F3F3]">
      {/* Encabezado para celular */}
      <header className="md:hidden bg-[#101010] text-[#F3F3F3] border-b border-[#F3F3F3]/15 px-6 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#6F1D1B]" aria-hidden="true" />
          <span className="font-serif-classic text-xl uppercase tracking-widest text-[#F3F3F3] font-bold">
            ÁMBAR <span className="text-[10px] text-[#919191] font-mono tracking-wider ml-1">Admin</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#F3F3F3] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
          aria-label="Abrir Menú"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Menú lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#101010] text-[#F3F3F3] border-r border-[#F3F3F3]/15 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-[#F3F3F3]/15">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#6F1D1B] bg-[#6F1D1B]/20 flex items-center justify-center text-[#F3F3F3]">
                <span className="w-2 h-2 rounded-full bg-[#6F1D1B]" aria-hidden="true" />
              </div>
              <div>
                <h1 className="font-serif-classic text-xl font-normal uppercase tracking-wider text-[#F3F3F3]">
                  ÁMBAR
                </h1>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#919191] uppercase block">
                  Back-Office Analítico
                </span>
              </div>
            </Link>
          </div>

          {/* Aviso de reservas en vivo */}
          <div className="px-6 py-3.5 border-b border-[#F3F3F3]/10 bg-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-[#919191] flex items-center gap-2 text-[11px]">
              <CircleDot className="w-3 h-3 text-emerald-400 animate-pulse" />
              {isLoading ? 'Sincronizando...' : 'Enlace en vivo'}
            </span>
            <span className="px-2 py-0.5 text-[10px] border border-[#F3F3F3]/20 bg-black/40 text-[#F3F3F3]">
              {stats.total} reservas
            </span>
          </div>

          {/* Enlaces del menú */}
          <nav className="p-4 space-y-1.5 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 uppercase tracking-wider transition-colors duration-150 border focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
                      isActive
                        ? 'bg-[#6F1D1B] text-[#F3F3F3] border-[#6F1D1B] font-semibold'
                        : 'text-[#919191] hover:text-[#F3F3F3] hover:bg-white/5 border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#101010] text-[#F3F3F3] border border-[#F3F3F3]/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Parte de abajo del menú */}
        <div className="p-4 border-t border-[#F3F3F3]/15 space-y-2">
          {/* Usuario y cerrar sesión */}
          <div className="p-3 bg-white/5 border border-[#F3F3F3]/10 flex items-center gap-3 mb-2">
            <div className="w-7 h-7 border border-[#F3F3F3]/20 flex items-center justify-center text-[#F3F3F3]">
              <User className="w-3.5 h-3.5 text-[#F3F3F3]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-mono font-medium text-[#F3F3F3] truncate">Maitre General</p>
              <p className="text-[10px] font-mono text-[#919191] truncate">maitre@ambar.pe</p>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#919191] hover:text-[#F3F3F3] hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#F3F3F3]" />
              <span>Portal Público</span>
            </div>
            <span className="text-[10px] text-[#919191]">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-rose-300 hover:text-white hover:bg-rose-950/40 border border-transparent hover:border-rose-900/40 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Fondo oscuro cuando el menú está abierto en celular */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/75 z-30 md:hidden"
        />
      )}

      {/* Contenido de la página */}
      <main className="flex-1 bg-[#F3F3F3] text-[#101010] p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
