import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from '../../motion'
import { Icon } from '../../icons'
import { NAV } from '../../config/nav'
import { BRAND } from '../../config/brand'
import { btnPrimary } from '../../lib/styles'
import { Logo } from '../ui/Logo'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ------------------------------------------------------------------ */
/*  Header — barra consciente del scroll                               */
/* ------------------------------------------------------------------ */
export function Header() {
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
                  `py-4 text-xl font-medium border-b border-brio-border/50 transition-colors ${isActive ? 'text-brio-plum' : 'text-brio-ink'}`}>
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-5 pb-8 space-y-3">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={btnPrimary('w-full py-4 text-base justify-center')}>
                <Icon.Whatsapp className="h-5 w-5" /> Hablemos
              </a>
              <button onClick={() => setOpen(false)} className="w-full rounded-xl border border-brio-border py-3.5 text-sm font-medium text-brio-slate transition-colors hover:border-brio-plum hover:text-brio-plum">
                Switch to English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
