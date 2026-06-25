import { Reveal } from '../../motion'
import { Icon } from '../../icons'
import { BRAND } from '../../config/brand'
import { btnPrimary } from '../../lib/styles'

export function SectionCta({ text }: { text: string }) {
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
