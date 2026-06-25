import type { ReactNode } from 'react'

export function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-white/55' : 'text-brio-plum'}`}>
      {children}
    </span>
  )
}
