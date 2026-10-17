// Burbuja de mensaje. tipo: 'personaje' | 'narrador' | 'candidato'
export default function ChatMessage({ autor, rol, texto, tipo = 'personaje' }) {
  if (tipo === 'narrador') {
    return (
      <div className="text-center text-sm italic text-brand-gray px-4">{texto}</div>
    )
  }
  const esCandidato = tipo === 'candidato'
  return (
    <div className={`flex ${esCandidato ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          esCandidato
            ? 'bg-brand-orange text-white rounded-br-sm'
            : 'bg-white border border-brand-gray-border rounded-bl-sm'
        }`}
      >
        <p className={`text-xs font-semibold ${esCandidato ? 'text-brand-orange-light' : 'text-brand-orange-dark'}`}>
          {autor}
          {rol && <span className="font-normal opacity-80"> · {rol}</span>}
        </p>
        <p className="mt-1 text-sm leading-relaxed">{texto}</p>
      </div>
    </div>
  )
}
