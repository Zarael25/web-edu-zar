'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HeaderAdmin from '../components/HeaderAdmin'
import { logoutUsuario } from '@/services/auth'

interface Usuario {
  nombre: string
  appaterno: string
  apmaterno: string
  roles: string[]
}

export default function HomePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')

    if (!storedUser) {
      // 🔐 Si no hay usuario, volver al login
      router.push('/auth/login')
      return
    }

    setUsuario(JSON.parse(storedUser))
  }, [router])

  const handleLogout = async () => {
    try {
      // 🔐 Llama al backend para borrar la cookie HttpOnly
      await logoutUsuario()
    } catch (error) {
      // opcional: console.error(error)
    } finally {
      // 🧹 Limpia el frontend sí o sí
      localStorage.removeItem('usuario')
      router.push('/auth/login')
    }
  }


  const handlePerfil = () => {
    router.push('/perfil')
  }

  if (!usuario) return null // evita parpadeo

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <HeaderAdmin
        usuario={{
          nombre: usuario.nombre,
          appaterno: usuario.appaterno,
          apmaterno: usuario.apmaterno,
        }}
        onLogout={handleLogout}
        onPerfil={handlePerfil}
      />

      {/* CONTENIDO */}
      <main className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">
          Bienvenido, {usuario.nombre}
        </h2>

        <p className="text-gray-700">
          Este es el inicio del sistema <strong>Edu.Zar</strong>.
        </p>

        {/* Aquí luego van cards, accesos, estadísticas, etc. */}
      </main>
    </div>
  )
}
