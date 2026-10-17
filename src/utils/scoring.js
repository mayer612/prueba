// Lógica de puntuación y perfil de decisión de QuestHire.
//
// FLUJO:
//  1. Cada vez que el candidato elige una opción, se guarda en `respuestas`
//     { escenarioId, opcionId }.
//  2. `calcularPuntajes` suma los `puntos` de cada opción elegida en las tres
//     dimensiones (empatía, resultados, pasividad).
//  3. Los puntos se convierten a porcentaje sobre el total acumulado, de modo
//     que las tres barras siempre sumen 100 %.
//  4. El perfil dominante es la dimensión con mayor porcentaje. Si hay empate
//     en el primer lugar se devuelve un perfil "mixto".

import { CATEGORIAS, ESCENARIOS } from '../data/scenarios'

const DIMENSIONES = ['empatia', 'resultados', 'pasividad']

/** Suma los puntos de las opciones elegidas. Devuelve { empatia, resultados, pasividad }. */
export function calcularPuntajes(respuestas) {
  const totales = { empatia: 0, resultados: 0, pasividad: 0 }
  for (const r of respuestas) {
    const opcion = buscarOpcion(r.escenarioId, r.opcionId)
    if (!opcion) continue
    for (const dim of DIMENSIONES) totales[dim] += opcion.puntos[dim] || 0
  }
  return totales
}

/** Convierte los puntos en porcentajes enteros que suman 100 (método del mayor resto). */
export function calcularPorcentajes(puntajes) {
  const total = DIMENSIONES.reduce((acc, d) => acc + puntajes[d], 0)
  if (total === 0) return { empatia: 0, resultados: 0, pasividad: 0 }

  const crudos = DIMENSIONES.map((d) => ({ d, valor: (puntajes[d] / total) * 100 }))
  const resultado = {}
  let asignado = 0
  for (const { d, valor } of crudos) {
    resultado[d] = Math.floor(valor)
    asignado += resultado[d]
  }
  // Reparte los puntos porcentuales restantes a quienes tienen mayor parte decimal
  const porResto = [...crudos].sort((a, b) => (b.valor % 1) - (a.valor % 1))
  for (let i = 0; i < 100 - asignado; i++) resultado[porResto[i].d] += 1
  return resultado
}

/** Determina el perfil dominante. Empates en el primer lugar => perfil mixto. */
export function obtenerPerfilDominante(puntajes) {
  const max = Math.max(...DIMENSIONES.map((d) => puntajes[d]))
  const lideres = DIMENSIONES.filter((d) => puntajes[d] === max)

  if (lideres.length > 1) {
    return {
      id: 'mixto',
      titulo: 'Perfil mixto / equilibrado',
      descripcion: `Combina ${lideres
        .map((d) => CATEGORIAS[d].etiqueta.toLowerCase())
        .join(' y ')} sin una tendencia claramente dominante.`,
    }
  }
  const cat = CATEGORIAS[lideres[0]]
  return { id: cat.id, titulo: cat.perfil, descripcion: cat.descripcion }
}

/** Detalle escenario por escenario de lo que eligió el candidato. */
export function obtenerDetalle(respuestas) {
  return respuestas.map((r) => {
    const escenario = ESCENARIOS.find((e) => e.id === r.escenarioId)
    const opcion = buscarOpcion(r.escenarioId, r.opcionId)
    return {
      escenarioId: r.escenarioId,
      escenario: escenario?.titulo ?? '',
      categoria: opcion ? CATEGORIAS[opcion.categoria].etiqueta : '',
      categoriaId: opcion?.categoria,
      respuesta: opcion?.texto ?? '',
    }
  })
}

/** Genera el reporte completo (se usa en pantalla y en la exportación JSON). */
export function generarReporte(candidato, respuestas) {
  const puntajes = calcularPuntajes(respuestas)
  return {
    candidato,
    fecha: new Date().toISOString(),
    perfil: obtenerPerfilDominante(puntajes),
    puntajes,
    porcentajes: calcularPorcentajes(puntajes),
    detalle: obtenerDetalle(respuestas),
  }
}

function buscarOpcion(escenarioId, opcionId) {
  const escenario = ESCENARIOS.find((e) => e.id === escenarioId)
  return escenario?.opciones.find((o) => o.id === opcionId)
}
