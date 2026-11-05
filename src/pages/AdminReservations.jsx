import React, { useState } from 'react'
import { PROTOTYPE_DATE, addDays } from '../data/mockReservations'
import {
  ClipboardList,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
} from 'lucide-react'
import { useReservationContext } from '../context/ReservationContext'
import DataTable from '../components/admin/DataTable'

// Lista de todas las reservas del admin, con opción de confirmar o cancelar.
export default function AdminReservations() {
  const {
    reservations,
    stats,
    isLoading,
    updateReservationStatus,
    addReservation,
  } = useReservationContext()

  const [notification, setNotification] = useState('')

  const handleStatusChange = (id, newStatus) => {
    const result = updateReservationStatus(id, newStatus)
    if (result.success) {
      setNotification(`Reserva #${id} actualizada a "${newStatus}".`)
      setTimeout(() => setNotification(''), 3000)
    }
  }

  // Crea una reserva de prueba
  const handleQuickAdd = () => {
    const sampleNames = ['Lucía Ferrando', 'Gonzalo Palacios', 'Fiorella Ramos']
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)]

    const res = addReservation({
      customerName: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@ejemplo.pe`,
      phone: '+51 981 223 344',
      date: addDays(PROTOTYPE_DATE, 1),
      time: '20:00',
      guests: 2,
      experience: 'Menú Degustación Raíces (7 Tiempos)',
      tableLocation: 'Salón Principal (Luz Cenital)',
      notes: 'Reserva creada desde el Back-Office.',
      status: 'pending',
    })

    if (res.success) {
      setNotification(`Nueva reserva creada con éxito para ${randomName}.`)
      setTimeout(() => setNotification(''), 3000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Título */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#101010]/15">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#101010]/20 bg-white text-[#6F1D1B] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Control CRUD de Reservas
          </div>
          <h1 className="font-serif-classic text-3xl sm:text-5xl font-normal uppercase tracking-tight text-[#101010]">
            Gestor de Reservas
          </h1>
          <p className="text-xs text-[#101010]/70 font-golos mt-1">
            Administración centralizada de comensales, estados y asignación de mesas en Ámbar.
          </p>
        </div>

        {/* Contadores y botón para crear una reserva de prueba */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 border border-[#101010]/20 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> {stats.confirmed}
            </span>
            <span className="text-[#101010]/30">•</span>
            <span className="flex items-center gap-1.5 text-amber-800 font-bold">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {stats.pending}
            </span>
            <span className="text-[#101010]/30">•</span>
            <span className="flex items-center gap-1.5 text-rose-800 font-bold">
              <XCircle className="w-3.5 h-3.5" aria-hidden="true" /> {stats.cancelled}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#6F1D1B] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2"
            title="Crear una reserva simulada rápida"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>+ Reserva Rápida</span>
          </button>
        </div>
      </div>

      {/* Mensaje temporal */}
      {notification && (
        <div
          role="status"
          className="p-4 border-l-4 border-[#6F1D1B] bg-white border border-[#101010]/20 text-[#101010] text-xs font-mono flex items-center justify-between"
        >
          <span className="font-semibold">✓ {notification}</span>
          <button
            type="button"
            onClick={() => setNotification('')}
            className="text-[#101010]/60 hover:text-[#101010] font-bold px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabla de reservas */}
      <DataTable
        reservations={reservations}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />
    </div>
  )
}
