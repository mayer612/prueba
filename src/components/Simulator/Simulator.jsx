import { useEffect, useMemo, useRef, useState } from 'react'
import { ESCENARIOS } from '../../data/scenarios'
import ChatMessage from './ChatMessage'

const PAUSA_TRANSICION_MS = 1800

// Mezcla las opciones para que la posición no delate la categoría.
function mezclar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

// Simulador: muestra el escenario actual como chat, el candidato elige una opción
// y tras una breve pausa se pasa solo al siguiente escenario. Al terminar el
// tercero llama a onFinish.
//  props: indice (escenario actual), respuestas, onAnswer(escenarioId, opcionId), onFinish()
export default function Simulator({ indice, respuestas, onAnswer, onFinish }) {
  const escenario = ESCENARIOS[indice]
  const opciones = useMemo(() => mezclar(escenario.opciones), [escenario])
  const elegida = respuestas.find((r) => r.escenarioId === escenario.id)
  const elegidaOpcion = elegida && escenario.opciones.find((o) => o.id === elegida.opcionId)
  const [bloqueado, setBloqueado] = useState(false)
  const fin = useRef(null)

  // Transición automática al siguiente escenario (o a resultados) tras elegir
  useEffect(() => {
    if (!elegida) return
    const t = setTimeout(() => {
      setBloqueado(false)
      onFinish()
    }, PAUSA_TRANSICION_MS)
    return () => clearTimeout(t)
  }, [elegida, onFinish])

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [elegida, indice])

  const elegir = (op) => {
    if (bloqueado || elegida) return
    setBloqueado(true)
    onAnswer(escenario.id, op.id)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-brand-black text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="font-bold">
            Quest<span className="text-brand-orange">Hire</span>
          </span>
          <span className="text-sm text-brand-gray-border">
            Escenario {indice + 1} de {ESCENARIOS.length}
          </span>
        </div>
        <div className="max-w-2xl mx-auto mt-3 h-1.5 rounded bg-brand-black-soft">
          <div
            className="h-full rounded bg-brand-orange transition-all"
            style={{ width: `${((indice + (elegida ? 1 : 0)) / ESCENARIOS.length) * 100}%` }}
          />
        </div>
      </header>

      <section className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 space-y-4">
        <h2 className="text-2xl font-extrabold">{escenario.titulo}</h2>
        <ChatMessage tipo="narrador" texto={escenario.contexto} />
        {escenario.mensajes.map((m, i) => (
          <ChatMessage
            key={i}
            autor={m.autor}
            rol={m.rol}
            texto={m.texto}
            tipo={m.autor === 'Sistema' ? 'narrador' : 'personaje'}
          />
        ))}

        {elegidaOpcion ? (
          <>
            <ChatMessage tipo="candidato" autor="Tú" texto={elegidaOpcion.texto} />
            <p className="text-center text-sm text-brand-gray">
              {indice + 1 < ESCENARIOS.length ? 'Pasando al siguiente escenario…' : 'Preparando tu cierre…'}
            </p>
          </>
        ) : (
          <div className="space-y-3 pt-2">
            <p className="text-sm font-semibold text-brand-gray">¿Cómo responderías?</p>
            {opciones.map((op) => (
              <button
                key={op.id}
                onClick={() => elegir(op)}
                className="w-full text-left bg-white border border-brand-gray-border rounded-xl px-4 py-3 text-sm leading-relaxed hover:border-brand-orange hover:bg-brand-orange-light transition-colors"
              >
                {op.texto}
              </button>
            ))}
          </div>
        )}
        <div ref={fin} />
      </section>
    </main>
  )
}
