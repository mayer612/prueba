// Barra de porcentaje: naranja sobre fondo gris claro.
export default function ScoreBar({ etiqueta, porcentaje }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold">
        <span>{etiqueta}</span>
        <span>{porcentaje}%</span>
      </div>
      <div className="mt-1 h-3 rounded-full bg-brand-gray-border overflow-hidden">
        <div className="h-full rounded-full bg-brand-orange" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  )
}
