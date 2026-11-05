import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Users,
  UtensilsCrossed,
  MapPin,
  FileText,
  AlertCircle,
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

// Paso 2 de la reserva: ficha técnica con datos del cliente, experiencia y ubicación de mesa.
export default function ReservationForm({
  formData,
  onChange,
  onSubmit,
  onBack,
  selectedDate,
  selectedTime,
  isSubmitting = false,
  errorMessage = '',
}) {
  const [touched, setTouched] = useState({})

  const experiences = [
    {
      id: 'raices',
      name: 'Menú Degustación Raíces (7 Tiempos)',
      desc: 'Exploración botánica de tubérculos andinos y fermentos milenarios.',
      price: 'S/. 320 / pax',
    },
    {
      id: 'marino',
      name: 'Almuerzo de Temporada Marina',
      desc: 'Pesca artesanal de anzuelo, maduraciones en frío y algas de Humboldt.',
      price: 'S/. 280 / pax',
    },
    {
      id: 'botanico',
      name: 'Maridaje Experimental Botánico',
      desc: 'Destilados in situ, maceraciones silvestres y vinos de altura peruanos.',
      price: 'S/. 190 / pax',
    },
  ]

  const tableLocations = [
    'Salón Principal (Luz Cenital)',
    'Barra Frente a Cocina Abierta',
    'Terraza Botánica Privada',
  ]

  const guestsOptions = [1, 2, 3, 4, 5, 6, 7, 8]

  // Validaciones de formulario
  const errors = {
    customerName: !formData.customerName?.trim() ? 'El nombre completo es requerido.' : '',
    email: !formData.email?.trim()
      ? 'El correo electrónico es requerido.'
      : !/\S+@\S+\.\S+/.test(formData.email)
      ? 'Ingresa un correo electrónico con formato válido.'
      : '',
    phone: !formData.phone?.trim() ? 'El teléfono de contacto es requerido.' : '',
    guests: !formData.guests || Number(formData.guests) < 1 ? 'Selecciona al menos 1 comensal.' : '',
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({
      customerName: true,
      email: true,
      phone: true,
      guests: true,
    })

    const hasErrors = Object.values(errors).some((err) => !!err)
    if (!hasErrors) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-golos text-[#101010]">
      {/* Mensaje de error general del servidor o aforo */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-8 p-4 bg-[#6F1D1B]/10 border-l-4 border-[#6F1D1B] text-[#6F1D1B] text-xs font-mono flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-[#6F1D1B] shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Disposición a 2 Columnas: Ficha Técnica a la izquierda + Panel Oscuro a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* COLUMNA PRINCIPAL: FICHA TÉCNICA NUMERADA (8 COLS) */}
        <div className="lg:col-span-8 space-y-12">
          {/* SECCIÓN 01 • NÚMERO DE COMENSALES */}
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <div className="pb-3 border-b border-[#101010]/15 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
                  Sección 01 • Aforo en Mesa
                </span>
                <legend className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                  Número de Comensales
                </legend>
              </div>
              <span className="text-[11px] font-mono text-[#101010]/60 hidden sm:inline">
                Máximo 8 por reserva online
              </span>
            </div>

            <p className="text-xs text-[#101010]/70">
              Para grupos mayores a 8 personas o eventos cerrados, contactar directamente a reservas@ambar.pe.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {guestsOptions.map((num) => {
                const isSelected = Number(formData.guests) === num
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onChange('guests', num)}
                    aria-pressed={isSelected}
                    aria-label={`${num} comensales`}
                    className={`w-12 h-12 border font-mono text-base font-bold transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] shadow-md ring-1 ring-[#6F1D1B]'
                        : 'bg-white hover:bg-[#F3F3F3] text-[#101010] border-[#101010]/20'
                    }`}
                  >
                    {num}
                  </button>
                )
              })}
            </div>
            {touched.guests && errors.guests && (
              <p role="alert" className="text-xs text-[#6F1D1B] font-mono">
                {errors.guests}
              </p>
            )}
          </fieldset>

          {/* SECCIÓN 02 • EXPERIENCIA GASTRONÓMICA */}
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <div className="pb-3 border-b border-[#101010]/15">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
                Sección 02 • Propuesta de Menú
              </span>
              <legend className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                Experiencia Sugerida
              </legend>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => {
                const isSelected = formData.experience === exp.name
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => onChange('experience', exp.name)}
                    aria-pressed={isSelected}
                    className={`w-full p-4 border text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] shadow-md'
                        : 'bg-white hover:bg-[#F3F3F3] text-[#101010] border-[#101010]/20'
                    }`}
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-serif-classic text-xl uppercase tracking-tight block">
                          {exp.name}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-[#6F1D1B] shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      <p
                        className={`text-xs leading-relaxed font-golos ${
                          isSelected ? 'text-[#919191]' : 'text-[#101010]/70'
                        }`}
                      >
                        {exp.desc}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold whitespace-nowrap self-start sm:self-center ${
                        isSelected ? 'text-[#F3F3F3]' : 'text-[#6F1D1B]'
                      }`}
                    >
                      {exp.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* SECCIÓN 03 • PREFERENCIA DE ZONA EN SALÓN */}
          <fieldset className="border-0 p-0 m-0 space-y-4">
            <div className="pb-3 border-b border-[#101010]/15">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
                Sección 03 • Distribución de Sala
              </span>
              <legend className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                Preferencia de Zona
              </legend>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tableLocations.map((loc) => {
                const isSelected = formData.tableLocation === loc
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => onChange('tableLocation', loc)}
                    aria-pressed={isSelected}
                    className={`p-3.5 border text-xs text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] font-semibold'
                        : 'bg-white hover:bg-[#F3F3F3] text-[#101010] border-[#101010]/20'
                    }`}
                  >
                    <span className="font-mono block">{loc}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* SECCIÓN 04 • DATOS DEL TITULAR */}
          <div className="space-y-6">
            <div className="pb-3 border-b border-[#101010]/15">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
                Sección 04 • Identificación
              </span>
              <h3 className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                Datos del Titular
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nombre Completo */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-xs font-mono uppercase tracking-[0.15em] text-[#101010] mb-2 font-semibold"
                >
                  Nombre Completo *
                </label>
                <input
                  id="customerName"
                  type="text"
                  autoComplete="name"
                  value={formData.customerName || ''}
                  onChange={(e) => onChange('customerName', e.target.value)}
                  onBlur={() => handleBlur('customerName')}
                  placeholder="Ej. Valeria Mendoza"
                  aria-required="true"
                  aria-invalid={touched.customerName && !!errors.customerName ? 'true' : 'false'}
                  aria-describedby={
                    touched.customerName && errors.customerName ? 'customerName-error' : undefined
                  }
                  className={`w-full px-4 py-3 border text-sm text-[#101010] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
                    touched.customerName && errors.customerName
                      ? 'border-[#6F1D1B] focus:border-[#6F1D1B]'
                      : 'border-[#101010]/25'
                  }`}
                />
                {touched.customerName && errors.customerName && (
                  <p id="customerName-error" role="alert" className="text-xs text-[#6F1D1B] font-mono mt-1.5">
                    {errors.customerName}
                  </p>
                )}
              </div>

              {/* Teléfono de Contacto */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-mono uppercase tracking-[0.15em] text-[#101010] mb-2 font-semibold"
                >
                  Teléfono (WhatsApp) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone || ''}
                  onChange={(e) => onChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+51 987 654 321"
                  aria-required="true"
                  aria-invalid={touched.phone && !!errors.phone ? 'true' : 'false'}
                  aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                  className={`w-full px-4 py-3 border text-sm text-[#101010] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
                    touched.phone && errors.phone
                      ? 'border-[#6F1D1B] focus:border-[#6F1D1B]'
                      : 'border-[#101010]/25'
                  }`}
                />
                {touched.phone && errors.phone && (
                  <p id="phone-error" role="alert" className="text-xs text-[#6F1D1B] font-mono mt-1.5">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Correo Electrónico */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-mono uppercase tracking-[0.15em] text-[#101010] mb-2 font-semibold"
                >
                  Correo Electrónico (para voucher digital) *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email || ''}
                  onChange={(e) => onChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="valeria@ejemplo.com"
                  aria-required="true"
                  aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 border text-sm text-[#101010] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
                    touched.email && errors.email
                      ? 'border-[#6F1D1B] focus:border-[#6F1D1B]'
                      : 'border-[#101010]/25'
                  }`}
                />
                {touched.email && errors.email && (
                  <p id="email-error" role="alert" className="text-xs text-[#6F1D1B] font-mono mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SECCIÓN 05 • RESTRICCIONES ALIMENTARIAS */}
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#101010]/15">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-1">
                Sección 05 • Requisitos Dietarios
              </span>
              <label
                htmlFor="notes"
                className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010] block"
              >
                Restricciones & Alergias
              </label>
            </div>
            <textarea
              id="notes"
              rows="3"
              value={formData.notes || ''}
              onChange={(e) => onChange('notes', e.target.value)}
              placeholder="Ej. Celebración de aniversario. Un comensal celíaco. Preferencia por maridaje botánico sin alcohol."
              className="w-full px-4 py-3 border border-[#101010]/25 text-sm text-[#101010] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] resize-none placeholder:text-[#767676]"
            ></textarea>
          </div>

          {/* BOTONES DE NAVEGACIÓN Y CONFIRMACIÓN */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#101010]/15">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#101010]/30 hover:border-[#101010] text-[#101010] text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a Horarios</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Cargando...' : 'Continuar al Pago de Garantía'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* COLUMNA LATERAL: PANEL OSCURO DE RESUMEN EN VIVO (4 COLS) */}
        <aside className="lg:col-span-4 bg-[#101010] text-[#F3F3F3] p-6 sm:p-8 border border-[#F3F3F3]/15 lg:sticky lg:top-28 space-y-6">
          <div className="border-b border-[#F3F3F3]/15 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#919191] block mb-1">
              Ficha Resumen
            </span>
            <h4 className="font-serif-classic text-2xl uppercase tracking-tight text-[#F3F3F3]">
              Tu Mesa en Ámbar
            </h4>
          </div>

          {/* Fotografía de ambiente donde realmente aporta valor */}
          <div className="relative h-44 overflow-hidden bg-[#181818] border border-[#F3F3F3]/10">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="Mesa asignada con luz tenue en el salón de Ámbar"
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-[10px] font-mono text-[#F3F3F3] tracking-wider uppercase">
                {formData.tableLocation || 'Salón Principal'}
              </span>
            </div>
          </div>

          {/* Datos técnicos del turno */}
          <div className="space-y-3 text-xs font-mono divide-y divide-[#F3F3F3]/10">
            <div className="pt-2 flex justify-between items-center text-[#919191]">
              <span>Fecha:</span>
              <strong className="text-[#F3F3F3]">{selectedDate}</strong>
            </div>
            <div className="pt-2 flex justify-between items-center text-[#919191]">
              <span>Horario:</span>
              <strong className="text-[#F3F3F3]">{selectedTime} hrs</strong>
            </div>
            <div className="pt-2 flex justify-between items-center text-[#919191]">
              <span>Comensales:</span>
              <strong className="text-[#F3F3F3]">{formData.guests || 2} personas</strong>
            </div>
            <div className="pt-2 flex justify-between items-start text-[#919191]">
              <span>Menú:</span>
              <strong className="text-[#F3F3F3] text-right max-w-[180px]">
                {formData.experience || 'Menú Raíces'}
              </strong>
            </div>
          </div>

          {/* Botón de modificación rápida */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="w-full py-2.5 border border-[#F3F3F3]/25 hover:border-[#F3F3F3] text-[#F3F3F3] text-[11px] font-mono uppercase tracking-[0.15em] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
            >
              Modificar Fecha u Hora
            </button>
          </div>

          {/* Aviso de exclusividad */}
          <div className="pt-4 border-t border-[#F3F3F3]/10 text-[11px] text-[#919191] font-mono space-y-1">
            <p>• Aforo garantizado de 4 mesas.</p>
            <p>• Cancelación gratuita hasta 24h antes.</p>
          </div>
        </aside>
      </div>
    </form>
  )
}
