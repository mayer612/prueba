import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
// La ruta "base" es configurable para GitHub Pages:
//  - Variable de entorno VITE_BASE (ej. VITE_BASE=/mi-repo/ npm run build)
//  - Por defecto "/prueba/" (nombre del repositorio).
//  - Usa VITE_BASE=/ para dominio propio o para correr en raíz.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // En Vercel (variable VERCEL=1) el sitio se sirve desde la raíz => base "/"
  const base = env.VITE_BASE || (mode === 'production' && !env.VERCEL ? '/prueba/' : '/')
  return { base, plugins: [react()] }
})
