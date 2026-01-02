'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HeaderAdmin from '../components/HeaderAdmin'
import Sidebar from '../components/Sidebar'
import { logoutUsuario } from '@/services/auth'

interface Usuario {
  nombre: string
  appaterno: string
  apmaterno: string
  roles: string[]
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')

    if (!storedUser) {
      router.push('/auth/login')
      return
    }

    setUsuario(JSON.parse(storedUser))
  }, [router])

  const handleLogout = async () => {
    try {
      await logoutUsuario()
    } finally {
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
      <main className="flex flex-1 bg-gray-50">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENIDO DINÁMICO */}
        <section className="flex-1 p-6">
          {children}
        </section>
      </main>
    </div>
  )
}
