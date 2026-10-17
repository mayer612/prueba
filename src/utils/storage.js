// Persistencia mínima en localStorage para no perder el progreso al recargar.
const CLAVE = 'questhire:progreso:v1'

export function cargarProgreso() {
  try {
    const raw = localStorage.getItem(CLAVE)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null // localStorage bloqueado o JSON corrupto
  }
}

export function guardarProgreso(estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado))
  } catch {
    /* sin persistencia: la app sigue funcionando */
  }
}

export function borrarProgreso() {
  try {
    localStorage.removeItem(CLAVE)
  } catch {
    /* nada que hacer */
  }
}
