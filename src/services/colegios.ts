import { ENDPOINTS } from '@/config/api'
import {
  Colegio,
  GetColegiosResponse,
  CrearColegioPayload,
  CrearColegioResponse,
  EditarColegioPayload,
  EditarColegioResponse,
  GetColegioByIdResponse,
} from '@/types/colegios'

// ===============================
// LISTAR MIS COLEGIOS
// GET /v1/colegios
// ===============================
export async function getMisColegios(): Promise<GetColegiosResponse> {
  const response = await fetch(ENDPOINTS.COLEGIOS.LIST, {
    method: 'GET',
    credentials: 'include', // 🔑 COOKIE
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener colegios')
  }

  return response.json()
}

// ===============================
// CREAR COLEGIO
// POST /v1/colegios
// ===============================
export async function crearColegio(
  data: CrearColegioPayload
): Promise<CrearColegioResponse> {
  const response = await fetch(ENDPOINTS.COLEGIOS.CREATE, {
    method: 'POST',
    credentials: 'include', // 🔑 COOKIE
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear colegio')
  }

  return response.json()
}

// ===============================
// OBTENER COLEGIO POR ID
// GET /v1/colegios/:id
// ===============================
export async function getColegioById(
  id: string
): Promise<GetColegioByIdResponse> {
  const response = await fetch(ENDPOINTS.COLEGIOS.BY_ID(id), {
    method: 'GET',
    credentials: 'include', // 🔑 COOKIE
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener colegio')
  }

  return response.json()
}

// ===============================
// EDITAR COLEGIO
// PATCH /v1/colegios/:id
// ===============================
export async function editarColegio(
  id: string,
  data: EditarColegioPayload
): Promise<EditarColegioResponse> {
  const response = await fetch(ENDPOINTS.COLEGIOS.UPDATE(id), {
    method: 'PATCH',
    credentials: 'include', // 🔑 COOKIE
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al editar colegio')
  }

  return response.json()
}
