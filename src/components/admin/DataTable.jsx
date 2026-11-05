import React, { useState } from 'react'
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Calendar,
  Users,
  ChevronDown,
} from 'lucide-react'
import StatusBadge from '../common/StatusBadge'

// Tabla de reservas del admin, con buscador y filtro por estado.
export default function DataTable({
  reservations = [],
  onStatusChange,
  isLoading = false,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'confirmed' | 'pending' | 'cancelled'

  // Aplicamos el filtro de estado y el buscador (nombre, email, id o fecha)
  const query = searchTerm.trim().toLowerCase()

  const filteredReservations = reservations.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false
    }

    if (query === '') {
      return true
    }

    return (
      item.customerName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.date.includes(query)
    )
  })

  return (
    <div className="bg-white border border-[#101010]/20 overflow-hidden">
      {/* Barra de Filtros y Búsqueda */}
      <div className="p-5 sm:p-6 border-b border-[#101010]/15 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Input de Búsqueda */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#101010]/50 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, email, fecha o #ID..."
            aria-label="Buscar reservas"
            className="w-full pl-10 pr-4 py-2 border border-[#101010]/20 text-xs text-[#101010] bg-[#F3F3F3]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] font-golos"
          />
        </div>

        {/* Filtros por Estado (Estilo Editorial con bordes nítidos, sin píldoras) */}
        <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Filtro de estados">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'confirmed', label: 'Confirmadas' },
            { id: 'pending', label: 'Pendientes' },
            { id: 'cancelled', label: 'Canceladas' },
          ].map((tab) => {
            const isSelected = statusFilter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap border focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
                  isSelected
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010]'
                    : 'bg-[#F3F3F3] hover:bg-[#EAEAEA] text-[#101010] border-[#101010]/15'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F3F3F3] border-b border-[#101010]/20 text-[11px] font-mono uppercase tracking-wider text-[#101010]/80 font-bold">
              <th className="py-3.5 px-6">ID & Cliente</th>
              <th className="py-3.5 px-6">Fecha & Turno</th>
              <th className="py-3.5 px-6">Comensales & Mesa</th>
              <th className="py-3.5 px-6">Experiencia</th>
              <th className="py-3.5 px-6">Estado</th>
              <th className="py-3.5 px-6 text-right">Acciones de Control</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#101010]/10 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#101010]/60 font-mono">
                  Sincronizando reservas desde el estado global...
                </td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#101010]/60 font-golos">
                  No se encontraron reservas que coincidan con los criterios de búsqueda.
                </td>
              </tr>
            ) : (
              filteredReservations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F3F3F3]/60 transition-colors group"
                >
                  {/* ID & Cliente */}
                  <td className="py-4 px-6">
                    <span className="font-mono text-[11px] font-bold text-[#6F1D1B] block">
                      #{item.id}
                    </span>
                    <span className="font-serif-classic text-base font-bold text-[#101010] block mt-0.5">
                      {item.customerName}
                    </span>
                    <span className="text-[11px] text-[#101010]/60 font-golos block truncate max-w-[180px]">
                      {item.email} • {item.phone}
                    </span>
                  </td>

                  {/* Fecha & Turno */}
                  <td className="py-4 px-6 font-mono text-xs">
                    <span className="font-bold text-[#101010] block">{item.date}</span>
                    <span className="text-[#6F1D1B] font-semibold block mt-0.5">
                      {item.time} hrs
                    </span>
                  </td>

                  {/* Comensales & Zona */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[#101010]">
                      <Users className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                      {item.guests} personas
                    </span>
                    <span className="text-[11px] text-[#101010]/65 font-golos block mt-0.5">
                      {item.tableLocation || 'Salón Principal'}
                    </span>
                  </td>

                  {/* Experiencia & Notas */}
                  <td className="py-4 px-6 max-w-xs">
                    <span className="font-medium text-[#101010] font-golos block truncate">
                      {item.experience || 'Menú Degustación'}
                    </span>
                    {item.notes ? (
                      <span className="text-[11px] text-[#101010]/75 italic font-golos block truncate mt-0.5" title={item.notes}>
                        "{item.notes}"
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#101010]/40 font-golos block mt-0.5">Sin notas especiales</span>
                    )}
                  </td>

                  {/* Estado */}
                  <td className="py-4 px-6">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Acciones de Gestión de Estado */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status !== 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(item.id, 'confirmed')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-900 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                          title="Confirmar Reserva"
                        >
                          <CheckCircle className="w-3 h-3" aria-hidden="true" />
                          <span className="hidden sm:inline">Confirmar</span>
                        </button>
                      )}

                      {item.status !== 'pending' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(item.id, 'pending')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white border border-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                          title="Poner en Pendiente"
                        >
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span className="hidden sm:inline">Pendiente</span>
                        </button>
                      )}

                      {item.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(item.id, 'cancelled')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white border border-rose-900 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B]"
                          title="Cancelar Reserva"
                        >
                          <XCircle className="w-3 h-3" aria-hidden="true" />
                          <span className="hidden sm:inline">Cancelar</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Resumen inferior */}
      <div className="px-6 py-4 bg-[#F3F3F3] border-t border-[#101010]/15 flex items-center justify-between text-xs font-mono text-[#101010]/70">
        <span>Mostrando {filteredReservations.length} de {reservations.length} reservas registradas</span>
        <span className="text-[#6F1D1B] font-bold uppercase tracking-wider">Ámbar Back-Office System</span>
      </div>
    </div>
  )
}
