export default function ColegiosPage() {
  // 🔹 Datos de ejemplo
  const colegios = [
    {
      id: 1,
      nombre: 'Colegio Don Bosco Sucre',
      niveles: ['PM', 'PT', 'SM', 'ST'],
      estado: 'ACTIVO',
    },
    {
      id: 2,
      nombre: 'Unidad Educativa San Juan',
      niveles: ['PT', 'SM'],
      estado: 'ACTIVO',
    },
    {
      id: 3,
      nombre: 'Colegio Santa Ana',
      niveles: ['PM', 'PT'],
      estado: 'INACTIVO',
    },
  ]

  return (
    <div>
      {/* TÍTULO */}
      <h2 className="text-2xl font-bold mb-6">
        Colegios
      </h2>

      {/* LISTA */}
      <div className="grid gap-4">
        {colegios.map((colegio) => (
          <div
            key={colegio.id}
            className="
              rounded-lg
              border
              border-border
              bg-white
              p-4
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {colegio.nombre}
                </h3>

                <p className="text-sm text-gray-600">
                  Niveles: {colegio.niveles.join(', ')}
                </p>
              </div>

              <span
                className={`
                  text-xs font-semibold px-3 py-1 rounded-full
                  ${
                    colegio.estado === 'ACTIVO'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }
                `}
              >
                {colegio.estado}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
