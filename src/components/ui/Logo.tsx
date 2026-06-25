import { Link } from 'react-router-dom'
import { Icon } from '../../icons'
import { BRAND } from '../../config/brand'

export function Logo({ dark = false }: { dark?: boolean }) {
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
