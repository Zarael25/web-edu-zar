import { ENDPOINTS } from '@/config/api'
import { ImportarEstudiantesResponse } from '@/types/estudiantes'

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
