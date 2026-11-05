import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ShieldCheck, CalendarCheck } from 'lucide-react'

// Estructura de las páginas del cliente: cabecera con menú, contenido y pie de página.
export default function ClientLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Efecto secundario de UI: Actualización reactiva del título del documento
  useEffect(() => {
    const titles = {
      '/': 'Ámbar — Cocina Experimental | Alta Gastronomía',
      '/reservar': 'Ámbar | Reservas',
      '/reserva-exitosa': 'Ámbar | Reserva Confirmada',
    }
    document.title = titles[location.pathname] || 'Ámbar — Cocina Experimental'
  }, [location.pathname])

  // Cerrar el menú móvil reactivamente al navegar, sin interceptar el click del usuario
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinkClasses = ({ isActive }) =>
    `text-xs uppercase tracking-[0.2em] font-golos py-2 border-b-2 ${
      isActive
        ? 'text-[#F3F3F3] border-[#6F1D1B] font-semibold'
        : 'text-[#F3F3F3]/70 hover:text-[#F3F3F3] border-transparent'
    } focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]`

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F3F3] text-[#101010] selection:bg-[#6F1D1B] selection:text-[#F3F3F3]">
      {/* Header sólido negro #101010 con z-50 y pointer-events-auto para respuesta inmediata en un solo clic */}
      <header className="print:hidden sticky top-0 z-50 bg-[#101010] text-[#F3F3F3] border-b border-[#F3F3F3]/15 relative pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
          {/* Logo y concepto editorial: ÁMBAR en Old Standard TT, sin círculo decorativo */}
          <Link
            to="/"
            className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] p-1 cursor-pointer"
            aria-label="Ámbar Cocina Experimental - Inicio"
          >
            <span className="font-serif-classic text-2xl sm:text-3xl tracking-[0.18em] uppercase text-[#F3F3F3] leading-none group-hover:text-white transition-colors">
              Ámbar
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#919191] font-golos mt-1">
              Cocina Experimental
            </span>
          </Link>

          {/* Enlaces de Navegación Desktop en Golos Text (un solo clic) */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClasses}>
              Inicio
            </NavLink>
            <NavLink to="/reservar" className={navLinkClasses}>
              Reservar Experiencia
            </NavLink>
          </nav>

          {/* Acciones & Botón Staff (Directos, un solo clic) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/reservar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer border border-[#6F1D1B] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010]"
            >
              <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reservar Mesa</span>
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-[#F3F3F3]/30 hover:border-[#F3F3F3] text-[#F3F3F3]/80 hover:text-[#F3F3F3] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010]"
              title="Acceso al Panel de Administración (Staff)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
              <span>Staff</span>
            </Link>
          </div>

          {/* Botón Menú Mobile con aria-expanded accesible */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden p-2 text-[#F3F3F3] hover:bg-white/10 border border-[#F3F3F3]/20 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desplegable Mobile Editorial (sin onClick que desmonte los enlaces antes de navegar) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#101010] border-t border-[#F3F3F3]/15 px-6 pt-4 pb-8 space-y-4 relative z-50">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block text-sm uppercase tracking-[0.2em] font-golos py-2 ${
                  isActive
                    ? 'text-[#F3F3F3] font-bold border-l-2 border-[#6F1D1B] pl-3'
                    : 'text-[#919191] hover:text-[#F3F3F3]'
                } focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/reservar"
              className={({ isActive }) =>
                `block text-sm uppercase tracking-[0.2em] font-golos py-2 ${
                  isActive
                    ? 'text-[#F3F3F3] font-bold border-l-2 border-[#6F1D1B] pl-3'
                    : 'text-[#919191] hover:text-[#F3F3F3]'
                } focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]`
              }
            >
              Reservar Experiencia
            </NavLink>
            <div className="pt-4 border-t border-[#F3F3F3]/15 flex flex-col gap-3">
              <Link
                to="/reservar"
                className="w-full text-center py-3 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono uppercase tracking-[0.2em] font-semibold border border-[#6F1D1B] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              >
                Reservar Mesa
              </Link>
              <Link
                to="/admin/login"
                className="w-full text-center py-2.5 border border-[#F3F3F3]/30 hover:border-[#F3F3F3] text-[#F3F3F3]/80 hover:text-[#F3F3F3] text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              >
                Staff / Panel Administrador
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Contenido Principal de las Vistas Cliente */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer Editorial para vistas secundarias */}
      {location.pathname !== '/' && (
        <footer className="print:hidden bg-[#101010] text-[#F3F3F3] border-t border-[#F3F3F3]/15 pt-16 pb-12 px-6 sm:px-12 lg:px-20 mt-auto">
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Columna 1: Marca & Concepto */}
              <div className="space-y-4">
                <span className="font-serif-classic text-2xl uppercase tracking-[0.2em] text-[#F3F3F3] block">
                  ÁMBAR
                </span>
                <p className="text-xs text-[#919191] font-golos leading-relaxed">
                  Laboratorio culinario dedicado a la biodiversidad, la fermentación biológica y el fuego del Perú.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#F3F3F3]/70">
                  <span className="w-2 h-2 rounded-full bg-[#6F1D1B]" aria-hidden="true" />
                  <span>Barranco, Lima — Perú</span>
                </div>
              </div>

              {/* Columna 2: Navegación */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3] font-semibold">
                  Navegación
                </h3>
                <ul className="space-y-2.5 text-xs font-golos text-[#919191]">
                  <li>
                    <Link to="/" className="hover:text-[#F3F3F3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link to="/reservar" className="hover:text-[#F3F3F3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]">
                      Reservar Experiencia
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/login" className="hover:text-[#F3F3F3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]">
                      Portal Staff
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Columna 3: Horarios */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3] font-semibold">
                  Horarios de Servicio
                </h3>
                <div className="space-y-2 text-xs font-mono text-[#919191]">
                  <p>
                    <span className="text-[#F3F3F3] block">Miércoles a Sábado</span>
                    <span>13:00 - 15:30 • 19:30 - 22:30</span>
                  </p>
                  <p>
                    <span className="text-[#F3F3F3] block">Domingos</span>
                    <span>13:00 - 16:30</span>
                  </p>
                  <p className="text-[11px] text-[#919191]/70 pt-1">
                    Lunes y Martes cerrados por investigación culinaria.
                  </p>
                </div>
              </div>

              {/* Columna 4: Contacto */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3] font-semibold">
                  Contacto Directo
                </h3>
                <div className="space-y-2 text-xs font-mono text-[#919191]">
                  <p>
                    <span className="text-[#919191]/70 block text-[10px] uppercase">Reservas & Prensa</span>
                    <a href="mailto:reservas@ambar.pe" className="text-[#F3F3F3] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]">
                      reservas@ambar.pe
                    </a>
                  </p>
                  <p>
                    <span className="text-[#919191]/70 block text-[10px] uppercase">Teléfono Concierge</span>
                    <span className="text-[#F3F3F3]">+51 987 654 321</span>
                  </p>
                  <p className="text-[11px] text-[#6F1D1B] pt-1 font-semibold uppercase tracking-wider">
                    Capacidad limitada: 16 comensales por servicio
                  </p>
                </div>
              </div>
            </div>

            {/* Cierre monumental con la palabra ÁMBAR en grande */}
            <div className="pt-10 border-t border-[#F3F3F3]/10 text-center select-none pointer-events-none opacity-15 overflow-hidden">
              <span className="font-serif-classic text-[16vw] sm:text-[14vw] leading-none uppercase text-[#F3F3F3] tracking-tighter block whitespace-nowrap">
                ÁMBAR
              </span>
            </div>

            {/* Barra inferior de Copyright */}
            <div className="pt-4 border-t border-[#F3F3F3]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#919191]">
              <p>© {new Date().getFullYear()} Ámbar Restaurante. Todos los derechos reservados.</p>
              <div className="flex items-center gap-6">
                <Link to="/admin/login" className="hover:text-[#F3F3F3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]">
                  Acceso Back-Office
                </Link>
                <span>Lima, Perú</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}