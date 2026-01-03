'use client'

import { useState } from 'react'
import { crearColegio } from '@/services/colegios'
import { CrearColegioPayload } from '@/types/colegios'
import toast from 'react-hot-toast'

interface Props {
  open: boolean
  onClose: () => void
  onCreated?: () => void
}

export default function CrearColegioModal({
  open,
  onClose,
  onCreated,
}: Props) {
  // ===============================
  // STATES
  // ===============================
  const [nombre, setNombre] = useState('')
  const [sigla, setSigla] = useState('')
  const [niveles, setNiveles] = useState<string[]>([])

  const [departamento, setDepartamento] = useState('')
  const [provincia, setProvincia] = useState('')
  const [ciudad, setCiudad] = useState('')

  const [loading, setLoading] = useState(false)

  if (!open) return null

  // ===============================
  // HANDLERS
  // ===============================
  const toggleNivel = (nivel: string) => {
    setNiveles((prev) =>
      prev.includes(nivel)
        ? prev.filter((n) => n !== nivel)
        : [...prev, nivel]
    )
  }

  const resetForm = () => {
    setNombre('')
    setSigla('')
    setNiveles([])
    setDepartamento('')
    setProvincia('')
    setCiudad('')
  }

  const handleSubmit = async () => {
    // ===============================
    // VALIDACIÓN BÁSICA
    // ===============================
    if (!nombre || niveles.length === 0) {
      toast.error('Completa los campos obligatorios')
      return
    }

    // ===============================
    // CONSTRUIR PAYLOAD
    // ===============================
    const payload: CrearColegioPayload = {
      nombre_colegio: nombre,
      niveles,
      ...(sigla && { sigla }),
      ...(departamento || provincia || ciudad
        ? {
            ubicacion: {
              ...(departamento && { departamento }),
              ...(provincia && { provincia }),
              ...(ciudad && { ciudad }),
            },
          }
        : {}),
    }

    try {
      setLoading(true)

      await crearColegio(payload)

      toast.success('Colegio creado correctamente')
      onClose()
      onCreated?.()
      resetForm()
    } catch (err: any) {
      toast.error(err.message || 'Error al crear colegio')
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-tablebg border border-border p-6 shadow-mentor-shadow">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lightsky text-xl font-semibold">
            Añadir colegio
          </h3>

          <button
            onClick={onClose}
            className="text-lightblue hover:text-primary text-xl"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* NOMBRE */}
          <div>
            <label className="block mb-1 text-sm text-lightblue">
              Nombre del colegio *
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="
                w-full rounded-md
                bg-darkmode
                border border-border
                px-3 py-2
                text-lightsky
                focus:outline-none
                focus:border-primary
              "
              placeholder="Ej. Unidad Educativa Don Bosco"
            />
          </div>

          {/* SIGLA */}
          <div>
            <label className="block mb-1 text-sm text-lightblue">
              Sigla
            </label>
            <input
              value={sigla}
              onChange={(e) => setSigla(e.target.value.toUpperCase())}
              className="
                w-full rounded-md
                bg-darkmode
                border border-border
                px-3 py-2
                text-lightsky
                focus:outline-none
                focus:border-primary
              "
              placeholder="Ej. UEDB"
              maxLength={10}
            />
          </div>

          {/* NIVELES */}
          <div>
            <label className="block mb-2 text-sm text-lightblue">
              Niveles *
            </label>

            <div className="grid grid-cols-2 gap-3">
              {['PM', 'PT', 'SM', 'ST'].map((nivel) => (
                <button
                  key={nivel}
                  type="button"
                  onClick={() => toggleNivel(nivel)}
                  className={`
                    rounded-md border px-3 py-2 text-sm transition
                    ${
                      niveles.includes(nivel)
                        ? 'bg-primary text-lightsky border-primary'
                        : 'bg-darkmode text-lightblue border-border hover:border-primary'
                    }
                  `}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          {/* UBICACIÓN */}
          <div className="space-y-3">
            <label className="block text-sm text-lightblue">
              Ubicación
            </label>

            <input
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="w-full rounded-md bg-darkmode border border-border px-3 py-2 text-lightsky"
              placeholder="Departamento"
            />

            <input
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              className="w-full rounded-md bg-darkmode border border-border px-3 py-2 text-lightsky"
              placeholder="Provincia"
            />

            <input
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className="w-full rounded-md bg-darkmode border border-border px-3 py-2 text-lightsky"
              placeholder="Ciudad"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-lightblue hover:text-primary"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-5 py-2 rounded-md
              bg-primary text-lightsky
              hover:bg-secondary
              transition
              disabled:opacity-50
            "
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
