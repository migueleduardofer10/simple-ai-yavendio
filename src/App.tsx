import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'

/* ------------------------------------------------------------------ */
/*  Marca — cambia el nombre / contacto en UN solo lugar               */
/* ------------------------------------------------------------------ */
const BRAND = {
  name: 'Negocio Simple AI',
  short: 'Negocio Simple',
  tagline: 'IA simple para tu negocio',
  whatsapp:
    'https://wa.me/51991735542?text=Hola%2C%20quiero%20revisar%20mi%20negocio',
  email: 'hola@negociosimple.ai',
}

/* ------------------------------------------------------------------ */
/*  Set de íconos inline (sin dependencias extra)                      */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string }
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Icon = {
  Menu: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 5h16M4 12h16M4 19h16" />
    </svg>
  ),
  Close: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  ChevronDown: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Sparkles: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4M22 4h-4" />
      <circle cx="4" cy="20" r="2" />
    </svg>
  ),
  Mail: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  Whatsapp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  Linkedin: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  // Íconos de rubro
  Store: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M3 9h18l-1.5-5.5A1 1 0 0 0 18.54 3H5.46a1 1 0 0 0-.96.5L3 9Z" />
      <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
  Shirt: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2H10L8 3Z" />
    </svg>
  ),
  Utensils: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 3v6a2 2 0 0 0 2 2v10M9 3v8M6.5 3v5M18 3c-1.5 0-3 1.5-3 5 0 2.5 1 3.5 2 4v9" />
    </svg>
  ),
  Wrench: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.83 2.83 0 0 1-4-4l9-9a4 4 0 0 0-1-1Z" />
    </svg>
  ),
  Stethoscope: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M9 17a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  ),
  Cap: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M22 9 12 5 2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
    </svg>
  ),
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal — agrega .is-visible a cada .reveal en pantalla      */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ------------------------------------------------------------------ */
/*  Navegación — cada item es una RUTA (no una sección de Inicio)       */
/* ------------------------------------------------------------------ */
const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Qué resolvemos', to: '/resolvemos' },
  { label: 'Cómo trabajamos', to: '/como-trabajamos' },
  { label: 'Casos', to: '/casos' },
]

// Vuelve al tope al cambiar de ruta.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
// Conversaciones para el mockup del hero (bandeja tipo WhatsApp).
const inbox = [
  { initials: 'MT', name: 'María Torres', msg: '¡Mi pago fue exitoso! 🎉', time: '12:45', unread: false },
  { initials: 'CR', name: 'Camila Ríos', msg: '¿Tienen la talla M?', time: '13:30', unread: true },
  { initials: 'JL', name: 'José Luna', msg: 'Quiero 2 docenas', time: '14:15', unread: true },
]

// Dolores cotidianos ("Te entendemos").
const pains = [
  'Pedidos por WhatsApp que se pierden entre tantos chats.',
  'Stock que se acaba sin aviso y te enteras tarde.',
  'Reportes que nadie tiene tiempo de hacer.',
  'Clientes que preguntan lo mismo todos los días.',
  'Caja que recién revisas a mano al cierre.',
  'Info regada en cuadernos, Excel, notas y chats.',
]

// Qué resolvemos: problema del dueño → solución simple.
const solutions = [
  {
    quote: 'Me preguntan todo el día precio, talla, stock o disponibilidad.',
    solution: 'Respuestas asistidas y un catálogo simple conectado a WhatsApp.',
  },
  {
    quote: 'Me doy cuenta que falta mercadería cuando el cliente ya la pidió.',
    solution: 'Alertas de reposición y reporte de tus productos más vendidos.',
  },
  {
    quote: 'Cierro el día y recién trato de entender cuánto vendí.',
    solution: 'Resumen diario automático de ventas, pagos, pedidos y pendientes.',
  },
  {
    quote: 'Me escriben, preguntan y después se pierden.',
    solution: 'Recordatorios para volver a contactar a clientes interesados.',
  },
  {
    quote: 'Compro por intuición y a veces sobra o falta.',
    solution: 'Lista de compras sugerida según ventas, temporada y rotación.',
  },
  {
    quote: 'A mi equipo le cuesta usar herramientas nuevas.',
    solution: 'Capacitación con casos reales y herramientas simples, no sistemas.',
  },
]

// Cómo trabajamos (proceso de 6 pasos, lenguaje cotidiano).
const process = [
  { n: '1', title: 'Miramos tu negocio por dentro', body: 'Vemos cómo vendes, cobras, anotas, atiendes y compras. Sin juzgar.' },
  { n: '2', title: 'Encontramos dónde se va el tiempo', body: 'Priorizamos tareas repetitivas, errores y oportunidades rápidas.' },
  { n: '3', title: 'Probamos una solución pequeña', body: 'Te mostramos una mejora simple antes de implementarla completa.' },
  { n: '4', title: 'La dejamos funcionando', body: 'Implementación liviana, conectada a tu operación real de cada día.' },
  { n: '5', title: 'Enseñamos a tu equipo', body: 'Aprenden con sus propios pedidos, clientes, ventas y stock.' },
  { n: '6', title: 'Te acompañamos', body: 'Seguimos ajustando y mejorando cuando tu negocio cambia.' },
]

// Casos por rubro.
const sectors = [
  { icon: Icon.Store, title: 'Bodegas y markets', quote: 'Que no se te acabe lo que más vendes.' },
  { icon: Icon.Shirt, title: 'Tiendas de ropa', quote: 'Responde más rápido y no pierdas ventas.' },
  { icon: Icon.Utensils, title: 'Restaurantes', quote: 'Menos desorden en hora punta.' },
  { icon: Icon.Wrench, title: 'Ferreterías', quote: 'Cotiza en minutos, no en media hora.' },
  { icon: Icon.Stethoscope, title: 'Consultorios y servicios', quote: 'Menos ausencias y menos mensajes manuales.' },
  { icon: Icon.Cap, title: 'Academias y talleres', quote: 'Alumnos, pagos y consultas en un solo flujo.' },
]

// Antes / después (mismo negocio, operando distinto).
const transformation = [
  { today: 'Pedidos perdidos entre mil chats de WhatsApp.', after: 'Pedidos ordenados, con estado y seguimiento.' },
  { today: 'Stock que revisas a ojo o cuando ya es tarde.', after: 'Alertas cuando un producto está por acabarse.' },
  { today: 'Cierras el día sin saber bien cuánto vendiste.', after: 'Resumen diario automático de ventas y caja.' },
  { today: 'Respondes lo mismo una y otra vez.', after: 'Respuestas listas para tus preguntas frecuentes.' },
]

// Módulos de capacitación.
const training = [
  { title: 'IA para atención al cliente', result: 'Plantillas de respuestas para WhatsApp e Instagram.' },
  { title: 'IA para ventas', result: 'Promociones, seguimiento y un calendario simple de campañas.' },
  { title: 'IA para orden interno', result: 'Reporte diario de ventas, pendientes y tareas del día.' },
  { title: 'IA para inventario y compras', result: 'Productos por reponer y lista de compras sugerida.' },
]

const founders = [
  {
    photo: '/team/founder-1.png',
    initials: 'BO',
    name: 'Bruno Oyague',
    role: 'Negocio',
    bio: 'Entra a tu operación y la ordena contigo. Años ayudando a negocios a vender mejor sin complicarse.',
    ring: 'ring-brio-terra/30 bg-brio-terra',
  },
  {
    photo: '/team/founder-2.jpg',
    initials: 'LT',
    name: 'Leonardo Torres',
    role: 'Tecnología',
    bio: 'Hace que la tecnología sea simple. Herramientas que tu equipo sí usa, sin tecnicismos.',
    ring: 'ring-brio-jade/30 bg-brio-jade',
  },
]

const faqs = [
  { q: '¿Tengo que saber de IA para trabajar con ustedes?', a: 'No. Nuestro trabajo es traducir la tecnología a soluciones simples. Tú nos explicas cómo trabajas; nosotros vemos cómo simplificarlo.' },
  { q: '¿Me van a cambiar todo mi sistema?', a: 'No. Primero revisamos lo que ya usas. Si WhatsApp, Excel o Google Sheets resuelven bien con mejoras, empezamos por ahí.' },
  { q: '¿Esto es solo para empresas grandes?', a: 'No. Está pensado para negocios que venden, atienden y compran todos los días, aunque trabajen con cuadernos, hojas de cálculo o chats.' },
  { q: '¿Cuánto tiempo toma ver una mejora?', a: 'Depende del problema, pero la idea es empezar con una mejora pequeña y visible en semanas, no con un proyecto eterno.' },
  { q: '¿Qué pasa si mi equipo no se adapta?', a: 'Capacitamos con sus propios casos: responder clientes, ordenar pedidos, revisar stock o hacer reportes con sus herramientas reales.' },
  { q: '¿La IA va a reemplazar a mi gente?', a: 'No. La usamos para quitar tareas repetitivas y que tu equipo se enfoque en atender mejor, vender más y cometer menos errores.' },
]

/* ------------------------------------------------------------------ */
/*  Bloques pequeños                                                   */
/* ------------------------------------------------------------------ */
function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
        dark ? 'text-white/60' : 'text-brio-slate/70'
      }`}
    >
      {children}
    </span>
  )
}

// Botón verde Platzi (texto oscuro sobre verde, como Platzi).
function btnGreen(extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-xl bg-brio-terra px-6 py-3.5 text-sm font-bold text-brio-ink shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark ${extra}`
}

/* ------------------------------------------------------------------ */
/*  Secciones                                                          */
/* ------------------------------------------------------------------ */
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brio-terra text-brio-ink shadow-hard">
        <Icon.Sparkles className="h-4 w-4" />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brio-ink'}`}>
        {BRAND.short}
        <span className="text-brio-terra"> AI</span>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Sobre el hero oscuro (tope del Inicio) la barra es transparente con texto claro.
  const overHero = pathname === '/' && !scrolled

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 py-3.5 transition-colors duration-300 ${
        overHero
          ? 'bg-transparent'
          : 'border-b border-brio-border/70 bg-white/85 backdrop-blur-md'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Logo dark={overHero} />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? overHero
                      ? 'text-brio-terra'
                      : 'text-brio-terra-dark'
                    : overHero
                      ? 'text-white/80 hover:text-brio-terra'
                      : 'text-brio-ink/75 hover:text-brio-terra-dark'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGreen('px-5 py-2')}>
            <Icon.Whatsapp className="h-4 w-4" />
            Quiero revisar mi negocio
          </a>
        </div>

        <button
          aria-label="Abrir menú"
          className={`md:hidden -m-2.5 p-2.5 ${overHero ? 'text-white' : 'text-brio-ink'}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Icon.Close className="h-6 w-6" /> : <Icon.Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden container-x mt-3">
          <div className="rounded-2xl border border-brio-border bg-white p-4 shadow-hard-lg">
            {NAV.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-brio-muted ${
                    isActive ? 'text-brio-terra-dark' : 'text-brio-ink/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={btnGreen('mt-2 w-full')}>
              <Icon.Whatsapp className="h-4 w-4" />
              Quiero revisar mi negocio
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-brio-ink-dark pb-12 pt-28 text-center"
    >
      {/* Fondo: degradado + glows + textura */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, rgba(15,227,139,0.18), transparent 60%), radial-gradient(80% 60% at 80% 20%, rgba(15,227,139,0.10), transparent 60%)',
          }}
        />
        <div className="absolute inset-0 texture-dots-dark opacity-50" />
        <div className="absolute -top-40 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 glow-radial-terra animate-float-slow" />
        <div className="absolute bottom-0 -right-24 h-[28rem] w-[28rem] glow-radial-jade animate-float" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center">
        <span className="reveal is-visible mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brio-terra animate-pulse" />
          IA simple para negocios de verdad
        </span>

        <h1
          className="reveal is-visible mx-auto max-w-4xl font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Llevamos los negocios
          <br />a la{' '}
          <span className="bg-gradient-to-r from-brio-terra to-brio-terra-light bg-clip-text text-transparent">
            era de la IA
          </span>
        </h1>

        <p className="reveal is-visible mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          Entramos a tu operación y usamos IA, automatización o herramientas simples
          para que vendas más, pierdas menos tiempo y trabajes con menos desorden.
        </p>

        <div className="reveal is-visible mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGreen('px-7 py-4 text-base')}>
            <Icon.Whatsapp className="h-5 w-5" />
            Quiero revisar mi negocio
          </a>
          <a href="#casos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:text-base">
            Ver ejemplos por rubro
            <Icon.ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mockup: bandeja tipo WhatsApp atendida por IA */}
        <div className="reveal is-visible relative mt-14 w-full max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-hard-lg">
            {/* barra superior */}
            <div className="flex items-center gap-1.5 border-b border-brio-border bg-brio-muted px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
              <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-brio-slate">
                app.negociosimple.ai
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr]">
              {/* bandeja */}
              <div className="hidden border-r border-brio-border p-3 sm:block">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-brio-ink">Mensajes</span>
                  <span className="rounded-full bg-brio-terra/15 px-2 py-0.5 text-[10px] font-bold text-brio-gold-dark">2 nuevos</span>
                </div>
                <div className="space-y-1">
                  {inbox.map((c) => (
                    <div key={c.initials} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-brio-muted">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra/15 text-[11px] font-bold text-brio-gold-dark">
                        {c.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between">
                          <span className="truncate text-xs font-bold text-brio-ink">{c.name}</span>
                          <span className="ml-2 text-[10px] text-brio-slate/60">{c.time}</span>
                        </span>
                        <span className="truncate block text-[11px] text-brio-slate">{c.msg}</span>
                      </span>
                      {c.unread && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brio-terra" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* chat */}
              <div className="flex flex-col gap-3 bg-brio-muted/50 p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brio-terra/15 text-[11px] font-bold text-brio-gold-dark">CR</span>
                  <span>
                    <span className="block text-xs font-bold text-brio-ink">Camila Ríos</span>
                    <span className="flex items-center gap-1 text-[10px] text-brio-slate">
                      <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> En línea
                    </span>
                  </span>
                </div>

                <div className="mt-1 max-w-[80%] self-start rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-xs text-brio-ink shadow-hard-sm">
                  Hola, ¿tienen ese polo que vi en Instagram? 👀
                </div>
                <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-brio-terra px-3.5 py-2.5 text-xs font-medium text-brio-ink shadow-hard-sm">
                  ¡Hola Camila! 🙌 Sí, lo tengo en talla M y S. Te lo aparto y te paso el link de pago.
                </div>
                <span className="self-end text-[10px] font-semibold text-brio-gold-dark">
                  ⚡ Respondido por IA en 4s
                </span>
              </div>
            </div>
          </div>

          {/* badge flotante de ventas */}
          <div className="absolute -right-2 top-24 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra">
              <Icon.Whatsapp className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-white">S/ 55,826</span>
              <span className="block text-[10px] text-white/50">vendido hoy</span>
            </span>
          </div>

          {/* badge flotante de pedidos */}
          <div className="absolute -left-3 bottom-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra">
              <Icon.Check className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-white">+38 pedidos</span>
              <span className="block text-[10px] text-white/50">atendidos sin que muevas un dedo</span>
            </span>
          </div>

          {/* badge flotante de stock */}
          <div className="absolute -left-3 top-16 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg lg:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra">
              <Icon.Store className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-white">Stock bajo</span>
              <span className="block text-[10px] text-white/50">quedan 3 · te avisamos a tiempo</span>
            </span>
          </div>

          {/* badge flotante de respuesta */}
          <div className="absolute -right-3 bottom-12 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg lg:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra">
              <Icon.Sparkles className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-white">Responde sola</span>
              <span className="block text-[10px] text-white/50">en segundos, 24/7</span>
            </span>
          </div>
        </div>

        {/* Franja de canales — "funciona donde ya vendes" */}
        <div className="reveal is-visible mt-12 flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
            Funciona donde tu negocio ya vende
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-white/55">
            <span className="flex items-center gap-2">
              <Icon.Whatsapp className="h-4 w-4 text-brio-terra" /> WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> Instagram
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> Excel
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> Google Sheets
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// 2 — Dolores cotidianos (CLARO)
function Pains() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-muted">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Te entendemos</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            Tu negocio no necesita sonar moderno.<br />
            <span className="text-brio-slate">Necesita funcionar mejor.</span>
          </h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">
            Si creciste pero todo sigue en WhatsApp, cuadernos y Excel, no estás solo.
            Ahí es donde entramos.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p, i) => (
            <div key={i} className="reveal flex items-start gap-3 rounded-2xl border border-brio-border bg-white p-5 shadow-hard-sm" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brio-slate/10 text-brio-slate">
                <Icon.Close className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-snug text-brio-ink md:text-base">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3 — Postura de simplicidad (OSCURO · spotlight)
function Simplicity() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <div aria-hidden className="pointer-events-none absolute -top-20 left-[8%] h-[26rem] w-[26rem] glow-radial-terra animate-float-slow" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-3xl text-center reveal">
          <Pill dark>Lo simple gana</Pill>
          <h2 className="mt-5 font-display font-extrabold leading-[1.1] text-white" style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)' }}>
            No todo necesita un sistema. A veces solo hay que{' '}
            <span className="text-brio-terra">ordenar bien lo que ya usas.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Si una hoja de cálculo resuelve, la mejoramos. Si WhatsApp es tu canal de
            venta, lo hacemos más inteligente. Si necesitas un sistema, lo construimos.
            Pero no empezamos por ahí. <span className="text-white/90 font-semibold">Cobramos por resolver, no por complicarte.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// 4 — Qué resolvemos (CLARO)
function Solutions() {
  return (
    <section id="resolvemos" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Qué resolvemos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">
            Hacemos que lo repetitivo se haga solo o más rápido
          </h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">
            No cambiamos lo que ya funciona. Quitamos lo que te roba tiempo y plata.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <div key={i} className="reveal card-hover flex flex-col rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm" style={{ transitionDelay: `${i * 70}ms` }}>
              <p className="mb-5 text-sm italic leading-snug text-brio-slate">“{s.quote}”</p>
              <div className="mt-auto flex items-start gap-3 border-t border-brio-border pt-4">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra text-brio-ink">
                  <Icon.Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-brio-ink">{s.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 5 — Cómo trabajamos (CLARO)
function Process() {
  return (
    <section id="como-trabajamos" className="section-padding relative overflow-hidden bg-brio-muted scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Cómo trabajamos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">
            Miramos tu negocio por dentro antes de tocar tecnología
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <div key={p.n} className="reveal relative overflow-hidden rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="pointer-events-none absolute -top-3 right-3 select-none text-7xl font-bold leading-none text-brio-terra/15">
                {p.n}
              </span>
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-brio-terra/15 text-sm font-extrabold text-brio-terra-dark">
                {p.n}
              </span>
              <h3 className="mb-2 text-lg font-bold text-brio-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-brio-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 6 — Casos por rubro (OSCURO · spotlight)
function Sectors() {
  return (
    <section id="casos" className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-[6%] h-[28rem] w-[28rem] glow-radial-jade animate-float" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-2xl reveal">
          <Pill dark>Casos por rubro</Pill>
          <h2 className="mt-4 font-display font-extrabold leading-tight text-white" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
            Ejemplos reales de lo que podemos simplificar
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ icon: I, title, quote }, i) => (
            <div key={title} className="reveal group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brio-terra/50 hover:bg-white/[0.07]" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brio-terra text-brio-ink">
                <I className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 7 — Antes / después (CLARO)
function BeforeAfter() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Antes / Después</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            El mismo negocio,<br /><span className="text-brio-slate">operando distinto</span>
          </h2>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-2">
          {/* HOY */}
          <div className="reveal rounded-[22px] border border-brio-border bg-white p-6 shadow-hard-sm sm:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-ink/[0.04] px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-brio-slate/50" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-slate">Hoy</span>
            </div>
            <ul className="space-y-4">
              {transformation.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-snug text-brio-slate md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-slate/10 text-brio-slate">
                    <Icon.Close className="h-3 w-3" />
                  </span>
                  <span>{t.today}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Flecha al centro (solo desktop) */}
          <div aria-hidden className="group absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer lg:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brio-border bg-white text-brio-terra-dark shadow-hard transition-all duration-300 group-hover:scale-110 group-hover:border-brio-terra group-hover:bg-brio-terra group-hover:text-brio-ink">
              <Icon.ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>

          {/* CON NEGOCIO SIMPLE */}
          <div className="reveal rounded-[22px] border border-brio-terra/30 bg-brio-ink p-6 shadow-hard-lg sm:p-8" style={{ transitionDelay: '120ms' }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-terra/15 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-brio-terra animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-terra-light">Con {BRAND.short}</span>
            </div>
            <ul className="space-y-4">
              {transformation.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-snug text-white/85 md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra-light">
                    <Icon.Check className="h-3 w-3" />
                  </span>
                  <span>{t.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// 8 — Capacitación (CLARO)
function Training() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-muted">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <Pill>Capacitamos</Pill>
          <h2 className="mt-4 font-bold leading-tight text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Tu equipo ya usa WhatsApp, Excel y celular. Ahora puede usarlos mejor.
          </h2>
          <p className="mt-5 max-w-md text-base text-brio-slate md:text-lg">
            Capacitamos con casos reales de tu negocio: respuestas a clientes, pedidos,
            inventario, reportes y seguimiento. Nada de teoría.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {training.map((m, i) => (
            <div key={i} className="reveal rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brio-terra/15 text-brio-terra-dark">
                <Icon.Sparkles className="h-4 w-4" />
              </span>
              <h3 className="mb-2 text-base font-bold text-brio-ink">{m.title}</h3>
              <p className="text-sm leading-relaxed text-brio-slate">{m.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 9 — Diagnóstico / Contacto (OSCURO · spotlight)
function Contact() {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-[10%] h-[28rem] w-[28rem] glow-radial-terra animate-float-slow" />
        <div className="absolute -bottom-24 left-[5%] h-[24rem] w-[24rem] glow-radial-jade animate-float" />
      </div>
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <Pill dark>Diagnóstico gratis</Pill>
            <h2 className="mt-4 font-display font-extrabold leading-tight text-white" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
              Descubre qué ordenar primero en tu negocio
            </h2>
            <p className="mt-5 max-w-md text-white/65">
              En unos minutos detectamos dónde pierdes tiempo o plata. Sin compromiso y
              sin lenguaje técnico. Lo más fácil es escribirnos por WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGreen('px-6 py-4')}>
                <Icon.Whatsapp className="h-5 w-5" />
                WhatsApp directo
              </a>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-sm font-bold text-white ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
                <Icon.Mail className="h-5 w-5" />
                {BRAND.email}
              </a>
            </div>
          </div>

          <form className="reveal rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">¿Qué tipo de negocio tienes?</label>
                <input type="text" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Bodega, restaurante, tienda de ropa..." />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">Tu WhatsApp</label>
                <input type="tel" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="+51 999 999 999" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">¿Qué es lo que más tiempo te quita?</label>
                <textarea rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Cuéntanos en una línea..." />
              </div>
              <button type="submit" className={btnGreen('mt-1 w-full')}>
                Hacer mi diagnóstico
                <Icon.ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function FounderAvatar({ photo, initials, ring }: { photo: string; initials: string; ring: string }) {
  const [failed, setFailed] = useState(false)
  const base =
    'h-28 w-28 flex-shrink-0 rounded-full object-cover ring-4 ring-offset-4 ring-offset-brio-bone'
  if (failed) {
    return (
      <span className={`flex items-center justify-center text-2xl font-extrabold text-brio-ink ${base} ${ring}`}>
        {initials}
      </span>
    )
  }
  return (
    <img
      src={photo}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${base} ${ring}`}
    />
  )
}

// 10 — Nosotros (CLARO)
function Team() {
  return (
    <section id="equipo" className="section-padding bg-brio-bone scroll-mt-20">
      <div className="container-x">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Nosotros</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">
            Gente que entra a tu operación y resuelve contigo
          </h2>
          <p className="mt-4 max-w-xl text-brio-slate">
            Hablamos como socio operativo, no como proveedor técnico. Negocio y
            tecnología en la misma mesa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {founders.map((f, i) => (
            <div key={f.name} className="reveal flex flex-col items-center rounded-[20px] border border-brio-border bg-white p-8 text-center shadow-hard-sm" style={{ transitionDelay: `${i * 100}ms` }}>
              <FounderAvatar photo={f.photo} initials={f.initials} ring={f.ring} />
              <h3 className="mt-6 text-xl font-bold text-brio-ink">{f.name}</h3>
              <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-brio-terra-dark">
                {f.role}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-brio-slate">{f.bio}</p>
              <a
                href="#"
                aria-label={`LinkedIn de ${f.name}`}
                className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brio-border text-brio-slate/60 transition-colors hover:border-brio-terra hover:text-brio-terra-dark"
              >
                <Icon.Linkedin className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 11 — FAQ (CLARO)
function Faq() {
  return (
    <section className="section-padding bg-brio-muted">
      <div className="container-x">
        <div className="mb-12 max-w-2xl reveal">
          <Pill>Preguntas frecuentes</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">
            Preguntas honestas, respuestas honestas
          </h2>
        </div>
        <div className="grid max-w-5xl gap-3 md:grid-cols-2 md:items-start">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="reveal group cursor-pointer overflow-hidden rounded-2xl border border-brio-border bg-white shadow-hard-sm transition-colors duration-300 hover:border-brio-terra/60"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <h3 className="flex-1 font-bold text-brio-ink">{f.q}</h3>
                <Icon.ChevronDown className="h-5 w-5 flex-shrink-0 text-brio-slate/50 transition-transform duration-300 group-hover:rotate-180 group-hover:text-brio-terra-dark" />
              </div>
              {/* grid-rows 0fr → 1fr anima la altura al hacer hover */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brio-slate">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brio-ink-dark py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo dark />
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {BRAND.name}. {BRAND.tagline}
        </p>
        <div className="flex items-center gap-4 text-white/50">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-brio-terra">
            <Icon.Whatsapp className="h-5 w-5" />
          </a>
          <a href={`mailto:${BRAND.email}`} aria-label="Correo" className="transition-colors hover:text-brio-terra">
            <Icon.Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  Páginas                                                            */
/* ------------------------------------------------------------------ */
// Inicio — TODO el contenido de ahora vive aquí (ruta por defecto "/")
function Home() {
  useScrollReveal()
  return (
    <main>
      <Hero />
      <Pains />
      <Simplicity />
      <Solutions />
      <Process />
      <Sectors />
      <BeforeAfter />
      <Training />
      <Contact />
      <Team />
      <Faq />
    </main>
  )
}

// Página placeholder para las rutas que todavía no construimos.
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="section-padding bg-brio-bone">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brio-terra/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brio-terra-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-brio-terra animate-pulse" />
          Próximamente
        </span>
        <h1 className="font-display text-3xl font-extrabold text-brio-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-md text-brio-slate">
          Esta página aún no existe. Por ahora todo el contenido vive en Inicio;
          pronto le damos el suyo.
        </p>
        <Link to="/" className={btnGreen('mt-8')}>
          Volver a Inicio
          <Icon.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}

/* ------------------------------------------------------------------ */
/*  App — router. Header y Footer son layout compartido por toda ruta. */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen w-full">
        <Header />
        <Routes>
          {/* Inicio — la única página real por ahora */}
          <Route path="/" element={<Home />} />

          {/* Rutas aún sin construir. Reemplaza <ComingSoon> por su
              componente real cuando creemos cada página. */}
          <Route path="/resolvemos" element={<ComingSoon title="Qué resolvemos" />} />
          <Route path="/como-trabajamos" element={<ComingSoon title="Cómo trabajamos" />} />
          <Route path="/casos" element={<ComingSoon title="Casos" />} />
          <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
