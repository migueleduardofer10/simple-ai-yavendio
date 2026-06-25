import { Icon } from '../../icons'
import { BRAND } from '../../config/brand'
import { Logo } from '../ui/Logo'

export function Footer() {
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
