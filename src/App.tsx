import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import {
  Reveal,
  Stagger,
  StaggerItem,
  Counter,
  Marquee,
  Parallax,
  Tilt,
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from './motion'
import witchImage from './assets/images/witch.png'
import witchKeepingImage from './assets/images/witch-keeping.png'

/* ------------------------------------------------------------------ */
/*  Marca — cambia el nombre / contacto en UN solo lugar               */
/* ------------------------------------------------------------------ */
const BRAND = {
  name: 'Simple AI',
  short: 'Simple',
  tagline: 'IA simple para tu negocio',
  whatsapp:
    'https://wa.me/51991735542?text=Hola%2C%20quiero%20revisar%20mi%20negocio',
  email: 'hola@simple.ai',
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
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 5h16M4 12h16M4 19h16" /></svg>
  ),
  Close: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M18 6 6 18M6 6l12 12" /></svg>
  ),
  ArrowRight: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M20 6 9 17l-5-5" /></svg>
  ),
  ChevronDown: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="m6 9 6 6 6-6" /></svg>
  ),
  Sparkles: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4M22 4h-4" /><circle cx="4" cy="20" r="2" />
    </svg>
  ),
  Mail: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
  ),
  Whatsapp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
  ),
  Instagram: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
  ),
  Linkedin: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
  ),
  Store: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M3 9h18l-1.5-5.5A1 1 0 0 0 18.54 3H5.46a1 1 0 0 0-.96.5L3 9Z" /><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" /><path d="M9 20v-5h6v5" /></svg>
  ),
  Shirt: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2H10L8 3Z" /></svg>
  ),
  Utensils: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 3v6a2 2 0 0 0 2 2v10M9 3v8M6.5 3v5M18 3c-1.5 0-3 1.5-3 5 0 2.5 1 3.5 2 4v9" /></svg>
  ),
  Wrench: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.83 2.83 0 0 1-4-4l9-9a4 4 0 0 0-1-1Z" /></svg>
  ),
  Stethoscope: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M5 3v6a4 4 0 0 0 8 0V3" /><path d="M9 17a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>
  ),
  Cap: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5" /></svg>
  ),
  Chart: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M3 3v18h18" /><path d="M7 16v-4M12 16V8M17 16v-6" /></svg>
  ),
  Chat: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>
  ),
  Cash: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
  ),
  Folder: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /></svg>
  ),
}

/* ------------------------------------------------------------------ */
/*  Navegación — cada item es una RUTA                                  */
/* ------------------------------------------------------------------ */
const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Resolvemos', to: '/resolvemos' },
  { label: 'Casos', to: '/casos' },
  { label: 'Nosotros', to: '/nosotros' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ------------------------------------------------------------------ */
/*  Data (copy intacto)                                                */
/* ------------------------------------------------------------------ */
const inbox = [
  { initials: 'MT', name: 'María Torres', msg: '¡Mi pago fue exitoso! 🎉', time: '12:45', unread: false },
  { initials: 'CR', name: 'Camila Ríos', msg: '¿Tienen la talla M?', time: '13:30', unread: true },
  { initials: 'JL', name: 'José Luna', msg: 'Quiero 2 docenas', time: '14:15', unread: true },
]

const channels = [
  { icon: Icon.Whatsapp, label: 'WhatsApp' },
  { icon: Icon.Instagram, label: 'Instagram' },
  { icon: Icon.Chart, label: 'Excel' },
  { icon: Icon.Folder, label: 'Google Sheets' },
]

const pains = [
  { icon: Icon.Whatsapp, text: 'Pedidos por WhatsApp que se pierden entre tantos chats.' },
  { icon: Icon.Store, text: 'Stock que se acaba sin aviso y te enteras tarde.' },
  { icon: Icon.Chart, text: 'Reportes que nadie tiene tiempo de hacer.' },
  { icon: Icon.Chat, text: 'Clientes que preguntan lo mismo todos los días.' },
  { icon: Icon.Cash, text: 'Caja que recién revisas a mano al cierre.' },
  { icon: Icon.Folder, text: 'Info regada en cuadernos, Excel, notas y chats.' },
]

const solutions = [
  { tab: 'Atención', quote: 'Me preguntan todo el día precio, talla, stock o disponibilidad.', solution: 'Respuestas asistidas y un catálogo simple conectado a WhatsApp.', exampleFrom: 'Cliente · 8:47 p.m.', exampleAsk: 'Hola, ¿tienes la casaca negra en M? ¿Cuánto está y haces delivery?', exampleDone: 'Respuesta lista: stock disponible, precio, link de pago y tiempo de entrega.' },
  { tab: 'Stock', quote: 'Me doy cuenta que falta mercadería cuando el cliente ya la pidió.', solution: 'Alertas de reposición y reporte de tus productos más vendidos.', exampleFrom: 'Alerta de tienda · 6:15 p.m.', exampleAsk: 'Quedan 3 unidades de lo que más se vende el fin de semana.', exampleDone: 'Compra sugerida: reponer 24 unidades antes del viernes.' },
  { tab: 'Caja', quote: 'Cierro el día y recién trato de entender cuánto vendí.', solution: 'Resumen diario automático de ventas, pagos, pedidos y pendientes.', exampleFrom: 'Cierre de caja · 10:02 p.m.', exampleAsk: 'Hoy hubo efectivo, Yape, transferencias y dos pedidos pendientes.', exampleDone: 'Resumen listo: ventas, pagos por canal, pendientes y diferencia por revisar.' },
  { tab: 'Clientes', quote: 'Me escriben, preguntan y después se pierden.', solution: 'Recordatorios para volver a contactar a clientes interesados.', exampleFrom: 'Seguimiento · 11:30 a.m.', exampleAsk: '3 clientes preguntaron precio ayer y no respondieron después.', exampleDone: 'Mensajes preparados para retomar la conversación sin sonar insistente.' },
  { tab: 'Academia', quote: 'Se me mezclan alumnos, pagos, horarios y consultas por todos lados.', solution: 'Control simple de alumnos, pagos pendientes, clases y mensajes frecuentes.', exampleFrom: 'Academia · 7:30 p.m.', exampleAsk: 'Un papá pregunta horario, otro debe mensualidad y hay alumnos por confirmar.', exampleDone: 'Resumen listo: pagos pendientes, clases de mañana y mensajes para enviar.' },
  { tab: 'Equipo', quote: 'A mi equipo le cuesta usar herramientas nuevas.', solution: 'Capacitación con casos reales y herramientas simples, no sistemas.', exampleFrom: 'Equipo · hora punta', exampleAsk: 'Cada vendedor anota pedidos distinto y después nadie encuentra nada.', exampleDone: 'Flujo único: cómo responder, registrar pedido y marcar estado en 3 pasos.' },
]

const process = [
  { n: '1', title: 'Diagnóstico',       body: 'Vemos cómo vendes, cobras, atiendes y anotas. Encontramos dónde se va el tiempo.' },
  { n: '2', title: 'Prototipo rápido',  body: 'Te mostramos una mejora concreta antes de implementarla. Sin compromisos.' },
  { n: '3', title: 'Implementación',    body: 'Dejamos la solución funcionando, conectada a tu operación real del día a día.' },
  { n: '4', title: 'Acompañamiento',    body: 'Capacitamos a tu equipo y seguimos ajustando cuando tu negocio cambia.' },
]

const sectors = [
  { icon: Icon.Store,       title: 'Bodegas y markets',        quote: 'IA que predice qué vas a necesitar antes de que se acabe.' },
  { icon: Icon.Shirt,       title: 'Tiendas de ropa',          quote: 'Automatiza respuestas de tallas, precios y disponibilidad.' },
  { icon: Icon.Utensils,    title: 'Restaurantes',             quote: 'Digitaliza tu carta y recibe pedidos sin llamadas ni papel.' },
  { icon: Icon.Wrench,      title: 'Ferreterías',              quote: 'Cotizaciones automáticas listas en segundos, sin calculadora.' },
  { icon: Icon.Stethoscope, title: 'Consultorios',             quote: 'IA que agenda citas, manda recordatorios y filtra urgencias.' },
  { icon: Icon.Cap,         title: 'Academias y talleres',     quote: 'Automatiza matrículas, pagos y comunicación con alumnos.' },
  { icon: Icon.Chat,        title: 'Atención al cliente',      quote: 'Un agente de IA que responde el 80% de consultas sin humano.' },
  { icon: Icon.Chart,       title: 'Análisis de ventas',       quote: 'Transforma tu Excel en un dashboard que se actualiza solo.' },
  { icon: Icon.Cash,        title: 'Gestión de cobranza',      quote: 'Recordatorios de pago automáticos por WhatsApp o correo.' },
  { icon: Icon.Folder,      title: 'Gestión documental',       quote: 'IA que clasifica, resume y encuentra cualquier archivo al instante.' },
  { icon: Icon.Whatsapp,    title: 'Ventas por WhatsApp',      quote: 'Automatiza tu proceso de venta sin salir de WhatsApp.' },
  { icon: Icon.Instagram,   title: 'Redes sociales',           quote: 'IA que genera contenido adaptado a tu negocio y calendario.' },
  { icon: Icon.Store,       title: 'Farmacias',                quote: 'Control de stock automatizado y alertas de reposición.' },
  { icon: Icon.Wrench,      title: 'Talleres mecánicos',       quote: 'Digitaliza órdenes de trabajo y automatiza el seguimiento.' },
  { icon: Icon.Stethoscope, title: 'Clínicas veterinarias',    quote: 'Historial de pacientes digital y recordatorios automáticos.' },
  { icon: Icon.Utensils,    title: 'Panaderías y pastelerías', quote: 'Planifica tu producción según pedidos anticipados del día.' },
  { icon: Icon.Cap,         title: 'Inmobiliarias',            quote: 'IA que califica leads y agenda visitas sin intervención manual.' },
  { icon: Icon.Chart,       title: 'Contadores y estudios',    quote: 'Automatiza reportes y deja que la IA detecte las anomalías.' },
  { icon: Icon.Folder,      title: 'Estudios jurídicos',       quote: 'IA que revisa contratos y genera borradores en minutos.' },
  { icon: Icon.Cash,        title: 'Gimnasios y centros fit',  quote: 'Transforma tu gestión: pagos, asistencia y seguimiento digital.' },
]

const transformation = [
  { today: 'Pedidos perdidos entre mil chats de WhatsApp.', after: 'Pedidos ordenados, con estado y seguimiento.' },
  { today: 'Stock que revisas a ojo o cuando ya es tarde.', after: 'Alertas cuando un producto está por acabarse.' },
  { today: 'Cierras el día sin saber bien cuánto vendiste.', after: 'Resumen diario automático de ventas y caja.' },
  { today: 'Respondes lo mismo una y otra vez.', after: 'Respuestas listas para tus preguntas frecuentes.' },
]

const trainingOrbit = [
  { icon: Icon.Whatsapp, label: 'WhatsApp', phrase: 'Responde clientes sin copiar y pegar', x: '14%', y: '60%', color: 'text-[#25D366]', delay: 0 },
  { icon: Icon.Instagram, label: 'Instagram', phrase: 'Convierte mensajes en ventas', x: '65%', y: '54%', color: 'text-brio-plum', delay: 0.18 },
  { icon: Icon.Chart, label: 'Excel', phrase: 'Reportes claros al cierre del día', x: '20%', y: '18%', color: 'text-brio-gold-dark', delay: 0.32 },
  { icon: Icon.Folder, label: 'Sheets', phrase: 'Stock y pedidos siempre ordenados', x: '70%', y: '14%', color: 'text-brio-plum', delay: 0.48 },
]

const testimonials = [
  { initials: 'RQ', name: 'Rosa Quispe', business: 'Bodega · Minimarket', quote: 'Antes los pedidos de WhatsApp se me perdían. Ahora llegan ordenados y con seguimiento. Dejé de perder ventas.' },
  { initials: 'CM', name: 'Carlos Medina', business: 'Tienda de ropa', quote: 'La IA responde tallas, precios y stock al toque. Yo solo entro a cerrar la venta.' },
  { initials: 'LF', name: 'Lucía Fernández', business: 'Restaurante', quote: 'Cierro caja en minutos y sé qué se vendió sin sacar la calculadora. Mucho menos estrés en hora punta.' },
]

const founders = [
  { photo: '/team/founder-1.png', initials: 'YR', name: 'Yumi Reyes', role: 'Negocio', bio: 'Entra a tu operación y la ordena contigo. Años ayudando a negocios a vender mejor sin complicarse.', ring: 'ring-brio-terra/30 bg-brio-terra' },
  { photo: '/team/founder-2.jpg', initials: 'MF', name: 'Miguel Fernández', role: 'Tecnología', bio: 'Hace que la tecnología sea simple. Herramientas que tu equipo sí usa, sin tecnicismos.', ring: 'ring-brio-plum/30 bg-brio-plum' },
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
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-white/55' : 'text-brio-plum'}`}>
      {children}
    </span>
  )
}

function btnPrimary(extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-xl bg-brio-terra px-6 py-3.5 text-sm font-bold text-brio-ink shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark active:translate-y-0 active:scale-[0.97] ${extra}`
}

function SectionCta({ text }: { text: string }) {
  return (
    <Reveal className="mt-12 flex justify-center">
      <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('px-7 py-4')}>
        <Icon.Whatsapp className="h-5 w-5" />
        {text}
        <Icon.ArrowRight className="h-4 w-4" />
      </a>
    </Reveal>
  )
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brio-terra text-brio-ink shadow-hard">
        <Icon.Sparkles className="h-4 w-4" />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brio-ink'}`}>
        {BRAND.short}
        <span className={dark ? 'text-gradient' : 'text-brio-plum'}> AI</span>
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Header — barra consciente del scroll                               */
/* ------------------------------------------------------------------ */
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
  const overHero = pathname === '/' && !scrolled

  return (
    <header className={`fixed top-0 inset-x-0 z-50 py-3.5 transition-colors duration-300 ${overHero ? 'bg-transparent' : 'border-b border-brio-border/70 bg-white/85 backdrop-blur-md'}`}>
      <div className="container-x flex items-center justify-between">
        <Logo dark={overHero} />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) =>
              `text-sm font-medium tracking-wide transition-colors ${isActive ? (overHero ? 'text-brio-terra' : 'text-brio-plum') : overHero ? 'text-white/80 hover:text-brio-terra' : 'text-brio-ink/75 hover:text-brio-plum'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('px-4 py-2 text-xs')}>
            <Icon.Whatsapp className="h-3.5 w-3.5" />
            Hablemos
          </a>
        </div>
        {!open && (
          <button aria-label="Abrir menú" className={`md:hidden -m-2.5 p-2.5 ${overHero ? 'text-white' : 'text-brio-ink'}`} onClick={() => setOpen(true)}>
            <Icon.Menu className="h-6 w-6" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-50 flex flex-col bg-white shadow-hard-lg md:hidden"
          >
            {/* Header del menú */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brio-border">
              <Logo dark={false} />
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="text-brio-ink -m-2 p-2">
                <Icon.Close className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-5 py-6 gap-1 flex-1">
              {NAV.map(({ label, to }) => (
                <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) =>
                  `py-4 text-xl font-semibold border-b border-brio-border/50 transition-colors ${isActive ? 'text-brio-plum' : 'text-brio-ink'}`}>
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-5 pb-8 space-y-3">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={btnPrimary('w-full py-4 text-base justify-center')}>
                <Icon.Whatsapp className="h-5 w-5" /> Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup de bandeja (reutilizable: hero)                             */
/* ------------------------------------------------------------------ */
function InboxMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-hard-lg">
      <div className="flex items-center gap-1.5 border-b border-brio-border bg-brio-muted px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
        <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-brio-slate">app.simple.ai</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr]">
        <div className="hidden border-r border-brio-border p-3 sm:block">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-sm font-bold text-brio-ink">Mensajes</span>
            <span className="rounded-full bg-brio-terra/20 px-2 py-0.5 text-[10px] font-bold text-brio-gold-dark">2 nuevos</span>
          </div>
          <div className="space-y-1">
            {inbox.map((c) => (
              <div key={c.initials} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-brio-muted">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brio-plum/10 text-[11px] font-bold text-brio-plum">{c.initials}</span>
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
        <div className="flex flex-col gap-3 bg-brio-muted/50 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brio-plum/10 text-[11px] font-bold text-brio-plum">CR</span>
            <span>
              <span className="block text-xs font-bold text-brio-ink">Camila Ríos</span>
              <span className="flex items-center gap-1 text-[10px] text-brio-slate"><span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> En línea</span>
            </span>
          </div>
          <div className="mt-1 max-w-[80%] self-start rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-xs text-brio-ink shadow-hard-sm">Hola, ¿tienen ese polo que vi en Instagram? 👀</div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-brio-terra px-3.5 py-2.5 text-xs font-medium text-brio-ink shadow-hard-sm">¡Hola Camila! 🙌 Sí, lo tengo en talla M y S. Te lo aparto y te paso el link de pago.</div>
          <span className="self-end text-[10px] font-semibold text-brio-gold-dark">⚡ Respondido por IA en 4s</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  1 — HERO (2 columnas, mockup gigante)                              */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brio-ink-dark pt-28 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 75% -10%, rgba(138,46,146,0.42), transparent 60%), radial-gradient(70% 60% at 0% 100%, rgba(176,60,160,0.22), transparent 60%)' }} />
        <div className="absolute inset-0 texture-dots-dark opacity-50" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-24">
          {/* Texto */}
          <div>
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> IA simple para negocios de verdad
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }} className="font-display font-extrabold leading-[1.03] tracking-[-0.035em] text-white" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>
              Llevamos los negocios a la <span className="text-gradient">era de la IA</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }} className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              Entramos a tu operación y usamos IA, automatización o herramientas simples para que vendas más, pierdas menos tiempo y trabajes con menos desorden.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('px-7 py-4 text-base')}>
                <Icon.Whatsapp className="h-5 w-5" /> Quiero revisar mi negocio
              </a>
              <a href="#casos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:text-base">
                Ver ejemplos por rubro <Icon.ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Mockup gigante */}
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="relative">
            <Tilt className="relative">
              <InboxMockup />
            </Tilt>
            {/* Badges flotantes con contador */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="absolute -right-3 top-16 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra"><Icon.Cash className="h-4 w-4" /></span>
              <span className="leading-tight">
                <Counter to={55826} prefix="S/ " className="block text-sm font-extrabold text-white" />
                <span className="block text-[10px] text-white/50">vendido hoy</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.85, duration: 0.6 }} className="absolute -left-3 bottom-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra"><Icon.Check className="h-4 w-4" /></span>
              <span className="leading-tight">
                <Counter to={38} prefix="+" suffix=" pedidos" className="block text-sm font-extrabold text-white" />
                <span className="block text-[10px] text-white/50">atendidos sin que muevas un dedo</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee de canales */}
      <div className="relative z-10 border-t border-white/10 py-6">
        <Marquee speed={26}>
          {channels.concat(channels, channels).map(({ icon: I, label }, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm font-bold text-white/45">
              <I className="h-4 w-4 text-brio-terra" /> {label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  2 — TE ENTENDEMOS (sticky izq + lista notificaciones der)         */
/* ------------------------------------------------------------------ */
function Pains() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Pill>Te entendemos</Pill>
            <h2 className="mt-4 font-bold leading-[1.08] text-brio-ink" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>
              Tu negocio no necesita tecnología de punta.
            </h2>
            <div className="mt-4 flex flex-col items-start gap-5">
              <span className="inline-block -rotate-2 rounded-xl px-4 py-1.5 font-bold text-white" style={{ background: '#401646', fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>Necesita funcionar</span>
              <span className="inline-block rotate-3 rounded-xl px-4 py-1.5 font-bold text-white" style={{ background: '#401646', fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>mejor.</span>
            </div>
            <p className="mt-4 max-w-md text-base text-brio-slate md:text-lg">
              Si creciste pero todo sigue en WhatsApp, cuadernos y Excel, no estás solo. Ahí es donde entramos.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-[440px]">
            {/* Páginas detrás */}
            <div className="absolute left-10 top-3 h-full w-full rounded-2xl bg-brio-border/70" style={{ transform: 'rotate(2deg)' }} />
            <div className="absolute left-10 top-1.5 h-full w-full rounded-2xl bg-brio-cream" style={{ transform: 'rotate(0.8deg)' }} />

            {/* Hoja principal */}
            <div className="relative ml-10 overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-16px_rgba(28,10,34,0.22)]">
              {/* Header */}
              <div className="border-b-2 border-dashed border-brio-border bg-brio-cream/60 px-6 py-4 text-center">
                <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-brio-slate">COSAS QUE NO FUNCIONAN</span>
              </div>

              {/* Ítems */}
              <ul className="px-6 py-2">
                {pains.map(({ text }, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 border-b border-dashed border-brio-border/50 py-3.5 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.38, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon.Close className="h-4 w-4 flex-shrink-0 text-brio-ink" />
                    <span className="text-sm leading-snug text-brio-ink line-through decoration-brio-ink/40 decoration-1 md:text-base">{text}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-dashed border-brio-border/50 px-6 py-3 text-center">
                <span className="font-mono text-sm font-bold tracking-widest text-brio-slate">y mucho más · · ·</span>
              </div>

              {/* Líneas horizontales de fondo tipo cuaderno */}
              <div className="pointer-events-none absolute inset-0 mt-[3.5rem]" aria-hidden>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="border-b border-blue-50" style={{ height: '3.1rem' }} />
                ))}
              </div>
            </div>

            {/* Espiral binding */}
            <div className="absolute left-5 top-6 bottom-6 flex flex-col justify-around z-10">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-[3.5px] border-brio-slate/50 bg-white shadow-sm"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3 — LO SIMPLE GANA (manifiesto full-bleed)                         */
/* ------------------------------------------------------------------ */
function Simplicity() {
  const simpleIdeas = [
    { text: 'Si una hoja de cálculo resuelve, la mejoramos.', className: 'left-0 top-[34%] md:left-[4%] md:top-[38%]', delay: 0 },
    { text: 'WhatsApp más inteligente, sin cambiar tu canal.', className: 'right-0 top-[30%] md:right-[3%] md:top-[36%]', delay: 0.15 },
    { text: 'Si necesitas un sistema, lo construimos.', className: 'left-[8%] bottom-[24%] md:left-[14%] md:bottom-[22%]', delay: 0.3 },
    { text: 'Pero no empezamos por ahí.', className: 'right-[8%] bottom-[22%] md:right-[14%] md:bottom-[20%]', delay: 0.45 },
  ]

  return (
    <section className="relative overflow-hidden bg-brio-ink pt-24 pb-0 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <Parallax amount={60} className="pointer-events-none absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 glow-radial-terra" />
      <div className="container-x relative z-10">

        {/* MOBILE: layout apilado */}
        <div className="md:hidden text-center">
          <Pill dark>Lo simple gana</Pill>
          <h2 className="mt-6 font-display font-extrabold leading-[1.08] text-white" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)' }}>
            No todo necesita un sistema. A veces solo hay que <span className="text-gradient">ordenar bien lo que ya usas.</span>
          </h2>
          <ul className="mt-8 space-y-3 text-left">
            {simpleIdeas.map((idea) => (
              <li key={idea.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/80 backdrop-blur-sm">
                <Icon.Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brio-terra" />
                {idea.text}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-brio-terra/40 bg-white/[0.07] px-4 py-3 text-sm font-bold text-center backdrop-blur-sm">
            <span className="text-gradient">Cobramos por resolver,</span>{' '}
            <span className="text-white/90">no por complicarte.</span>
          </div>
          <div className="relative mt-8 flex justify-center">
            <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brio-terra/15 blur-3xl" />
            <img src={witchKeepingImage} alt="" className="relative w-64 drop-shadow-[0_36px_60px_rgba(245,225,78,0.18)]" />
          </div>
        </div>

        {/* DESKTOP: layout flotante */}
        <div className="relative mx-auto hidden min-h-[50rem] max-w-6xl md:block md:min-h-[58rem]">
          <Reveal className="relative z-20 mx-auto max-w-5xl text-center -mt-8">
            <Pill dark>Lo simple gana</Pill>
            <h2 className="relative z-20 mx-auto mt-6 max-w-4xl font-display font-extrabold leading-[1.08] text-white" style={{ fontSize: 'clamp(2.1rem, 5.1vw, 3.8rem)' }}>
              No todo necesita un sistema. A veces solo hay que <span className="text-gradient">ordenar bien lo que ya usas.</span>
            </h2>
          </Reveal>

          <div className="pointer-events-none absolute inset-0 z-10">
            {simpleIdeas.map((idea) => (
              <motion.div
                key={idea.text}
                className={`absolute max-w-[15rem] rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-left text-xs !font-thin leading-snug text-white shadow-hard-lg backdrop-blur-sm md:max-w-[17rem] md:text-sm ${idea.className}`}
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                animate={{ y: [0, -10, 0], rotate: [-0.6, 0.6, -0.6] }}
                transition={{ duration: 0.6, delay: idea.delay, ease: [0.16, 1, 0.3, 1], y: { duration: 5 + idea.delay * 2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 6 + idea.delay * 2, repeat: Infinity, ease: 'easeInOut' } }}
              >
                {idea.text}
              </motion.div>
            ))}
          </div>

          <Reveal className="absolute inset-x-0 bottom-0 z-0 flex flex-col items-center" delay={0.08}>
            <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brio-terra/15 blur-3xl" />
            <motion.img
              src={witchKeepingImage}
              alt="Asistente Simple AI sosteniendo la idea principal"
              className="relative block w-80 drop-shadow-[0_36px_60px_rgba(245,225,78,0.18)] sm:w-[28rem] md:w-[36rem]"
              style={{ display: 'block', marginBottom: 0 }}
              animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Reveal>

          <motion.div
            className="absolute bottom-[5%] left-[20%] z-20 rounded-2xl border border-brio-terra/40 bg-white/[0.07] px-4 py-3 text-center text-xs font-bold leading-snug text-white shadow-hard-lg backdrop-blur-sm md:left-[38%] md:text-sm"
            style={{ maxWidth: '17rem' }}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            animate={{ y: [0, -10, 0], rotate: [-0.6, 0.6, -0.6] }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1], y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <span className="text-gradient">Cobramos por resolver,</span>{' '}
            <span className="text-white/90">no por complicarte.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  4 — QUÉ RESOLVEMOS (tabs interactivas con panel vivo)             */
/* ------------------------------------------------------------------ */
function Solutions() {
  const [active, setActive] = useState(0)
  const s = solutions[active]
  return (
    <section id="resolvemos" className="section-padding relative overflow-hidden bg-brio-muted scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Qué resolvemos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Hacemos que lo repetitivo se haga solo o más rápido</h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">No cambiamos lo que ya funciona. Quitamos lo que te roba tiempo y plata.</p>
        </Reveal>

        <div className="flex flex-wrap gap-2">
          {solutions.map((it, i) => (
            <button key={it.tab} onClick={() => setActive(i)} className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${i === active ? 'bg-brio-ink text-white shadow-hard' : 'bg-white text-brio-slate hover:text-brio-ink'}`}>
              {it.tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 rounded-[24px] border border-brio-border bg-white p-6 shadow-hard-sm md:grid-cols-2 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brio-plum">El dueño dice</span>
              <p className="mt-3 text-xl font-bold leading-snug text-brio-ink md:text-2xl">“{s.quote}”</p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brio-muted p-4">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra text-brio-ink"><Icon.Check className="h-4 w-4" /></span>
                <span className="text-sm font-semibold leading-snug text-brio-ink md:text-base">{s.solution}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mini panel "vivo" */}
          <div className="flex flex-col justify-center rounded-2xl border border-brio-border bg-brio-ink-dark p-5">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> {s.exampleFrom}</div>
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-white/80">{s.exampleAsk}</div>
                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-brio-terra px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brio-ink">{s.exampleDone}</div>
                <div className="text-right text-[10px] font-semibold text-brio-terra">listo para usar en el día a día</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <SectionCta text="Ver qué resolvemos para tu negocio" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  5 — CÓMO TRABAJAMOS (stepper horizontal con mini-mocks)           */
/* ------------------------------------------------------------------ */
function StepMock({ n }: { n: number }) {
  // pequeña UI decorativa distinta por paso
  const common = 'mt-5 rounded-xl border border-brio-border bg-brio-muted p-3'
  // Paso 1 — Diagnóstico: checklist de áreas revisadas
  if (n === 0) return (
    <div className={common}>
      {[['Ventas', true], ['Cobranza', true], ['Atención', false], ['Stock', false]].map(([label, done]) => (
        <div key={label as string} className="flex items-center gap-2 py-1">
          <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded ${done ? 'bg-brio-plum text-white' : 'border border-brio-border bg-white'}`}>
            {done && <Icon.Check className="h-2.5 w-2.5" />}
          </span>
          <div className={`h-1.5 flex-1 rounded ${done ? 'bg-brio-plum/40' : 'bg-brio-border'}`} />
          <span className="text-[9px] font-bold text-brio-slate">{label as string}</span>
        </div>
      ))}
    </div>
  )
  // Paso 2 — Prototipo: chat WhatsApp antes/después
  if (n === 1) return (
    <div className={common + ' space-y-1.5'}>
      <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-white px-2 py-1.5 text-[9px] leading-tight text-brio-slate shadow-hard-sm">¿Tienes talla M en negro?</div>
      <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-brio-terra px-2 py-1.5 text-[9px] font-bold leading-tight text-brio-ink">Sí, S/.89. ¿Te lo aparto? 👇</div>
      <span className="inline-block rounded-md bg-brio-plum/10 px-1.5 py-0.5 text-[8px] font-bold text-brio-plum">Vista previa del prototipo</span>
    </div>
  )
  // Paso 3 — Implementación: flujo de nodos conectados
  if (n === 2) return (
    <div className={common + ' flex items-center justify-between gap-1'}>
      {[['WA', 'bg-[#25D366] text-white'], ['IA', 'bg-brio-plum text-white'], ['Hoja', 'bg-brio-terra text-brio-ink']].map(([label, cls], i, arr) => (
        <div key={label as string} className="flex items-center gap-1">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-black ${cls}`}>{label as string}</div>
          {i < arr.length - 1 && <div className="h-px w-3 border-t-2 border-dashed border-brio-border" />}
        </div>
      ))}
      <span className="ml-1 text-[9px] font-bold text-brio-terra">✓ listo</span>
    </div>
  )
  // Paso 4 — Acompañamiento: métricas de mejora
  if (n === 3) return (
    <div className={common}>
      <div className="flex items-end gap-1">
        {[30, 42, 38, 55, 61, 80].map((h, i) => (
          <span key={i} className={`w-full rounded-t transition-all ${i === 5 ? 'bg-brio-terra' : 'bg-brio-plum/30'}`} style={{ height: `${h * 0.38}px` }} />
        ))}
      </div>
      <div className="mt-2 text-[9px] font-bold text-brio-plum">↑ mejora continua</div>
    </div>
  )
  return null
}

function Process() {
  return (
    <section id="como-trabajamos" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Cómo trabajamos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Miramos tu negocio por dentro antes de tocar tecnología</h2>
        </Reveal>
        <Stagger className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible">
          {process.map((p, i) => (
            <StaggerItem key={p.n} className="w-[78%] flex-shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <div className="flex h-full flex-col rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hard-lg">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-brio-plum px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Paso {p.n}</span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-brio-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brio-slate">{p.body}</p>
                <StepMock n={i} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <SectionCta text="Agendar mi diagnóstico" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  6 — CASOS POR RUBRO (2 marquees opuestos)                         */
/* ------------------------------------------------------------------ */
function SectorChip({ icon: I, title, quote }: { icon: (p: IconProps) => ReactNode; title: string; quote: string }) {
  return (
    <div className="mx-2.5 flex w-[19rem] items-start gap-3 rounded-2xl border border-brio-border bg-white p-5 shadow-hard-sm">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brio-terra text-brio-ink">{I({ className: 'h-5 w-5' })}</span>
      <span>
        <span className="block text-base font-bold text-brio-ink">{title}</span>
        <span className="mt-1 block text-sm leading-snug text-brio-slate">{quote}</span>
      </span>
    </div>
  )
}

function Sectors() {
  return (
    <section id="casos" className="section-padding relative overflow-hidden bg-brio-muted scroll-mt-20">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Casos por rubro</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Ejemplos reales de lo que podemos simplificar</h2>
        </Reveal>
      </div>
      <div className="relative z-10 space-y-4" style={{ maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
        <Marquee speed={160}>
          {sectors.map((c) => <SectorChip key={c.title} {...c} />)}
        </Marquee>
        <Marquee speed={190} reverse>
          {sectors.slice().reverse().map((c) => <SectorChip key={c.title} {...c} />)}
        </Marquee>
      </div>
      <div className="container-x relative z-10">
        <SectionCta text="Encontrar mi caso" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  7 — ANTES / DESPUÉS (diff con reveal lateral)                     */
/* ------------------------------------------------------------------ */
function BeforeAfter() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <Reveal className="mb-12 max-w-2xl">
          <Pill>Antes / Después</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>El mismo negocio,<br /><span className="text-brio-slate">operando distinto</span></h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] border border-brio-border bg-white p-6 shadow-hard-sm sm:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-ink/[0.04] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-brio-slate/50" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-slate">Hoy</span>
              </div>
              <ul className="space-y-4">
                {transformation.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-snug text-brio-slate md:text-base">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-slate/10 text-brio-slate"><Icon.Close className="h-3 w-3" /></span>
                    <span>{t.today}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-[22px] border border-brio-terra/30 bg-brio-ink p-6 shadow-hard-lg sm:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-terra/15 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-brio-terra" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-terra-light">Con {BRAND.short}</span>
              </div>
              <Stagger className="space-y-4">
                {transformation.map((t, i) => (
                  <StaggerItem key={i} y={0}>
                    <div className="flex items-start gap-3 text-sm leading-snug text-white/85 md:text-base">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra-light"><Icon.Check className="h-3 w-3" /></span>
                      <span>{t.after}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  8 — CAPACITAMOS (bento)                                            */
/* ------------------------------------------------------------------ */
function Training() {
  const sectionRef = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const glowX = useSpring(rawX, { stiffness: 280, damping: 28 })
  const glowY = useSpring(rawY, { stiffness: 280, damping: 28 })

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative overflow-hidden bg-brio-bone py-20 md:py-24">
      <svg aria-hidden viewBox="0 0 1200 760" preserveAspectRatio="none" className="absolute inset-x-[-10%] inset-y-0 h-full w-[120%] text-brio-ink">
        <defs>
          <pattern id="training-paint-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.055)" />
          </pattern>
          <filter id="training-paint-edge" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.11" numOctaves="3" seed="11" result="tornNoise" />
            <feDisplacementMap in="SourceGraphic" in2="tornNoise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <path
          className="fill-current"
          filter="url(#training-paint-edge)"
          d="M-90 38C-35 18 18 31 72 18C119 7 161 43 209 27C267 8 323 29 382 14C438 0 488 34 548 20C606 7 655 47 716 31C776 15 833 42 889 21C949 -2 1000 32 1054 22C1133 8 1204 43 1290 30V717C1227 733 1172 705 1113 722C1063 736 1014 699 963 718C906 739 853 703 798 727C738 753 682 710 623 730C561 751 514 711 454 726C391 742 337 700 276 718C217 736 163 700 105 724C43 750-19 714-90 731V38Z"
        />
        <path
          fill="url(#training-paint-dots)"
          filter="url(#training-paint-edge)"
          d="M-90 38C-35 18 18 31 72 18C119 7 161 43 209 27C267 8 323 29 382 14C438 0 488 34 548 20C606 7 655 47 716 31C776 15 833 42 889 21C949 -2 1000 32 1054 22C1133 8 1204 43 1290 30V717C1227 733 1172 705 1113 722C1063 736 1014 699 963 718C906 739 853 703 798 727C738 753 682 710 623 730C561 751 514 711 454 726C391 742 337 700 276 718C217 736 163 700 105 724C43 750-19 714-90 731V38Z"
        />
      </svg>
      <motion.div
        className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-brio-terra/20 blur-3xl"
        style={{ left: glowX, top: glowY, translateX: '-50%', translateY: '-50%' }}
      />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-brio-plum/30 blur-3xl" />
      <div className="container-x relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-white">
            Tu equipo ya usa esas herramientas.
            <span className="block text-gradient">Ahora va a usarlas mejor.</span>
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-brio-terra" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
            WhatsApp, Instagram, Excel y Sheets conectados a frases, plantillas y rutinas que tu equipo sí entiende. Nada de teoría: capacitación con casos reales de tu negocio.
          </p>
        </Reveal>

        {/* MOBILE: lista compacta */}
        <div className="mt-8 space-y-2.5 md:hidden">
          {trainingOrbit.map((item) => {
            const OrbitIcon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3.5 backdrop-blur-sm">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brio-terra">
                  <OrbitIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-brio-terra">{item.label}</span>
                  <span className="mt-0.5 block text-sm font-bold leading-snug text-white">{item.phrase}</span>
                </span>
              </div>
            )
          })}
        </div>

        {/* DESKTOP: orbit layout */}
        <Reveal className="relative mx-auto mt-2 hidden h-[30rem] max-w-5xl md:block sm:mt-4 sm:h-[34rem]">
          <div className="absolute bottom-8 left-1/2 h-[25rem] w-[50rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-white/15 sm:h-[30rem] sm:w-[62rem]" />
          <div className="absolute bottom-8 left-1/2 h-[16rem] w-[32rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-white/20 sm:h-[20rem] sm:w-[42rem]" />
          <motion.div
            aria-hidden
            className="absolute bottom-8 left-1/2 h-[9rem] w-[18rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-brio-terra/70 sm:h-[12rem] sm:w-[26rem]"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute bottom-0 left-[40%] z-20 flex h-28 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_34%_24%,#ffffff_0%,#ffffff_28%,#f8f4f9_54%,#f5e14e_112%)] px-3 text-base font-black tracking-[-0.055em] text-brio-ink shadow-[0_48px_105px_-38px_rgba(138,46,146,0.9),0_24px_60px_-34px_rgba(28,10,34,0.95),inset_12px_16px_28px_rgba(255,255,255,0.95),inset_-18px_-28px_34px_rgba(138,46,146,0.14),inset_0_-16px_0_rgba(245,225,78,0.2)] ring-[7px] ring-brio-plum/20 sm:bottom-2 sm:left-[42%] sm:h-36 sm:w-36 sm:px-4 sm:text-xl"
            animate={{ y: [0, -12, 0], scale: [1, 1.03, 1], boxShadow: ['0 48px 105px -38px rgba(138,46,146,0.9), 0 24px 60px -34px rgba(28,10,34,0.95), inset 12px 16px 28px rgba(255,255,255,0.95), inset -18px -28px 34px rgba(138,46,146,0.14), inset 0 -20px 0 rgba(245,225,78,0.2)', '0 64px 140px -44px rgba(138,46,146,1), 0 30px 70px -38px rgba(28,10,34,1), inset 14px 18px 30px rgba(255,255,255,0.98), inset -22px -34px 42px rgba(138,46,146,0.18), inset 0 -24px 0 rgba(245,225,78,0.25)', '0 48px 105px -38px rgba(138,46,146,0.9), 0 24px 60px -34px rgba(28,10,34,0.95), inset 12px 16px 28px rgba(255,255,255,0.95), inset -18px -28px 34px rgba(138,46,146,0.14), inset 0 -20px 0 rgba(245,225,78,0.2)'] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative inline-flex max-w-full items-baseline whitespace-nowrap drop-shadow-sm">
              {BRAND.short}
              <span className="ml-1 text-brio-plum">AI</span>
              <Icon.Sparkles className="absolute -right-4 -top-3 h-4 w-4 text-brio-terra sm:-right-5 sm:-top-4 sm:h-5 sm:w-5" />
            </span>
          </motion.div>

          {trainingOrbit.map((item) => {
            const OrbitIcon = item.icon
            return (
              <motion.div
                key={item.label}
                className="absolute z-30 max-w-[12rem] -translate-x-1/2 -translate-y-1/2"
                style={{ left: item.x, top: item.y }}
                initial={{ opacity: 0, y: 18, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                animate={{ translateY: [0, -10, 0] }}
                transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1], translateY: { duration: 4 + item.delay * 4, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <div className="group flex h-24 w-52 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2.5 pr-4 shadow-hard-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brio-terra">
                    <OrbitIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brio-terra">{item.label}</span>
                    <span className="mt-0.5 block text-xs font-bold leading-snug text-white sm:text-sm">{item.phrase}</span>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </Reveal>

        <Reveal className="mx-auto mt-7 flex justify-center sm:mt-8">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('w-full px-7 py-4 sm:w-fit')}>
            <Icon.Whatsapp className="h-5 w-5" /> Capacitar a mi equipo
            <Icon.ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  9 — TESTIMONIOS (marquee de cards)                                */
/* ------------------------------------------------------------------ */
function TestimonialCard({ initials, name, business, quote }: typeof testimonials[number]) {
  return (
    <div className="mx-2.5 flex w-[20rem] flex-col rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm sm:w-[24rem]">
      <span className="mb-4 text-sm tracking-wide text-brio-terra">★★★★★</span>
      <p className="flex-1 text-sm leading-relaxed text-brio-ink md:text-base">“{quote}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-brio-border pt-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brio-plum/10 text-xs font-bold text-brio-plum">{initials}</span>
        <span className="leading-tight">
          <span className="block text-sm font-bold text-brio-ink">{name}</span>
          <span className="block text-xs text-brio-slate">{business}</span>
        </span>
      </div>
    </div>
  )
}

function SocialProof() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Casos en marcha</Pill>
          <h2 className="mt-4 font-bold leading-tight text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Lo importante no es que la IA suene moderna. <span className="text-brio-plum">Es que tu equipo la use.</span>
          </h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">Estamos arrancando con negocios reales. Primeras mejoras en semanas, no en meses.</p>
        </Reveal>
      </div>
      <div className="relative z-10" style={{ maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
        <Marquee speed={38}>
          {testimonials.map((t) => <TestimonialCard key={t.initials} {...t} />)}
        </Marquee>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  10 — DIAGNÓSTICO / CONTACTO                                        */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <Parallax amount={50} className="pointer-events-none absolute -top-20 right-[10%] h-[28rem] w-[28rem] glow-radial-terra" />
      <div className="container-x relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-brio-ink-dark shadow-hard-lg">
            <div className="absolute inset-0 texture-dots-dark opacity-70" />
            <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-brio-plum/30 blur-3xl" />
            <div className="absolute -bottom-28 right-10 h-96 w-96 rounded-full bg-brio-terra/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[25rem] overflow-hidden p-7 sm:p-10 lg:min-h-[30rem]">
                <Pill dark>Diagnóstico gratis</Pill>
                <h2 className="mt-5 max-w-xl font-display text-3xl font-black leading-tight text-white md:text-5xl">
                  Mándanos <span className="text-gradient">un mensaje</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                  Dinos qué parte de tu operación te está quitando tiempo. Te respondemos con una idea concreta, sin venderte humo.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="flex flex-shrink-0 -space-x-3">
                    {founders.map((f) => (
                      <img key={f.name} src={f.photo} alt="" loading="lazy" className="h-10 w-10 rounded-full border-2 border-brio-ink-dark object-cover" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Respondemos en menos de 24h</p>
                    <p className="text-xs text-white/45">Bruno, Leonardo y Simple AI, en persona.</p>
                  </div>
                </div>

                <div className="mt-8 max-w-sm space-y-8 sm:mt-16">
                  <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brio-plum/25 text-brio-terra ring-1 ring-white/10"><Icon.Mail className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Correo</span>
                      <span className="block truncate text-sm font-bold text-white/80 group-hover:text-white">{BRAND.email}</span>
                    </span>
                    <Icon.ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-brio-terra" />
                  </a>
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] ring-1 ring-white/10"><Icon.Whatsapp className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">WhatsApp</span>
                      <span className="block text-sm font-bold text-white/80 group-hover:text-white">+51 991 735 542</span>
                    </span>
                    <Icon.ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-brio-terra" />
                  </a>
                </div>

                <motion.img
                  src={witchImage}
                  alt="Asistente Simple AI"
                  className="pointer-events-none absolute -bottom-10 right-0 hidden w-52 opacity-95 drop-shadow-[0_30px_45px_rgba(245,225,78,0.22)] sm:block sm:w-64 lg:right-2 lg:w-72"
                  animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <div className="relative border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
                <form className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-hard-lg backdrop-blur-sm sm:p-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-white/45">¿Qué tipo de negocio tienes?</label>
                      <input type="text" className="w-full rounded-2xl border border-white/10 bg-brio-ink-dark/70 px-5 py-5 text-base font-semibold text-white placeholder-white/25 outline-none transition-colors focus:border-brio-terra" placeholder="Bodega, restaurante, tienda de ropa..." />
                    </div>
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-white/45">Tu WhatsApp</label>
                      <input type="tel" className="w-full rounded-2xl border border-white/10 bg-brio-ink-dark/70 px-5 py-5 text-base font-semibold text-white placeholder-white/25 outline-none transition-colors focus:border-brio-terra" placeholder="+51 999 999 999" />
                    </div>
                    <button type="submit" className={btnPrimary('mt-24 w-full py-5 text-base')}>
                      Hacer mi diagnóstico <Icon.ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                <div className="mx-auto mt-5 max-w-md">
                  <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                    <span className="h-px flex-1 bg-white/10" />
                    <span>o</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="flex justify-center">
                    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-[#1DB954] px-6 py-3.5 text-sm font-black text-white shadow-[0_22px_45px_-28px_rgba(29,185,84,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19a84c] active:scale-[0.98]">
                      <Icon.Whatsapp className="h-5 w-5" /> Escríbenos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FounderAvatar({ photo, initials, ring }: { photo: string; initials: string; ring: string }) {
  const [failed, setFailed] = useState(false)
  const base = 'h-28 w-28 flex-shrink-0 rounded-full object-cover ring-4 ring-offset-4 ring-offset-brio-bone'
  if (failed) return <span className={`flex items-center justify-center text-2xl font-extrabold text-brio-ink ${base} ${ring}`}>{initials}</span>
  return <img src={photo} alt="" loading="lazy" onError={() => setFailed(true)} className={`${base} ${ring}`} />
}

/* ------------------------------------------------------------------ */
/*  11 — NOSOTROS                                                      */
/* ------------------------------------------------------------------ */
function Team() {
  return (
    <section id="equipo" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20 texture-dots">
      <div className="absolute -top-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-brio-terra/20 blur-3xl" />
      <div className="absolute -bottom-40 left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-brio-plum/10 blur-3xl" />
      <div className="container-x relative z-10">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <Pill>Nosotros</Pill>
          <h2 className="mt-4 text-fluid-section font-black leading-tight tracking-tight text-brio-ink">
            Gente que entra a tu operación
            <span className="block text-brio-plum">y resuelve contigo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brio-slate md:text-lg">
            Hablamos como socio operativo, no como proveedor técnico. Negocio y tecnología en la misma mesa.
          </p>
          <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
            {['operación real', 'IA aplicada', 'ventas', 'automatización'].map((tag) => (
              <span key={tag} className="rounded-full border border-brio-border bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brio-plum shadow-hard-sm">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-1/2 hidden h-44 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brio-plum/20 md:block" />
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {founders.map((f, i) => (
              <StaggerItem key={f.name} className={i === 1 ? 'sm:translate-y-8' : ''}>
                <Tilt strength={5} className="h-full">
                  <div className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[30px] border border-brio-border bg-white p-7 text-center shadow-hard-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hard-lg">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brio-terra via-brio-plum to-brio-terra opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -right-4 -top-7 font-mono text-[8rem] font-black leading-none text-brio-ink/[0.035]">{f.initials}</span>
                    <div className="relative mx-auto rounded-full bg-gradient-to-br from-brio-terra/35 via-white to-brio-plum/20 p-2 shadow-hard-lg transition-transform duration-300 group-hover:scale-105">
                      <FounderAvatar photo={f.photo} initials={f.initials} ring={f.ring} />
                    </div>
                    <h3 className="relative mt-6 text-2xl font-black tracking-tight text-brio-ink">{f.name}</h3>
                    <p className="relative mt-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brio-plum">{f.role}</p>
                    <p className="relative mt-5 flex-1 text-sm leading-relaxed text-brio-slate">{f.bio}</p>
                    <div className="relative mt-6 flex items-center justify-center gap-3 border-t border-brio-border pt-5">
                      <a href="#" aria-label={`LinkedIn de ${f.name}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brio-border text-brio-slate/60 transition-all duration-300 hover:border-brio-plum hover:text-brio-plum hover:-translate-y-0.5"><Icon.Linkedin className="h-4 w-4" /></a>
                    </div>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  12 — FAQ (acordeón con motion)                                     */
/* ------------------------------------------------------------------ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brio-border bg-white shadow-hard-sm"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex w-full items-center gap-3 px-5 py-4 text-left" tabIndex={0} onClick={() => setOpen((v) => !v)}>
        <h3 className="flex-1 font-bold text-brio-ink">{q}</h3>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className={open ? 'text-brio-plum' : 'text-brio-slate/50'}><Icon.ChevronDown className="h-5 w-5" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-brio-slate">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Faq() {
  return (
    <section className="section-padding bg-brio-muted">
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <Pill>Preguntas frecuentes</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Preguntas honestas, respuestas honestas</h2>
        </Reveal>
        <Stagger className="grid max-w-5xl gap-3 md:grid-cols-2 md:items-start">
          {faqs.map((f, i) => (
            <StaggerItem key={i}><FaqItem q={f.q} a={f.a} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brio-ink-dark py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo dark />
        <p className="text-sm text-white/40">© {new Date().getFullYear()} {BRAND.name}. {BRAND.tagline}</p>
        <div className="flex items-center gap-4 text-white/50">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-brio-terra"><Icon.Whatsapp className="h-5 w-5" /></a>
          <a href={`mailto:${BRAND.email}`} aria-label="Correo" className="transition-colors hover:text-brio-terra"><Icon.Mail className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-hard-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1EBE57]">
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" style={{ animationDuration: '2.5s' }} />
      <Icon.Whatsapp className="relative h-9 w-9" />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  Páginas                                                            */
/* ------------------------------------------------------------------ */
function Home() {
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
      <SocialProof />
      <Contact />
      <Team />
      <Faq />
    </main>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <main className="section-padding bg-brio-bone">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brio-terra/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brio-gold-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> Próximamente
        </span>
        <h1 className="font-display text-3xl font-extrabold text-brio-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-md text-brio-slate">Esta página aún no existe. Por ahora todo el contenido vive en Inicio; pronto le damos el suyo.</p>
        <Link to="/" className={btnPrimary('mt-8')}>Volver a Inicio <Icon.ArrowRight className="h-4 w-4" /></Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resolvemos" element={<ComingSoon title="Qué resolvemos" />} />
          <Route path="/como-trabajamos" element={<ComingSoon title="Cómo trabajamos" />} />
          <Route path="/casos" element={<ComingSoon title="Casos" />} />
          <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  )
}
