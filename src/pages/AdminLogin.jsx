import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'

// Login del admin. Es simulado: usuario admin / contraseña admin123.
// Si es correcto, guarda una marca en sessionStorage y va al dashboard.
export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: 'admin', password: 'admin123' })
  const [errorMessage, setErrorMessage] = useState('')
  const [videoError, setVideoError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const videoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Ámbar | Acceso Administrativo'

    // Detectar preferencia del usuario por reducción de movimiento
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Forzar autoplay real con muted=true a nivel de propiedad DOM para iOS y Android
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && !videoError) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay silenciado restringido por el dispositivo; mantiene el fondo oscuro sólido
        })
      }
    }
  }, [prefersReducedMotion, videoError])

  const handleLogin = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const user = credentials.username.trim()
    const pass = credentials.password.trim()

    // Validación de credenciales demo
    const isValidUser = user === 'admin' || user === 'admin@ambar.pe'
    const isValidPass = pass === 'admin123'

    if (isValidUser && isValidPass) {
      sessionStorage.setItem('ambar_admin_session', 'authenticated')
      navigate('/admin/dashboard')
    } else {
      setErrorMessage(
        'Credenciales no válidas. Usa las credenciales del prototipo: usuario admin y contraseña admin123'
      )
    }
  }

  return (
    <div className="relative min-h-[100dvh] bg-[#101010] text-[#F3F3F3] flex items-center justify-center p-6 font-golos overflow-hidden">
      {/* Video de fondo decorativo cinematográfico (visible en móvil y desktop) */}
      {!prefersReducedMotion && !videoError && (
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center pointer-events-none select-none motion-reduce:hidden"
            aria-hidden="true"
          >
            <source
              src="https://framerusercontent.com/assets/iMCCVi9vyK9lyjzUZ1HkXlcRY.mp4"
              type="video/mp4"
            />
          </video>
          {/* Velo oscuro para contraste accesible >= 4.5:1 */}
          <div className="absolute inset-0 bg-black/70 pointer-events-none" aria-hidden="true" />
        </div>
      )}

      {/* Formulario y panel de control por encima del video con relative z-10 */}
      <div className="relative z-10 w-full max-w-md bg-[#101010]/95 sm:bg-[#101010]/90 border border-[#F3F3F3]/20 p-8 sm:p-10 space-y-6 shadow-2xl">
        {/* Cabecera Editorial */}
        <div className="border-b border-[#F3F3F3]/15 pb-6 text-center space-y-2">
          <div className="w-10 h-10 mx-auto border border-[#6F1D1B] bg-[#6F1D1B]/20 flex items-center justify-center text-[#F3F3F3]">
            <Lock className="w-4 h-4 text-[#F3F3F3]" aria-hidden="true" />
          </div>
          <h1 className="font-serif-classic text-3xl font-normal uppercase tracking-wider text-[#F3F3F3]">
            ÁMBAR
          </h1>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#919191] block">
            Portal Administrador • Sala & Maitre
          </span>
        </div>

        {/* Aviso visible de acceso simulado */}
        <div className="p-4 border border-[#F3F3F3]/20 bg-white/5 space-y-1 text-xs font-mono">
          <p className="text-[#F3F3F3] font-semibold">
            Acceso simulado para prototipo, no es autenticación real.
          </p>
          <p className="text-[#919191] text-[11px]">
            Demo: usuario <strong className="text-[#F3F3F3]">admin</strong> / contraseña{' '}
            <strong className="text-[#F3F3F3]">admin123</strong>
          </p>
        </div>

        {/* Error accesible con role="alert" */}
        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 border-l-2 border-[#6F1D1B] bg-[#6F1D1B]/15 text-[#F3F3F3] text-xs font-mono flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-[#F3F3F3] shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-user"
              className="block text-xs font-mono uppercase tracking-[0.15em] text-[#919191] mb-1.5 font-medium"
            >
              Usuario
            </label>
            <input
              id="admin-user"
              type="text"
              autoComplete="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 bg-[#181818] border border-[#F3F3F3]/20 text-[#F3F3F3] text-sm font-golos focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-pass"
              className="block text-xs font-mono uppercase tracking-[0.15em] text-[#919191] mb-1.5 font-medium"
            >
              Contraseña
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 bg-[#181818] border border-[#F3F3F3]/20 text-[#F3F3F3] text-sm font-golos focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
              placeholder="admin123"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010]"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Acceder al Panel de Control</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#F3F3F3]/10 text-center">
          <Link
            to="/"
            className="text-xs font-mono uppercase tracking-wider text-[#919191] hover:text-[#F3F3F3] transition-colors"
          >
            ← Volver al sitio público de Ámbar
          </Link>
        </div>
      </div>
    </div>
  )
}
