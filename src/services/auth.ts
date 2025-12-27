import { ENDPOINTS } from '@/config/api'
import { LoginResponse } from '@/types/auth'

// ===============================
// LOGIN /v1/auth/signin
// ===============================
export async function loginUsuario(
  carnet: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(ENDPOINTS.AUTH.SIGNIN, {
    method: 'POST',
    credentials: 'include', // 🔑 OBLIGATORIO PARA COOKIES
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ carnet, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error en inicio de sesión')
  }

  // Devuelve { message, usuario }
  return response.json()
}

// ===============================
// PERFIL /v1/auth/me
// ===============================
export async function getMe() {
  const response = await fetch(ENDPOINTS.AUTH.ME, {
    method: 'GET',
    credentials: 'include', // 🔑 CLAVE
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'No autenticado')
  }

  return response.json() // { usuario }
}


// ===============================
// LOGOUT /v1/auth/logout
// ===============================
export async function logoutUsuario() {
  const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
    method: 'POST',
    credentials: 'include', // 🔑 para borrar cookie
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al cerrar sesión')
  }

  return response.json()
}