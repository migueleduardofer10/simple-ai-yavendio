import { inbox } from '../data'

/* ------------------------------------------------------------------ */
/*  Mockup de bandeja (reutilizable: hero)                             */
/* ------------------------------------------------------------------ */
export function InboxMockup() {
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
