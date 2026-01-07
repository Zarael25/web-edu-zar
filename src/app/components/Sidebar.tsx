'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface SidebarItem {
  label: string
  icon: string
  path: string
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const items: SidebarItem[] = [
    { label: 'Colegios', icon: '🏫', path: '/home/colegios' },
    { label: 'Añadir Notas', icon: '📝', path: '/home/notas/nueva' },
    { label: 'Gestionar Estudiantes', icon: '🎓', path: '/home/gestionar-estudiantes' },
    { label: 'Estudiantes', icon: '👨‍🎓', path: '/home/estudiantes' },
    
  ]

  return (
    <aside
      className={`
        h-screen
        transition-all duration-300
        border-r border-border
        bg-tablebg
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        {!collapsed && (
          <span className="text-lightsky font-bold tracking-wide">
            Edu.Zar
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-primary transition"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1 p-2">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.path)

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                flex items-center gap-3
                rounded-md px-3 py-2
                text-sm transition
                ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-white hover:bg-primary hover:text-white'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
