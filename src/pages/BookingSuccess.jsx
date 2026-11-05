import React, { useEffect } from 'react'
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Printer,
  Home,
  Mail,
  Sparkles,
  Phone,
} from 'lucide-react'

// Voucher de la reserva. Si alguien entra sin haber reservado, lo manda de vuelta a /reservar.
export default function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()

  // Toma la reserva que mandó el asistente de reserva
  const reservation = location.state?.reservation

  // Si entran directo por la URL, vuelve a /reservar
  useEffect(() => {
    if (!reservation) {
      navigate('/reservar', { replace: true })
    }
  }, [reservation, navigate])

  // Si no hay reserva, no muestra nada
  if (!reservation) {
    return <Navigate to="/reservar" replace />
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto font-golos text-[#101010]">
      {/* Título */}
      <div className="text-center mb-10 space-y-3">
        <div className="w-16 h-16 mx-auto bg-[#6F1D1B]/15 border border-[#6F1D1B] text-[#6F1D1B] flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-8 h-8 text-[#6F1D1B]" aria-hidden="true" />
        </div>

        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#6F1D1B] font-bold block">
          Reserva Confirmada
        </span>
        <h1 className="font-serif-classic text-4xl sm:text-5xl uppercase tracking-tight text-[#101010]">
          Te Esperamos en Ámbar
        </h1>
        <p className="text-sm sm:text-base text-[#101010]/75 font-serif-classic italic max-w-md mx-auto">
          "Un recorrido sensorial a través de la geografía, fermentos y cocina viva del Perú."
        </p>
      </div>

      {/* Voucher */}
      <div className="bg-white border border-[#101010]/20 shadow-xl overflow-hidden print:shadow-none print:border-[#101010]">
        {/* Parte de arriba del voucher */}
        <div className="bg-[#101010] text-[#F3F3F3] p-6 sm:p-8 flex items-center justify-between border-b border-[#F3F3F3]/15">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
              <span className="font-serif-classic text-2xl font-bold tracking-widest uppercase">
                ÁMBAR
              </span>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#919191] mt-0.5">
              Voucher de Reserva Oficial
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#919191] block">
              Código de Mesa
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#F3F3F3] bg-white/10 px-3 py-1 border border-[#F3F3F3]/20 block mt-1">
              #{reservation.id}
            </span>
          </div>
        </div>

        {/* Datos del voucher */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Titular y experiencia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#101010]/10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#101010]/60 font-mono block">
                Titular de la Reserva
              </span>
              <p className="text-xl font-serif-classic font-bold text-[#101010] mt-1">
                {reservation.customerName}
              </p>
              <div className="flex flex-col gap-1 text-xs font-mono text-[#101010]/70 mt-2">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                  {reservation.email}
                </span>
                {reservation.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                    {reservation.phone}
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#101010]/60 font-mono block">
                Experiencia Seleccionada
              </span>
              <p className="text-lg font-serif-classic font-medium text-[#6F1D1B] mt-1">
                {reservation.experience || 'Menú Degustación Raíces'}
              </p>
              <span className="text-xs font-mono text-[#101010]/75 mt-1 block">
                Zona Asignada: {reservation.tableLocation || 'Salón Principal'}
              </span>
            </div>
          </div>

          {/* Fecha, hora y comensales */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F3F3F3] border border-[#101010]/15 text-center">
            <div>
              <Calendar className="w-4 h-4 mx-auto text-[#6F1D1B] mb-1" aria-hidden="true" />
              <span className="text-[10px] uppercase font-mono text-[#101010]/60 block">Fecha</span>
              <span className="text-sm font-bold text-[#101010] font-mono">{reservation.date}</span>
            </div>
            <div>
              <Clock className="w-4 h-4 mx-auto text-[#6F1D1B] mb-1" aria-hidden="true" />
              <span className="text-[10px] uppercase font-mono text-[#101010]/60 block">Horario</span>
              <span className="text-sm font-bold text-[#101010] font-mono">{reservation.time} hrs</span>
            </div>
            <div>
              <Users className="w-4 h-4 mx-auto text-[#6F1D1B] mb-1" aria-hidden="true" />
              <span className="text-[10px] uppercase font-mono text-[#101010]/60 block">Comensales</span>
              <span className="text-sm font-bold text-[#101010] font-mono">{reservation.guests} personas</span>
            </div>
          </div>

          {/* Garantía pagada */}
          {reservation.payment && (
            <div className="flex items-center justify-between p-4 bg-[#F3F3F3] border border-[#101010]/15 text-xs font-mono">
              <span className="uppercase tracking-wider text-[#101010]/60">Garantía pagada</span>
              <span className="font-bold text-[#101010]">
                S/. {reservation.payment.amount} • {reservation.payment.method}
                {reservation.payment.last4 ? ` ****${reservation.payment.last4}` : ''}
              </span>
            </div>
          )}

          {/* Notas (si hay) */}
          {reservation.notes && (
            <div className="p-4 bg-[#F3F3F3] border-l-2 border-[#6F1D1B] text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#101010]/60 block">
                Indicaciones especiales registradas:
              </span>
              <p className="text-[#101010] italic font-serif-classic text-sm">
                "{reservation.notes}"
              </p>
            </div>
          )}

          {/* Recomendaciones */}
          <div className="pt-2 text-xs font-mono text-[#101010]/70 space-y-2 border-t border-[#101010]/10">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#6F1D1B] shrink-0" aria-hidden="true" />
              <span>
                <strong>Ubicación:</strong> Av. San Martín 380, Barranco, Lima — Valet parking disponible.
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#6F1D1B] shrink-0" aria-hidden="true" />
              <span>
                Sugerimos llegar 10 minutos antes para comenzar el maridaje sin interrupciones.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Botones del final */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F3F3F3] text-[#101010] border border-[#101010]/25 text-xs font-mono font-semibold uppercase tracking-[0.15em] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
          <span>Imprimir / Guardar Voucher</span>
        </button>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono font-semibold uppercase tracking-[0.15em] transition-all focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </div>
  )
}
