'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SidebarItem {
  label: string
  icon: string
  path: string
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const items: SidebarItem[] = [
    { label: 'Colegios', icon: '🏫', path: '/colegios' },
    { label: 'Añadir Notas', icon: '📝', path: '/notas/nueva' },
    { label: 'Estudiantes', icon: '👨‍🎓', path: '/estudiantes' },
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
          className="
            text-white
            hover:text-primary
            transition
          "
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1 p-2">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className="
              flex items-center gap-3
              rounded-md px-3 py-2
              text-sm
              text-white
              hover:bg-primary
              hover:text-white
              transition
            "
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}
