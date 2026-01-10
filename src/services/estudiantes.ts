import { ENDPOINTS } from '@/config/api'
import {
  ImportarEstudiantesResponse,
  GetEstudiantesResponse,
  GetEstudianteByIdResponse,
  CrearEstudiantePayload,
  Estudiante,
} from '@/types/estudiantes'

// ===============================
// POST /v1/estudiantes/importar
// ===============================
export async function importarEstudiantes(
  colegioId: string,
  files: File[]
): Promise<ImportarEstudiantesResponse> {
  const formData = new FormData()

  formData.append('file', files[0])
  formData.append('colegio', colegioId)

  const response = await fetch(ENDPOINTS.ESTUDIANTES.IMPORTAR, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al importar estudiantes')
  }

  return response.json()
}

// ===============================
// GET /v1/estudiantes
// filtros: colegio, nivel, curso
// ===============================
export async function getEstudiantes(params?: {
  colegio?: string
  nivel?: string
  curso?: string
}): Promise<GetEstudiantesResponse> {
  const query = new URLSearchParams()

  if (params?.colegio) query.append('colegio', params.colegio)
  if (params?.nivel) query.append('nivel', params.nivel)
  if (params?.curso) query.append('curso', params.curso)

  const response = await fetch(
    `${ENDPOINTS.ESTUDIANTES.LIST}?${query.toString()}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener estudiantes')
  }

  return response.json()
}

// ===============================
// GET /v1/estudiantes/:id
// ===============================
export async function getEstudianteById(
  id: string
): Promise<GetEstudianteByIdResponse> {
  const response = await fetch(ENDPOINTS.ESTUDIANTES.BY_ID(id), {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener estudiante')
  }

  return response.json()
}

// ===============================
// POST /v1/estudiantes
// ===============================
export async function crearEstudiante(
  payload: CrearEstudiantePayload
): Promise<Estudiante> {
  const response = await fetch(ENDPOINTS.ESTUDIANTES.CREATE, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear estudiante')
  }

  return response.json()
}


