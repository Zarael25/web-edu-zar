'use client'

import { useEffect, useRef, useState } from 'react'
import { getMisColegios } from '@/services/colegios'
import { importarEstudiantes } from '@/services/estudiantes'
import { Colegio } from '@/types/colegios'
import toast from 'react-hot-toast'

export default function GestionarEstudiantesPage() {
  const [colegios, setColegios] = useState<Colegio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // SELECT
  const [open, setOpen] = useState(false)
  const [colegioSeleccionado, setColegioSeleccionado] =
    useState<Colegio | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // FILES
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // SUBMIT
  const [submitting, setSubmitting] = useState(false)

  // ------------------
  // FETCH COLEGIOS
  // ------------------
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

  // cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ------------------
  // FILE HANDLERS
  // ------------------
  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    setFiles([newFiles[0]]) // solo 1 archivo
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!colegioSeleccionado) return
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!colegioSeleccionado) return
    e.preventDefault()
    e.stopPropagation()
  }

  // ------------------
  // SUBMIT
  // ------------------
  const handleImportar = async () => {
    if (!colegioSeleccionado || files.length === 0) {
      toast('Debe seleccionar un colegio y un archivo', {
        icon: '⚠️',
      })
      return
    }

    setSubmitting(true)
    const toastId = toast.loading('Importando estudiantes...')

    try {
      const res = await importarEstudiantes(
        colegioSeleccionado._id,
        files
      )

      toast.dismiss(toastId)
      toast.success(
        `Importación completada ✔️
Creados: ${res.creados}
Duplicados: ${res.duplicados}
Omitidos: ${res.omitidos}`
      )

      setFiles([]) // limpiar archivos
    } catch (err: any) {
      toast.dismiss(toastId)
      toast.error(
        err.message || 'Error al importar estudiantes'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ------------------
  // ESTADOS
  // ------------------
  if (loading) {
    return (
      <div className="container">
        <p className="text-lightblue">Cargando colegios...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <p className="text-secondary">{error}</p>
      </div>
    )
  }

  return (
    <section>
      <div className="container max-w-3xl">
        {/* HEADER */}
        <div className="mb-10">
          <h2>Gestionar Estudiantes</h2>
          <p className="mt-2 text-sm text-lightblue">
            Selecciona un colegio y carga estudiantes mediante archivos
          </p>
        </div>

        {/* CARD SELECT */}
        <div className="rounded-2xl border border-border bg-tablebg p-8 shadow-mentor-shadow">
          <label className="block mb-3 text-sm font-semibold text-lightsky">
            Colegio
          </label>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full rounded-lg border border-border bg-darkmode px-4 py-3 text-sm text-lightsky hover:border-primary focus:ring-2 focus:ring-primary"
            >
              <span>
                {colegioSeleccionado
                  ? colegioSeleccionado.nombre_colegio
                  : '— Selecciona un colegio —'}
              </span>
              <span
                className={`text-lightblue ${
                  open ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {open && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-tablebg shadow-mentor-shadow">
                {colegios.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => {
                      setColegioSeleccionado(c)
                      setOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-lightsky hover:bg-primary hover:text-white"
                  >
                    {c.nombre_colegio}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CARD UPLOAD */}
        <div className="mt-10 rounded-2xl border border-border bg-tablebg p-8 shadow-mentor-shadow">
          <h3 className="mb-4 text-lg font-semibold text-lightsky">
            Cargar estudiantes
          </h3>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() =>
              colegioSeleccionado && fileInputRef.current?.click()
            }
            className={`rounded-xl border-2 border-dashed border-border bg-darkmode px-6 py-10 text-center ${
              colegioSeleccionado
                ? 'cursor-pointer hover:border-primary'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            <p className="text-lightblue text-sm">
              Arrastra archivos aquí o haz click para seleccionar
            </p>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".csv,.xlsx"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {/* ARCHIVO CARGADO */}
          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between rounded-lg border border-border bg-darkmode px-4 py-2 text-sm text-lightsky">
                <div className="flex flex-col">
                  <span className="font-medium truncate">
                    {files[0].name}
                  </span>
                  <span className="text-xs text-lightblue">
                    {(files[0].size / 1024).toFixed(1)} KB
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="text-xs text-secondary hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          )}

          {/* BOTÓN */}
          <div className="mt-8 flex justify-end">
            <button
              disabled={
                submitting ||
                !colegioSeleccionado ||
                files.length === 0
              }
              onClick={handleImportar}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold ${
                submitting
                  ? 'bg-border text-lightblue'
                  : 'bg-primary text-lightsky hover:bg-secondary'
              }`}
            >
              {submitting
                ? 'Registrando...'
                : 'Registrar estudiantes'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
