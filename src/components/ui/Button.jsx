// Botón reutilizable. variant: 'primary' (naranja) | 'outline' | 'dark'
const ESTILOS = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-dark disabled:bg-brand-gray-border disabled:text-brand-gray disabled:cursor-not-allowed',
  outline:
    'border border-brand-gray-border bg-white text-brand-black hover:border-brand-orange hover:text-brand-orange-dark',
  dark: 'bg-brand-black text-white hover:bg-brand-black-soft',
}

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`rounded-lg px-5 py-3 font-semibold transition-colors ${ESTILOS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
