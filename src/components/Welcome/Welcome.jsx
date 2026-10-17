import { useState } from 'react'
import Button from '../ui/Button'

// Pantalla de bienvenida: captura nombre y puesto. El botón se habilita al llenar ambos.
export default function Welcome({ onStart }) {
  const [nombre, setNombre] = useState('')
  const [puesto, setPuesto] = useState('')
  const listo = nombre.trim() !== '' && puesto.trim() !== ''

  const enviar = (e) => {
    e.preventDefault()
    if (listo) onStart({ nombre: nombre.trim(), puesto: puesto.trim() })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-brand-black text-white px-6 py-4">
        <span className="text-xl font-bold">
          Quest<span className="text-brand-orange">Hire</span>
        </span>
      </header>
      <section className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-brand-gray-border p-8">
          <h1 className="text-3xl font-extrabold text-brand-black">
            Bienvenido/a a <span className="text-brand-orange">QuestHire</span>
          </h1>
          <p className="mt-3 text-brand-gray">
            Vivirás 3 mini-aventuras basadas en situaciones reales de trabajo. No hay
            tiempo límite: elige la respuesta que más se parezca a lo que harías tú.
          </p>
          <form onSubmit={enviar} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold">Nombre del candidato</span>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-gray-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                placeholder="Ej. Ana Pérez"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Puesto al que aplica</span>
              <input
                value={puesto}
                onChange={(e) => setPuesto(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-gray-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                placeholder="Ej. Analista de servicio al cliente"
              />
            </label>
            <Button type="submit" disabled={!listo} className="w-full">
              Comenzar Reto
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
