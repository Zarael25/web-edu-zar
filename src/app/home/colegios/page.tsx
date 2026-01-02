'use client'

import { useEffect, useState } from 'react'
import { getMisColegios } from '@/services/colegios'
import { Colegio } from '@/types/colegios'
import CrearColegioModal from '../../components/colegios/CrearColegioModal'

export default function ColegiosPage() {
  const [colegios, setColegios] = useState<Colegio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const fetchColegios = async () => {
    try {
      const res = await getMisColegios()
      setColegios(res.data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar colegios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchColegios()
  }, [])

  // ------------------
  // ESTADOS
  // ------------------
  if (loading) {
    return <p className="text-lightblue">Cargando colegios...</p>
  }

  if (error) {
    return <p className="text-secondary">{error}</p>
  }

  return (
    <div className="container">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h2>Colegios</h2>

        {/* BOTÓN AÑADIR */}
        <button
          onClick={() => setOpenModal(true)}
          className="
            flex items-center gap-2
            rounded-lg
            bg-primary
            px-5 py-2.5
            text-sm font-semibold
            text-lightsky
            transition
            hover:bg-secondary
          "
        >
          <span className="text-lg">＋</span>
          Añadir colegio
        </button>
      </div>

      {/* LISTA */}
      {colegios.length === 0 ? (
        <p className="text-lightblue">
          No tienes colegios registrados.
        </p>
      ) : (
        <div className="grid gap-6">
          {colegios.map((colegio) => (
            <div
              key={colegio._id}
              className="
                rounded-xl
                border
                border-border
                bg-tablebg
                p-6
                shadow-mentor-shadow
                transition
                hover:border-primary
              "
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lightsky text-lg font-semibold">
                    {colegio.nombre_colegio}
                  </h3>

                  <p className="mt-1 text-sm text-lightblue">
                    Niveles: {colegio.niveles.join(', ')}
                  </p>
                </div>

                <span
                  className={`
                    text-xs font-semibold px-3 py-1 rounded-full
                    ${
                      colegio.estado === 'ACTIVO'
                        ? 'bg-primary text-lightsky'
                        : 'bg-secondary text-lightsky opacity-70'
                    }
                  `}
                >
                  {colegio.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL CREAR COLEGIO */}
      <CrearColegioModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={fetchColegios}
      />
    </div>
  )
}
