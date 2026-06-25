/* ------------------------------------------------------------------ */
/*  Helpers de estilos compartidos                                     */
/* ------------------------------------------------------------------ */
export function btnPrimary(extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-xl bg-brio-terra px-6 py-3.5 text-sm font-bold text-brio-ink shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark active:translate-y-0 active:scale-[0.97] ${extra}`
}
