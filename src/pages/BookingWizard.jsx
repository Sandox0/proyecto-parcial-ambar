import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Sparkles, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react'
import { useReservationContext } from '../context/ReservationContext'
import DateSelector from '../components/client/DateSelector'
import ReservationForm from '../components/client/ReservationForm'
import PaymentStep from '../components/client/PaymentStep'
import { PROTOTYPE_DATE } from '../data/mockReservations'

// Asistente de reserva de 3 pasos: 1) fecha y turno, 2) ficha técnica, 3) pago de garantía.
export default function BookingWizard() {
  const navigate = useNavigate()
  const { getAvailability, addReservation, isLoading } = useReservationContext()

  // Paso actual: 1 = fecha/hora, 2 = ficha técnica, 3 = pago
  const [currentStep, setCurrentStep] = useState(1)

  // Todos los datos de la reserva que se está llenando
  const [reservationState, setReservationState] = useState({
    date: PROTOTYPE_DATE,
    time: '20:00',
    guests: 2,
    customerName: '',
    email: '',
    phone: '',
    experience: 'Menú Degustación Raíces (7 Tiempos)',
    tableLocation: 'Salón Principal (Luz Cenital)',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [step1Error, setStep1Error] = useState('')
  const [collisionWarning, setCollisionWarning] = useState('')

  // useEffect: cada vez que cambia fecha, hora o comensales, revisa si el turno sigue disponible
  useEffect(() => {
    if (reservationState.date && reservationState.time) {
      const slotAvail = getAvailability(reservationState.date, reservationState.time)
      if (slotAvail.isFull || !slotAvail.isAvailable) {
        setCollisionWarning(
          `Atención: El turno de las ${reservationState.time} hrs para el ${reservationState.date} ha alcanzado su límite de aforo (4 mesas). Por favor elige otro horario disponible.`
        )
      } else if (slotAvail.remainingSeats < Number(reservationState.guests || 2)) {
        setCollisionWarning(
          `Cupo limitado: Solo quedan ${slotAvail.remainingSeats} asientos disponibles en este turno.`
        )
      } else {
        setCollisionWarning('')
      }
    }
  }, [reservationState.date, reservationState.time, reservationState.guests])

  // Actualiza un campo de la reserva (sirve para todos los inputs)
  const handleFieldChange = (field, value) => {
    setReservationState((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (submissionError) setSubmissionError('')
    if (step1Error) setStep1Error('')
  }

  // Avanzar al Paso 2 si hay fecha y hora seleccionada
  const handleProceedToStep2 = () => {
    if (!reservationState.date || !reservationState.time) {
      setStep1Error('Por favor selecciona una fecha y una hora antes de continuar.')
      return
    }
    setStep1Error('')
    setCurrentStep(2)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  // Retroceder al Paso 1
  const handleBackToStep1 = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  // Paso 2 -> Paso 3: la ficha ya fue validada por ReservationForm
  const handleGoToPayment = () => {
    setSubmissionError('')
    setCurrentStep(3)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  // Volver de Pago a la ficha técnica
  const handleBackToStep2 = () => {
    setSubmissionError('')
    setCurrentStep(2)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  // Al pagar: guardamos la reserva y vamos al voucher
  const handleFinalSubmit = (payment) => {
    setIsSubmitting(true)
    setSubmissionError('')

    setTimeout(() => {
      const result = addReservation({
        customerName: reservationState.customerName,
        email: reservationState.email,
        phone: reservationState.phone,
        date: reservationState.date,
        time: reservationState.time,
        guests: Number(reservationState.guests || 2),
        experience: reservationState.experience,
        tableLocation: reservationState.tableLocation,
        notes: reservationState.notes,
        status: 'confirmed',
        payment,
      })

      setIsSubmitting(false)

      if (result.success) {
        navigate('/reserva-exitosa', {
          state: { reservation: result.reservation },
        })
      } else {
        setSubmissionError(result.message || 'Error al procesar la reserva.')
      }
    }, 600)
  }

  // ¿El turno elegido todavía tiene mesa? (si no, se bloquea el botón de continuar)
  const slot = getAvailability(reservationState.date, reservationState.time)
  const turnoDisponible = slot.isAvailable && !slot.isFull

  return (
    <div className="w-full bg-[#F3F3F3] text-[#101010] font-golos py-12 px-6 sm:px-12 lg:px-20 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ENCABEZADO EDITORIAL DEL ASISTENTE */}
        <header className="pb-8 border-b border-[#101010]/20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#6F1D1B]" aria-hidden="true" />
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#6F1D1B] font-bold">
              Protocolo de Reserva • Sala & Fuego
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif-classic text-4xl sm:text-6xl uppercase tracking-tight text-[#101010]">
                Reserva tu Mesa
              </h1>
              <p className="text-sm sm:text-base text-[#101010]/75 font-serif-classic italic mt-2 max-w-xl">
                "Un recorrido sensorial a través de la geografía, fermentos y cocina viva del Perú."
              </p>
            </div>

            {/* Stepper técnico de 4 pasos */}
            <nav aria-label="Progreso de la reserva" className="flex items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => currentStep > 1 && setCurrentStep(1)}
                disabled={currentStep === 1}
                aria-current={currentStep === 1 ? 'step' : undefined}
                aria-label="Paso 1: Fecha y Turno"
                className={`p-2 border transition-all focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 ${
                  currentStep === 1
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] font-bold shadow-xs'
                    : 'bg-white hover:bg-[#EAEAEA] text-[#101010] border-[#101010]/25 cursor-pointer'
                }`}
              >
                01 • FECHA & TURNO
              </button>

              <span className="text-[#101010]/40" aria-hidden="true">
                —
              </span>

              <div
                aria-current={currentStep === 2 ? 'step' : undefined}
                className={`p-2 border transition-all ${
                  currentStep === 2
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] font-bold shadow-xs'
                    : 'bg-white/50 text-[#101010]/50 border-[#101010]/15'
                }`}
              >
                02 • FICHA TÉCNICA
              </div>

              <span className="text-[#101010]/40" aria-hidden="true">
                —
              </span>

              <div
                aria-current={currentStep === 3 ? 'step' : undefined}
                className={`p-2 border transition-all ${
                  currentStep === 3
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010] font-bold shadow-xs'
                    : 'bg-white/50 text-[#101010]/50 border-[#101010]/15'
                }`}
              >
                03 • PAGO
              </div>

              <span className="text-[#101010]/40" aria-hidden="true">
                —
              </span>

              <div className="p-2 border bg-white/30 text-[#101010]/40 border-[#101010]/10">
                04 • VOUCHER
              </div>
            </nav>
          </div>
        </header>

        {/* ALERTA DE COLISIÓN O AFORO MÁXIMO (ROLE="ALERT") */}
        {collisionWarning && (
          <div
            role="alert"
            aria-live="polite"
            className="p-4 bg-[#6F1D1B]/10 border-l-4 border-[#6F1D1B] text-[#6F1D1B] text-xs font-mono flex items-center gap-3"
          >
            <span className="font-bold uppercase tracking-wider text-[#6F1D1B]">Aviso de Aforo:</span>
            <span>{collisionWarning}</span>
          </div>
        )}

        {/* ERROR DE VALIDACIÓN DEL PASO 1 */}
        {step1Error && (
          <div
            role="alert"
            className="p-4 bg-[#6F1D1B]/10 border-l-4 border-[#6F1D1B] text-[#6F1D1B] text-xs font-mono flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-[#6F1D1B] shrink-0" aria-hidden="true" />
            <span>{step1Error}</span>
          </div>
        )}

        {/* CONTENIDO DEL WIZARD (SIN CAJAS BLANCAS CON GLASSMORPHISM) */}
        <main className="space-y-8">
          {currentStep === 1 && (
            <div className="space-y-12">
              <DateSelector
                selectedDate={reservationState.date}
                onDateChange={(val) => handleFieldChange('date', val)}
                selectedTime={reservationState.time}
                onTimeChange={(val) => handleFieldChange('time', val)}
                getAvailability={getAvailability}
              />

              <div className="pt-8 border-t border-[#101010]/20 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  disabled={
                    !reservationState.date ||
                    !reservationState.time ||
                    isLoading ||
                    !turnoDisponible
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Continuar a Ficha Técnica de Mesa</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <ReservationForm
              formData={reservationState}
              onChange={handleFieldChange}
              onSubmit={handleGoToPayment}
              onBack={handleBackToStep1}
              selectedDate={reservationState.date}
              selectedTime={reservationState.time}
              isSubmitting={isSubmitting}
              errorMessage={submissionError}
            />
          )}

          {currentStep === 3 && (
            <PaymentStep
              guests={reservationState.guests}
              date={reservationState.date}
              time={reservationState.time}
              onBack={handleBackToStep2}
              onConfirm={handleFinalSubmit}
              isSubmitting={isSubmitting}
              errorMessage={submissionError}
            />
          )}
        </main>

        {/* PIE TÉCNICO DE CONDICIONES */}
        <footer className="pt-8 border-t border-[#101010]/15 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#101010]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6F1D1B]" aria-hidden="true" />
            <span>Garantía de S/. 50 por comensal, descontable de tu cuenta</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Cancelación gratuita hasta 24h antes</span>
            <span>•</span>
            <span>Atención a restricciones alimentarias</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
