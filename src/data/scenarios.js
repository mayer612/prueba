// Definición de los 3 escenarios del simulador.
//
// Estructura de un escenario:
//  - id, titulo, contexto: texto introductorio mostrado como "narrador"
//  - mensajes: conversación previa (tipo chat) { autor, rol, texto }
//  - opciones: 3 respuestas posibles, una por categoría de decisión
//
// Cada opción tiene:
//  - categoria: 'empatia' | 'resultados' | 'pasividad' (SOLO visible para el reclutador)
//  - puntos: aporte a cada dimensión del perfil. La categoría principal suma 3 y
//    la secundaria 1 (matiz), de modo que ninguna elección es "pura".

export const CATEGORIAS = {
  empatia: {
    id: 'empatia',
    etiqueta: 'Empatía / Proactividad',
    perfil: 'Enfoque en empatía',
    descripcion:
      'Prioriza entender a las personas, anticiparse y cuidar la relación antes de resolver.',
  },
  resultados: {
    id: 'resultados',
    etiqueta: 'Resultados / Resolución',
    perfil: 'Orientado a resultados rápidos',
    descripcion:
      'Va directo a la solución, toma decisiones con rapidez y se enfoca en cumplir el objetivo.',
  },
  pasividad: {
    id: 'pasividad',
    etiqueta: 'Pasividad / Evasión',
    perfil: 'Tendencia pasiva/evasiva',
    descripcion:
      'Tiende a postergar, delegar hacia arriba o evitar el conflicto en lugar de asumirlo.',
  },
}

export const ESCENARIOS = [
  {
    id: 1,
    titulo: 'Cliente importante molesto',
    contexto:
      'Es lunes por la mañana. Un cliente clave, que representa el 20 % de las ventas del área, recibió su pedido con 5 días de retraso.',
    mensajes: [
      {
        autor: 'Carlos Medina',
        rol: 'Cliente · Director de compras',
        texto:
          'Esto es inaceptable. Mi pedido llegó cinco días tarde y tuve que detener una línea de producción. Quiero una explicación ahora mismo.',
      },
      {
        autor: 'Sistema',
        rol: 'Narrador',
        texto:
          'El retraso se originó en logística, pero tú eres el punto de contacto de la cuenta. Carlos está esperando tu respuesta.',
      },
    ],
    opciones: [
      {
        id: '1a',
        categoria: 'empatia',
        texto:
          'Le agradezco que me lo diga y entiendo el impacto que tuvo en su producción. Lo llamo hoy mismo, escucho qué le afectó exactamente y le propongo un plan de compensación y seguimiento diario.',
        puntos: { empatia: 3, resultados: 1, pasividad: 0 },
      },
      {
        id: '1b',
        categoria: 'resultados',
        texto:
          'Me comunico con logística, identifico la causa y le confirmo en una hora la nueva fecha garantizada y un descuento en el siguiente pedido para compensar.',
        puntos: { empatia: 1, resultados: 3, pasividad: 0 },
      },
      {
        id: '1c',
        categoria: 'pasividad',
        texto:
          'Le respondo que el retraso fue responsabilidad de logística y le paso el contacto de ese equipo para que lo resuelvan directamente con ellos.',
        puntos: { empatia: 0, resultados: 1, pasividad: 3 },
      },
    ],
  },
  {
    id: 2,
    titulo: 'Conflicto entre compañeros',
    contexto:
      'Dos integrantes de tu equipo, Laura y Andrés, llevan una semana sin hablarse tras discutir por el reparto de tareas. La entrega conjunta es en 3 días.',
    mensajes: [
      {
        autor: 'Laura Ríos',
        rol: 'Compañera de equipo',
        texto:
          'Andrés no entrega su parte y no pienso seguir cubriéndolo. Si no cambia, yo no avanzo con mi sección.',
      },
      {
        autor: 'Andrés Soto',
        rol: 'Compañero de equipo',
        texto:
          'Laura cambió los requisitos sin avisarme. Así es imposible trabajar, yo ya no sé qué esperan de mí.',
      },
      {
        autor: 'Sistema',
        rol: 'Narrador',
        texto:
          'Ambos acuden a ti de manera informal. El conflicto ya está frenando el avance del proyecto.',
      },
    ],
    opciones: [
      {
        id: '2a',
        categoria: 'empatia',
        texto:
          'Hablo primero con cada uno por separado para entender su perspectiva y luego los reúno en una conversación mediada, enfocada en acordar cómo trabajar juntos.',
        puntos: { empatia: 3, resultados: 1, pasividad: 0 },
      },
      {
        id: '2b',
        categoria: 'resultados',
        texto:
          'Los reúno hoy, dejo claro el objetivo de la entrega, redefino responsabilidades y fechas por escrito y exijo que se cumplan sin más discusión.',
        puntos: { empatia: 0, resultados: 3, pasividad: 1 },
      },
      {
        id: '2c',
        categoria: 'pasividad',
        texto:
          'Prefiero no tomar partido. Les sugiero que lo resuelvan entre ellos y, si la situación empeora, aviso a la jefatura para que decida.',
        puntos: { empatia: 1, resultados: 0, pasividad: 3 },
      },
    ],
  },
  {
    id: 3,
    titulo: 'Entrega bajo presión',
    contexto:
      'Faltan 4 horas para entregar un informe crítico a la gerencia. Dos personas del equipo se enfermaron y el presupuesto no permite apoyo externo.',
    mensajes: [
      {
        autor: 'Marta Vélez',
        rol: 'Gerente',
        texto:
          'Necesito el informe completo a las 5 p. m., sin falta. Es lo que presentaré al comité mañana a primera hora.',
      },
      {
        autor: 'Sistema',
        rol: 'Narrador',
        texto:
          'Solo quedan tú y dos compañeros. Falta aproximadamente el 40 % del contenido y los recursos son limitados.',
      },
    ],
    opciones: [
      {
        id: '3a',
        categoria: 'empatia',
        texto:
          'Reúno al equipo, reconozco la presión, repartimos el trabajo según las fortalezas de cada uno, aviso a Marta del riesgo y acordamos qué puede ir completo y qué como borrador.',
        puntos: { empatia: 3, resultados: 1, pasividad: 0 },
      },
      {
        id: '3b',
        categoria: 'resultados',
        texto:
          'Priorizo lo esencial para el comité, descarto lo accesorio, asigno tareas con tiempos exactos y reviso avances cada hora para llegar a las 5 p. m.',
        puntos: { empatia: 0, resultados: 3, pasividad: 1 },
      },
      {
        id: '3c',
        categoria: 'pasividad',
        texto:
          'Trabajo en lo que pueda y espero que alcance. Si no llegamos, le explico a Marta que con dos personas enfermas era imposible cumplir.',
        puntos: { empatia: 0, resultados: 1, pasividad: 3 },
      },
    ],
  },
]
