'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

interface UsuarioHeader {
  nombre: string
  appaterno: string
  apmaterno: string
}

interface HeaderAdminProps {
  usuario: UsuarioHeader
  onLogout?: () => void
  onPerfil?: () => void
}

export default function HeaderAdmin({
  usuario,
  onLogout,
  onPerfil,
}: HeaderAdminProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const nombreCompleto = `${usuario.nombre} ${usuario.appaterno} ${usuario.apmaterno}`

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full border-b border-border bg-darkmode px-6 py-4 flex items-center justify-between">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-primary font-brand">Edu.Zar</h1>
        <span className="text-base text-white">
          Panel del Administrador
        </span>
      </div>

      {/* DERECHA */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 border border-white/20 px-3 py-1.5 rounded-md hover:bg-tablebg transition"
        >
          <span className="text-xl text-white">
            {nombreCompleto}
          </span>
          <Icon
            icon="tabler:user-hexagon"
            className="text-[30px] text-primary"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 border border-white/20 bg-tablebg shadow-mentor-shadow rounded-md z-50">
            <button
              onClick={onPerfil}
              className="w-full text-left px-4 py-2 text-sm text-lightsky hover:bg-darkmode transition"
            >
              Perfil
            </button>

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-darkmode transition flex items-center gap-2"
            >
              <Icon icon="tabler:logout" className="text-[18px]" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
