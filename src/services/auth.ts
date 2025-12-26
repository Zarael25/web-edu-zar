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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ carnet, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error en inicio de sesión')
  }

  return response.json()
}

// ===============================
// PERFIL /v1/auth/me
// ===============================
export async function getMe(token: string) {
  const response = await fetch(ENDPOINTS.AUTH.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'No se pudo obtener el perfil')
  }

  return response.json()
}
