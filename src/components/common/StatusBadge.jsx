import React from 'react'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

// Etiqueta pequeña que muestra el estado de una reserva (confirmada, pendiente o cancelada).
export default function StatusBadge({ status, showIcon = true, className = '' }) {
  const configs = {
    confirmed: {
      label: 'Confirmada',
      icon: CheckCircle2,
      style: 'bg-emerald-50 text-emerald-950 border-emerald-600/40',
      dotStyle: 'bg-emerald-600',
    },
    pending: {
      label: 'Pendiente',
      icon: Clock,
      style: 'bg-amber-50 text-amber-950 border-amber-600/40',
      dotStyle: 'bg-amber-600',
    },
    cancelled: {
      label: 'Cancelada',
      icon: XCircle,
      style: 'bg-rose-50 text-rose-950 border-rose-600/40',
      dotStyle: 'bg-rose-600',
    },
  }

  const current = configs[status] || configs.pending
  const Icon = current.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border ${current.style} ${className}`}
    >
      {showIcon ? (
        <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dotStyle}`} aria-hidden="true" />
      )}
      <span>{current.label}</span>
    </span>
  )
}
