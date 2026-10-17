import { useCallback, useEffect, useState } from 'react'
import { ESCENARIOS } from './data/scenarios'
import Welcome from './components/Welcome/Welcome'
import Simulator from './components/Simulator/Simulator'
import Results from './components/Results/Results'
import { borrarProgreso, cargarProgreso, guardarProgreso } from './utils/storage'

// Flujo: bienvenida -> simulador (3 escenarios encadenados) -> resultados.
// El estado completo se persiste en localStorage para sobrevivir a una recarga.
//  - escenarioActual: índice del escenario en pantalla
//  - terminado: true cuando se completó el último escenario
const INICIAL = { candidato: null, respuestas: [], escenarioActual: 0, terminado: false }

export default function App() {
  const [estado, setEstado] = useState(() => ({ ...INICIAL, ...cargarProgreso() }))
  const { candidato, respuestas, escenarioActual, terminado } = estado

  useEffect(() => {
    guardarProgreso(estado)
  }, [estado])

  const iniciar = (c) => setEstado({ ...INICIAL, candidato: c })

  // Registra la elección (ignora duplicados del mismo escenario)
  const responder = (escenarioId, opcionId) =>
    setEstado((s) =>
      s.respuestas.some((r) => r.escenarioId === escenarioId)
        ? s
        : { ...s, respuestas: [...s.respuestas, { escenarioId, opcionId }] },
    )

  // Transición automática: avanza al siguiente escenario o cierra el reto
  const avanzar = useCallback(
    () =>
      setEstado((s) =>
        s.escenarioActual + 1 < ESCENARIOS.length
          ? { ...s, escenarioActual: s.escenarioActual + 1 }
          : { ...s, terminado: true },
      ),
    [],
  )

  const reiniciar = () => {
    borrarProgreso()
    setEstado(INICIAL)
  }

  if (!candidato) return <Welcome onStart={iniciar} />
  if (terminado) return <Results candidato={candidato} respuestas={respuestas} onRestart={reiniciar} />
  return (
    <Simulator
      key={escenarioActual}
      indice={escenarioActual}
      respuestas={respuestas}
      onAnswer={responder}
      onFinish={avanzar}
    />
  )
}
