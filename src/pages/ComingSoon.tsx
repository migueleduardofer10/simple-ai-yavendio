import { Link } from 'react-router-dom'
import { Icon } from '../icons'
import { btnPrimary } from '../lib/styles'

export function ComingSoon({ title }: { title: string }) {
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
