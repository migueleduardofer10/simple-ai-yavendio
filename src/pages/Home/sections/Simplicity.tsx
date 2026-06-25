import { Reveal, Parallax, motion } from '../../../motion'
import { Icon } from '../../../icons'
import { Pill } from '../../../components/ui/Pill'
import witchKeepingImage from '../../../assets/images/witch-keeping.png'

/* ------------------------------------------------------------------ */
/*  3 — LO SIMPLE GANA (manifiesto full-bleed)                         */
/* ------------------------------------------------------------------ */
export function Simplicity() {
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
