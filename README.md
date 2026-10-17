# QuestHire

Aplicación web de mini-aventuras y simuladores de casos de la vida real para procesos de selección de talento. Corre 100 % en el cliente (React + Vite + Tailwind), sin backend; el progreso se guarda en `localStorage` solo para sobrevivir a una recarga.

**Flujo:** Bienvenida → 3 escenarios encadenados (chat) → Resultados para el reclutador (perfil, barras por categoría, detalle, exportar PDF/JSON).

## Estructura

```
src/
  components/
    Welcome/      pantalla de bienvenida
    Simulator/    escenarios tipo chat
    Results/      resultados y reporte
    ui/           componentes reutilizables (Button)
  data/scenarios.js   los 3 escenarios, opciones y puntos
  utils/scoring.js    lógica de puntuación y perfil dominante
  utils/storage.js    persistencia en localStorage
  App.jsx / main.jsx
```

Los colores de marca son tokens en `tailwind.config.js` (`brand-orange`, `brand-black`, `brand-gray`).

## Puntuación

Cada opción es de una categoría (empática, resultados, pasiva) y suma 3 puntos a esa dimensión y 1 a una secundaria. Los puntos se convierten en porcentajes que suman 100 %; el perfil dominante es la dimensión mayor (empate → perfil mixto). Edita `src/data/scenarios.js` para cambiar casos o pesos.

## 1. Instalar y correr localmente

```bash
npm install
npm run dev
```

## 2. Build

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
```

## 3. Publicar en GitHub Pages

La ruta `base` se controla con `VITE_BASE`; por defecto en producción es `/prueba/`. Si tu repo se llama distinto, cámbiala en `vite.config.js` o define `VITE_BASE=/nombre-repo/`.

### Opción A: GitHub Actions (recomendada)

1. Sube el código a GitHub (rama `main`).
2. En el repo: **Settings → Pages → Source: GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que hace build y publica.
4. La URL será `https://<usuario>.github.io/<repo>/`.

### Opción B: gh-pages (manual)

1. `npm install`
2. `npm run deploy` (hace build y publica `dist/` en la rama `gh-pages`).
3. En **Settings → Pages**, elige *Deploy from a branch* → `gh-pages` / `/ (root)`.

Para dominio propio o raíz: `VITE_BASE=/ npm run build`.

## 4. Publicar en Vercel

1. En [vercel.com](https://vercel.com) → **Add New → Project** e importa este repositorio.
2. Vercel detecta Vite (`vercel.json` ya define build `npm run build` y salida `dist`). No necesitas configurar `VITE_BASE`: en Vercel la ruta base es `/` automáticamente.
3. Pulsa **Deploy**. Cada push a la rama de producción redespliega.
