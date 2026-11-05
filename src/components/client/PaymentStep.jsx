import React, { useState } from 'react'
import { CreditCard, Smartphone, ShieldCheck, ArrowLeft, AlertCircle, Lock } from 'lucide-react'

// Paso 3 de la reserva: pago de garantía SIMULADO (S/. 50 por comensal).
// No se guarda ningún dato real de tarjeta: solo el método y los últimos 4 dígitos.
export const DEPOSIT_PER_GUEST = 50

const onlyDigits = (value) => value.replace(/\D/g, '')

const formatCardNumber = (value) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function isExpiryValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  const lastDay = new Date(year, month, 0, 23, 59, 59)
  return lastDay >= now
}

export default function PaymentStep({
  guests,
  date,
  time,
  onBack,
  onConfirm,
  isSubmitting = false,
  errorMessage = '',
}) {
  const total = Number(guests || 1) * DEPOSIT_PER_GUEST

  const [method, setMethod] = useState('card') // 'card' | 'yape'
  const [card, setCard] = useState({ holder: '', number: '', expiry: '', cvv: '' })
  const [yapeCode, setYapeCode] = useState('')
  const [errors, setErrors] = useState({})

  const setCardField = (field, value) => {
    setCard((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (method === 'card') {
      if (card.holder.trim().length < 3) next.holder = 'Ingresa el nombre del titular.'
      if (onlyDigits(card.number).length !== 16) next.number = 'El número debe tener 16 dígitos.'
      if (!isExpiryValid(card.expiry)) next.expiry = 'Fecha inválida o vencida (MM/AA).'
      if (onlyDigits(card.cvv).length < 3) next.cvv = 'El CVV debe tener 3 dígitos.'
    } else if (onlyDigits(yapeCode).length !== 6) {
      next.yapeCode = 'Ingresa el código de aprobación de 6 dígitos.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onConfirm({
      method: method === 'card' ? 'Tarjeta' : 'Yape / Plin',
      last4: method === 'card' ? onlyDigits(card.number).slice(-4) : null,
      amount: total,
      currency: 'PEN',
      status: 'paid',
      paidAt: new Date().toISOString(),
    })
  }

  const fieldClass = (hasError) =>
    `w-full px-4 py-3 bg-white border text-sm font-mono text-[#101010] placeholder:text-[#101010]/40 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] ${
      hasError ? 'border-[#6F1D1B]' : 'border-[#101010]/30'
    }`

  const FieldError = ({ id, text }) =>
    text ? (
      <p id={id} role="alert" className="mt-1 text-xs font-mono text-[#6F1D1B]">
        {text}
      </p>
    ) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="font-golos text-[#101010]">
      {errorMessage && (
        <div
          role="alert"
          className="mb-8 p-4 bg-[#6F1D1B]/10 border-l-4 border-[#6F1D1B] text-[#6F1D1B] text-xs font-mono flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* DATOS DE PAGO */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#6F1D1B] font-bold">
              03 • Confirmación de Pago
            </span>
            <h2 className="font-serif-classic text-3xl uppercase mt-2">Garantiza tu mesa</h2>
            <p className="text-sm text-[#101010]/75 mt-2 max-w-xl">
              Para asegurar tu reserva pedimos una garantía de S/. {DEPOSIT_PER_GUEST} por comensal,
              que se descuenta de tu cuenta final. Este es un pago simulado para el prototipo.
            </p>
          </div>

          <fieldset>
            <legend className="text-xs uppercase font-mono tracking-[0.2em] text-[#101010]/70 mb-3">
              Método de pago
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                aria-pressed={method === 'card'}
                onClick={() => setMethod('card')}
                className={`flex items-center gap-3 p-4 border text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer ${
                  method === 'card'
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010]'
                    : 'bg-white border-[#101010]/30 hover:bg-[#EAEAEA]'
                }`}
              >
                <CreditCard className="w-5 h-5" aria-hidden="true" />
                <span>Tarjeta de crédito / débito</span>
              </button>
              <button
                type="button"
                aria-pressed={method === 'yape'}
                onClick={() => setMethod('yape')}
                className={`flex items-center gap-3 p-4 border text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer ${
                  method === 'yape'
                    ? 'bg-[#101010] text-[#F3F3F3] border-[#101010]'
                    : 'bg-white border-[#101010]/30 hover:bg-[#EAEAEA]'
                }`}
              >
                <Smartphone className="w-5 h-5" aria-hidden="true" />
                <span>Yape / Plin</span>
              </button>
            </div>
          </fieldset>

          {method === 'card' ? (
            <div className="space-y-5">
              <div>
                <label htmlFor="card-holder" className="block text-xs uppercase font-mono tracking-wider mb-2">
                  Nombre del titular
                </label>
                <input
                  id="card-holder"
                  type="text"
                  autoComplete="cc-name"
                  value={card.holder}
                  onChange={(e) => setCardField('holder', e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.holder)}
                  aria-describedby={errors.holder ? 'card-holder-error' : undefined}
                  className={fieldClass(errors.holder)}
                  placeholder="Como aparece en la tarjeta"
                />
                <FieldError id="card-holder-error" text={errors.holder} />
              </div>

              <div>
                <label htmlFor="card-number" className="block text-xs uppercase font-mono tracking-wider mb-2">
                  Número de tarjeta
                </label>
                <input
                  id="card-number"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={card.number}
                  onChange={(e) => setCardField('number', formatCardNumber(e.target.value))}
                  aria-required="true"
                  aria-invalid={Boolean(errors.number)}
                  aria-describedby={errors.number ? 'card-number-error' : undefined}
                  className={fieldClass(errors.number)}
                  placeholder="0000 0000 0000 0000"
                />
                <FieldError id="card-number-error" text={errors.number} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="card-expiry" className="block text-xs uppercase font-mono tracking-wider mb-2">
                    Vencimiento
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={card.expiry}
                    onChange={(e) => setCardField('expiry', formatExpiry(e.target.value))}
                    aria-required="true"
                    aria-invalid={Boolean(errors.expiry)}
                    aria-describedby={errors.expiry ? 'card-expiry-error' : undefined}
                    className={fieldClass(errors.expiry)}
                    placeholder="MM/AA"
                  />
                  <FieldError id="card-expiry-error" text={errors.expiry} />
                </div>
                <div>
                  <label htmlFor="card-cvv" className="block text-xs uppercase font-mono tracking-wider mb-2">
                    CVV
                  </label>
                  <input
                    id="card-cvv"
                    type="password"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    value={card.cvv}
                    onChange={(e) => setCardField('cvv', onlyDigits(e.target.value))}
                    aria-required="true"
                    aria-invalid={Boolean(errors.cvv)}
                    aria-describedby={errors.cvv ? 'card-cvv-error' : undefined}
                    className={fieldClass(errors.cvv)}
                    placeholder="123"
                  />
                  <FieldError id="card-cvv-error" text={errors.cvv} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <ol className="list-decimal list-inside text-sm text-[#101010]/80 space-y-1">
                <li>Yapea o Plinea S/. {total} al número 999 888 777 (Ámbar Restaurante).</li>
                <li>Ingresa aquí el código de aprobación de 6 dígitos que te muestra la app.</li>
              </ol>
              <div>
                <label htmlFor="yape-code" className="block text-xs uppercase font-mono tracking-wider mb-2">
                  Código de aprobación
                </label>
                <input
                  id="yape-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={yapeCode}
                  onChange={(e) => {
                    setYapeCode(onlyDigits(e.target.value))
                    if (errors.yapeCode) setErrors({})
                  }}
                  aria-required="true"
                  aria-invalid={Boolean(errors.yapeCode)}
                  aria-describedby={errors.yapeCode ? 'yape-code-error' : undefined}
                  className={fieldClass(errors.yapeCode)}
                  placeholder="000000"
                />
                <FieldError id="yape-code-error" text={errors.yapeCode} />
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-[#101010]/20 flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-[#101010]/30 text-xs uppercase tracking-[0.2em] hover:bg-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a la ficha</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" aria-hidden="true" />
              <span>{isSubmitting ? 'Procesando pago...' : `Pagar S/. ${total} y confirmar`}</span>
            </button>
          </div>
        </div>

        {/* RESUMEN */}
        <aside className="bg-[#101010] text-[#F3F3F3] p-6 space-y-4 h-fit" aria-label="Resumen del pago">
          <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#919191]">Resumen</span>
          <dl className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <dt className="text-[#919191]">Fecha</dt>
              <dd>{date}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#919191]">Turno</dt>
              <dd>{time} hrs</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#919191]">Comensales</dt>
              <dd>{guests}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#919191]">Garantía por persona</dt>
              <dd>S/. {DEPOSIT_PER_GUEST}</dd>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#F3F3F3]/20 text-base font-bold">
              <dt>Total</dt>
              <dd>S/. {total}</dd>
            </div>
          </dl>
          <p className="flex items-start gap-2 text-[11px] font-mono text-[#919191]">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#F3F3F3]" aria-hidden="true" />
            <span>Prototipo académico: no se procesa ningún cobro real ni se guardan datos de tarjeta.</span>
          </p>
        </aside>
      </div>
    </form>
  )
}
