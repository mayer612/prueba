import { useMemo } from 'react'
import { CATEGORIAS } from '../../data/scenarios'
import { generarReporte } from '../../utils/scoring'
import Button from '../ui/Button'
import ScoreBar from './ScoreBar'

// Descarga el reporte como archivo JSON
function descargarJSON(reporte) {
  const blob = new Blob([JSON.stringify(reporte, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `questhire-${reporte.candidato.nombre.replace(/\s+/g, '_')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// Resultados: agradecimiento al candidato + reporte para el reclutador.
//  props: candidato {nombre, puesto}, respuestas, onRestart()
export default function Results({ candidato, respuestas, onRestart }) {
  const reporte = useMemo(() => generarReporte(candidato, respuestas), [candidato, respuestas])

  return (
    <main className="min-h-screen">
      <header className="bg-brand-black text-white px-6 py-4 no-print">
        <span className="font-bold">
          Quest<span className="text-brand-orange">Hire</span>
        </span>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-brand-orange text-white rounded-2xl p-6">
          <h1 className="text-2xl font-extrabold">¡Gracias, {candidato.nombre}!</h1>
          <p className="mt-2">
            Completaste los 3 escenarios. Agradecemos tu tiempo y tu participación en el
            proceso para el puesto de {candidato.puesto}. Nos pondremos en contacto contigo pronto.
          </p>
        </section>

        <div className="no-print rounded-lg border border-brand-gray-border bg-white px-4 py-2 text-xs text-brand-gray">
          Sección solo para el reclutador: no muestres esta pantalla al candidato.
        </div>

        <section className="bg-white rounded-2xl border border-brand-gray-border p-6">
          <p className="text-xs uppercase tracking-wide text-brand-gray">Reporte de reclutador</p>
          <h2 className="text-xl font-bold mt-1">
            {candidato.nombre} · {candidato.puesto}
          </h2>
          <p className="text-xs text-brand-gray">{new Date(reporte.fecha).toLocaleString('es')}</p>

          <div className="mt-5 rounded-xl bg-brand-gray-light p-4">
            <p className="text-sm text-brand-gray">Perfil dominante de toma de decisiones</p>
            <p className="text-2xl font-extrabold text-brand-orange-dark">{reporte.perfil.titulo}</p>
            <p className="text-sm mt-1">{reporte.perfil.descripcion}</p>
          </div>

          <h3 className="mt-6 font-bold">Puntuación estimada por categoría</h3>
          <div className="mt-3 space-y-3">
            {Object.values(CATEGORIAS).map((c) => (
              <ScoreBar key={c.id} etiqueta={c.etiqueta} porcentaje={reporte.porcentajes[c.id]} />
            ))}
          </div>

          <h3 className="mt-6 font-bold">Detalle de elecciones</h3>
          <ol className="mt-3 space-y-3">
            {reporte.detalle.map((d) => (
              <li key={d.escenarioId} className="rounded-xl border border-brand-gray-border p-4">
                <p className="font-semibold">
                  Escenario {d.escenarioId}: {d.escenario}
                </p>
                <span className="inline-block mt-1 rounded-full bg-brand-orange-light text-brand-orange-dark text-xs font-semibold px-3 py-1">
                  {d.categoria}
                </span>
                <p className="mt-2 text-sm text-brand-gray">{d.respuesta}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="no-print flex flex-wrap gap-3">
          <Button onClick={() => window.print()}>Imprimir / Guardar PDF</Button>
          <Button variant="dark" onClick={() => descargarJSON(reporte)}>
            Descargar JSON
          </Button>
          <Button variant="outline" onClick={onRestart}>
            Nuevo candidato
          </Button>
        </div>
      </div>
    </main>
  )
}
