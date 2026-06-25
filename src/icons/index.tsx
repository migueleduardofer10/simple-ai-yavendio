/* ------------------------------------------------------------------ */
/*  Set de íconos inline (sin dependencias extra)                      */
/* ------------------------------------------------------------------ */
export type IconProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const Icon = {
  Menu: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 5h16M4 12h16M4 19h16" /></svg>
  ),
  Close: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M18 6 6 18M6 6l12 12" /></svg>
  ),
  ArrowRight: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M20 6 9 17l-5-5" /></svg>
  ),
  ChevronDown: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="m6 9 6 6 6-6" /></svg>
  ),
  Sparkles: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4M22 4h-4" /><circle cx="4" cy="20" r="2" />
    </svg>
  ),
  Mail: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
  ),
  Whatsapp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
  ),
  Instagram: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
  ),
  Linkedin: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
  ),
  Store: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M3 9h18l-1.5-5.5A1 1 0 0 0 18.54 3H5.46a1 1 0 0 0-.96.5L3 9Z" /><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" /><path d="M9 20v-5h6v5" /></svg>
  ),
  Shirt: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2H10L8 3Z" /></svg>
  ),
  Utensils: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 3v6a2 2 0 0 0 2 2v10M9 3v8M6.5 3v5M18 3c-1.5 0-3 1.5-3 5 0 2.5 1 3.5 2 4v9" /></svg>
  ),
  Wrench: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.83 2.83 0 0 1-4-4l9-9a4 4 0 0 0-1-1Z" /></svg>
  ),
  Stethoscope: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M5 3v6a4 4 0 0 0 8 0V3" /><path d="M9 17a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>
  ),
  Cap: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5" /></svg>
  ),
  Chart: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M3 3v18h18" /><path d="M7 16v-4M12 16V8M17 16v-6" /></svg>
  ),
  Chat: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>
  ),
  Cash: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
  ),
  Folder: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /></svg>
  ),
}
