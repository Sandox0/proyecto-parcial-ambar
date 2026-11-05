import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, MapPin, Phone, Mail, Instagram, Compass } from 'lucide-react'

// página de inicio
export default function Home() {
  const [videoError, setVideoError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mq.matches)
      const handler = (e) => setPrefersReducedMotion(e.matches)
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [])

  // reproduce el video sin sonido
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && !videoError) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
        })
      }
    }
  }, [prefersReducedMotion, videoError])
  const experiences = [
    {
      id: 'raices',
      title: 'Menú Raíces',
      subtitle: '7 Tiempos • Cordillera & Altiplano',
      description:
        'Exploración botánica de tubérculos andinos de altura, raíces ancestrales domesticadas y fermentos milenarios trabajados en nuestra bodega.',
      time: '2h 30m aprox.',
      price: 'S/. 320',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Plato de degustación con tubérculos andinos y emulsiones botánicas',
    },
    {
      id: 'maridaje',
      title: 'Maridaje Experimental',
      subtitle: 'Destilados Botánicos & Vinos de Altura',
      description:
        'Armonización líquida de maceraciones in situ, hidromieles nativas, infusiones destiladas a baja presión y vinos de valles extremos peruanos.',
      time: 'Armonización integral',
      price: 'S/. 190',
      image:
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Copas de maridaje con destilados e infusiones de hierbas nativas',
    },
    {
      id: 'marino',
      title: 'Temporada Marina',
      subtitle: 'Pesca Artesanal & Corriente de Humboldt',
      description:
        'Capturas de anzuelo del litoral limeño tratadas con maduraciones en frío, salmueras de Maras, kombuchas de sargazo y emulsiones marinas.',
      time: 'Almuerzo y Cena',
      price: 'S/. 280',
      image:
        'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Plato de pesca artesanal madurada con kombuchas marinas',
    },
  ]

  const manifestoWords = [
    'Territorio',
    'Fermentos',
    'Tiempo',
    'Fuego',
    'Exclusividad',
  ]

  return (
    <div className="w-full bg-[#101010] text-[#F3F3F3] font-golos selection:bg-[#6F1D1B] selection:text-[#F3F3F3]">
      {/* hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#101010]">
        {/* video de fondo */}
        <div
          className="absolute inset-0 z-0 bg-[#151515] pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          {prefersReducedMotion || videoError ? (
            /* si el video falla */
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80"
              alt="Mesa servida con luz tenue de velas y copas en el salón de Ámbar"
              loading="eager"
              fetchpriority="high"
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center pointer-events-none select-none motion-reduce:hidden"
              aria-hidden="true"
            >
              <source
                src="https://framerusercontent.com/assets/0mUlJ8E4YeFQ4zePbKgm0GWKk.mp4"
                type="video/mp4"
              />
            </video>
          )}

          <div className="absolute inset-0 bg-black/65 pointer-events-none select-none" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/40 pointer-events-none select-none"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-10 flex items-center justify-between border-b border-[#F3F3F3]/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#6F1D1B]" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F3F3F3]/80 font-mono">
              Cocina Experimental • Barranco, Lima
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.25em] text-[#919191] font-mono">
            4 Mesas • 16 Comensales
          </span>
        </div>

        <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-12 max-w-4xl">
          <p className="text-sm sm:text-base md:text-lg text-[#F3F3F3]/90 font-serif-classic italic max-w-2xl leading-relaxed mb-8">
            "Investigación gastronómica del territorio peruano, fermentos milenarios y fuego vivo."
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/reservar"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
            >
              <span>Reservar tu Mesa</span>
              <ArrowRight className="w-4 h-4 text-[#F3F3F3]" aria-hidden="true" />
            </Link>

            <a
              href="#filosofia"
              className="inline-flex items-center gap-2 px-6 py-4 border border-[#F3F3F3]/30 hover:border-[#F3F3F3] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#F3F3F3] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
            >
              Manifiesto
            </a>
          </div>
        </div>

        <div className="relative z-10 px-6 sm:px-12 lg:px-20 overflow-hidden select-none pointer-events-none">
          <h1 className="font-serif-classic text-[18vw] sm:text-[19vw] lg:text-[20vw] font-normal leading-[0.78] tracking-tight text-[#F3F3F3] uppercase translate-y-3 sm:translate-y-6">
            ÁMBAR
          </h1>
        </div>
      </section>

      <section className="bg-[#F3F3F3] text-[#101010] py-8 sm:py-12 border-y border-[#101010]/20 overflow-hidden">
        <div className="px-6 sm:px-12 lg:px-20">
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-sm sm:text-base md:text-xl font-serif-classic uppercase tracking-[0.3em]">
            {manifestoWords.map((word, idx) => (
              <React.Fragment key={word}>
                <span className="font-normal hover:text-[#6F1D1B] transition-colors">
                  {word}
                </span>
                {idx < manifestoWords.length - 1 && (
                  <span className="text-[#6F1D1B] font-mono text-xs select-none" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* galería */}
      <section className="bg-[#101010] text-[#F3F3F3] py-20 sm:py-32 px-6 sm:px-12 lg:px-20 border-b border-[#F3F3F3]/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#F3F3F3]/15">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#919191] block mb-2">
                01 • Atmósfera & Fuego
              </span>
              <h2 className="font-serif-classic text-3xl sm:text-5xl uppercase tracking-tight text-[#F3F3F3]">
                El Salón & La Cocina Abierta
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#919191] max-w-md font-golos leading-relaxed">
              Iluminación cenital atenuada, piedra volcánica y maderas nativas. Una cocina concebida como taller de experimentación sin barreras visuales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 relative group overflow-hidden bg-[#181818] min-h-[380px] sm:min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
                alt="Vista íntima del salón con luz tenue y arquitectura sobria"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F3F3F3]">
                  Salón Cenital — 4 mesas distanciadas
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group overflow-hidden bg-[#181818] min-h-[380px] sm:min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
                alt="Cocina abierta en servicio con fuego y precisión culinaria"
                loading="lazy"
                className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F3F3F3]">
                  Laboratorio de Cocción & Fuego de Leña
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#F3F3F3]/10">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#919191]">
              Servicio de almuerzo y cena con aforo garantizado
            </span>
            <Link
              to="/reservar"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#6F1D1B] bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
            >
              <span>Reservar tu Mesa</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* filosofía */}
      <section
        id="filosofia"
        className="bg-[#F3F3F3] text-[#101010] py-24 sm:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#101010]/20"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F1D1B] font-bold block mb-3">
                02 • Manifiesto de Investigación
              </span>
              <h2 className="font-serif-classic text-4xl sm:text-6xl uppercase tracking-tight text-[#101010]">
                Tres Pilares Innegociables
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#101010]/80 font-serif-classic italic max-w-md">
              "No seguimos recetas fijas. El ecosistema dicta los tiempos y la maduración biológica define el sabor."
            </p>
          </div>

          <div className="divide-y divide-[#101010]/20 border-y border-[#101010]/20">
            <article className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="font-serif-classic text-5xl sm:text-7xl font-normal text-[#6F1D1B] block">
                  I
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#101010]/60 block mt-1">
                  Bioma & Origen
                </span>
              </div>
              <div className="md:col-span-6 space-y-3">
                <h3 className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                  Territorio Puro
                </h3>
                <p className="text-xs sm:text-sm text-[#101010]/80 leading-relaxed font-golos">
                  Trazabilidad directa con pequeñas comunidades de agricultores andinos y pescadores artesanales de anzuelo. Cada producto proviene de pisos ecológicos específicos entre los 0 y los 4,200 metros sobre el nivel del mar.
                </p>
              </div>
              <div className="md:col-span-4 h-48 sm:h-56 bg-[#E5E5E5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80"
                  alt="Tubérculos y raíces nativas recolectadas en los Andes peruanos"
                  loading="lazy"
                  className="w-full h-full object-cover contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </article>

            <article className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="font-serif-classic text-5xl sm:text-7xl font-normal text-[#6F1D1B] block">
                  II
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#101010]/60 block mt-1">
                  Microbiología
                </span>
              </div>
              <div className="md:col-span-6 space-y-3">
                <h3 className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                  Fermentos & Tiempo
                </h3>
                <p className="text-xs sm:text-sm text-[#101010]/80 leading-relaxed font-golos">
                  Nuestra bodega de fermentación biológica alberga misos de quinua y kiwicha, vinagres de frutas amazónicas silvestres, garums de conchas y kombuchas botánicas. Dejamos que los microorganismos transformen los ingredientes durante meses.
                </p>
              </div>
              <div className="md:col-span-4 h-48 sm:h-56 bg-[#E5E5E5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                  alt="Vasijas de vidrio oscuro y fermentos botánicos en maduración lenta"
                  loading="lazy"
                  className="w-full h-full object-cover contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </article>

            <article className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="font-serif-classic text-5xl sm:text-7xl font-normal text-[#6F1D1B] block">
                  III
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#101010]/60 block mt-1">
                  Capacidad Fija
                </span>
              </div>
              <div className="md:col-span-6 space-y-3">
                <h3 className="font-serif-classic text-2xl sm:text-3xl uppercase tracking-tight text-[#101010]">
                  Exclusividad Íntima
                </h3>
                <p className="text-xs sm:text-sm text-[#101010]/80 leading-relaxed font-golos">
                  Límite riguroso de <strong>4 mesas simultáneas</strong> (máximo 16 comensales por bloque horario). No doblamos mesas por turno. Cada comensal recibe el maridaje y la explicación directa del equipo de sala a ritmo sosegado.
                </p>
              </div>
              <div className="md:col-span-4 h-48 sm:h-56 bg-[#E5E5E5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Mesa reservada para cuatro comensales bajo luz focalizada"
                  loading="lazy"
                  className="w-full h-full object-cover contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* experiencias */}
      <section className="bg-[#101010] text-[#F3F3F3] py-24 sm:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#F3F3F3]/15">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#F3F3F3]/15">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#919191] block mb-2">
                03 • Selección de Temporada
              </span>
              <h2 className="font-serif-classic text-4xl sm:text-6xl uppercase tracking-tight text-[#F3F3F3]">
                Experiencias de Degustación
              </h2>
            </div>
            <span className="text-xs font-mono text-[#919191] uppercase tracking-[0.2em]">
              Reservas anticipadas obligatorias
            </span>
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 border-b border-[#F3F3F3]/10"
              >
                <div className="lg:col-span-5 relative group overflow-hidden bg-[#181818] h-72 sm:h-80">
                  <img
                    src={exp.image}
                    alt={exp.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#101010]/80 backdrop-blur-xs text-[10px] font-mono uppercase tracking-widest text-[#F3F3F3]">
                    Paso {index + 1}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#919191] block mb-1">
                      {exp.subtitle}
                    </span>
                    <h3 className="font-serif-classic text-3xl sm:text-4xl uppercase tracking-tight text-[#F3F3F3]">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F3F3F3]/80 font-golos leading-relaxed max-w-xl">
                    {exp.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-6 border-t border-[#F3F3F3]/10">
                    <div className="flex items-center gap-6 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#919191]">
                        <Clock className="w-3.5 h-3.5 text-[#F3F3F3]" aria-hidden="true" />
                        {exp.time}
                      </span>
                      <span className="text-sm font-bold text-[#F3F3F3] tracking-wider">
                        {exp.price} <span className="text-[10px] font-normal text-[#919191]">/ comensal</span>
                      </span>
                    </div>

                    <Link
                      to="/reservar"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
                    >
                      <span>Reservar Experiencia</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010] text-[#F3F3F3] pt-24 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-20 border-b border-[#F3F3F3]/15 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#919191] block">
            Aforo Restringido • 4 Mesas Simultáneas
          </span>

          <h2 className="font-serif-classic text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#F3F3F3]">
            Asegura tu Lugar en el Recorrido
          </h2>

          <p className="text-xs sm:text-sm text-[#F3F3F3]/80 font-golos max-w-xl mx-auto leading-relaxed">
            Solo 4 mesas por servicio. 16 comensales por turno para asegurar una experiencia pausada, personal y sin apremios.
          </p>

          <div className="pt-4">
            <Link
              to="/reservar"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-xs sm:text-sm uppercase tracking-[0.25em] font-medium shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#101010] cursor-pointer"
            >
              <span>Comenzar Asistente de Reserva</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="pt-20 select-none pointer-events-none opacity-20">
          <span className="font-serif-classic text-[22vw] leading-none uppercase text-[#F3F3F3] tracking-tighter block">
            ÁMBAR
          </span>
        </div>
      </section>

      {/* pie de página */}
      <footer className="bg-[#0A0A0A] text-[#F3F3F3] py-20 px-6 sm:px-12 lg:px-20 border-t border-[#F3F3F3]/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <span className="font-serif-classic text-2xl uppercase tracking-widest text-[#F3F3F3] block">
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

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3]">
                Navegación
              </h4>
              <ul className="space-y-2.5 text-xs font-golos text-[#919191]">
                <li>
                  <Link to="/" className="hover:text-[#F3F3F3] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/reservar" className="hover:text-[#F3F3F3] transition-colors">
                    Reservar Experiencia
                  </Link>
                </li>
                <li>
                  <a href="#filosofia" className="hover:text-[#F3F3F3] transition-colors">
                    Manifiesto & Filosofía
                  </a>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-[#F3F3F3] transition-colors">
                    Portal Maitre / Staff
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3]">
                Horario de Sala
              </h4>
              <div className="space-y-2 text-xs font-mono text-[#919191]">
                <p>
                  <strong className="text-[#F3F3F3] block font-medium">Almuerzo:</strong>
                  13:00 — 16:00 hrs
                </p>
                <p>
                  <strong className="text-[#F3F3F3] block font-medium">Cena:</strong>
                  19:30 — 23:00 hrs
                </p>
                <p className="text-[11px] text-[#919191]/80 italic pt-1">
                  Martes a Domingo (Previa reserva online obligatoria)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#F3F3F3]">
                Contacto Directo
              </h4>
              <div className="space-y-2 text-xs font-mono text-[#919191]">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                  <span>Av. San Martín 380, Barranco</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                  <span>+51 (01) 477-9000</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#6F1D1B]" aria-hidden="true" />
                  <span>reservas@ambar.pe</span>
                </p>
              </div>

              <div className="pt-3">
                <Link
                  to="/reservar"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#6F1D1B] hover:bg-[#8B2624] text-[#F3F3F3] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] cursor-pointer"
                >
                  <span>Reservar Mesa</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#F3F3F3]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#919191]">
            <span>
              © {new Date().getFullYear()} Ámbar — Cocina Experimental. Todos los derechos reservados.
            </span>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#F3F3F3] transition-colors cursor-pointer">
                Términos de Reserva
              </span>
              <span>•</span>
              <span className="hover:text-[#F3F3F3] transition-colors cursor-pointer">
                Política de Alérgenos
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
