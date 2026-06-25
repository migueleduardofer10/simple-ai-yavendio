import { Icon } from '../../icons'
import { BRAND } from '../../config/brand'

export function FloatingWhatsApp() {
  return (
    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-hard-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1EBE57]">
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" style={{ animationDuration: '2.5s' }} />
      <Icon.Whatsapp className="relative h-9 w-9" />
    </a>
  )
}
