// ===============================
// ESTUDIANTE (ENTITY)
// ===============================
export interface Estudiante {
  _id: string
  colegio: string
  apellidos: string
  nombres: string
  carnet: string
  gestion: number | string
  curso: string
  nivel: string
  estado: 'ACTIVO' | 'INACTIVO'
  createdAt?: string
  updatedAt?: string
}

// ===============================
// RESPONSES
// ===============================

// POST /v1/estudiantes/importar
export interface ImportarEstudiantesResponse {
  message: string
  total: number
  creados: number
  duplicados: number
  omitidos: number
}

// (FUTURO)
export interface GetEstudiantesResponse {
  count: number
  data: Estudiante[]
}

export interface GetEstudianteByIdResponse extends Estudiante {}

// ===============================
// PAYLOADS
// ===============================
export interface CrearEstudiantePayload {
  colegio: string
  apellidos: string
  nombres: string
  carnet: string
  gestion: number | string
  curso: string
  nivel: string
}

export interface EditarEstudiantePayload {
  apellidos?: string
  nombres?: string
  gestion?: number | string
  curso?: string
  nivel?: string
  estado?: 'ACTIVO' | 'INACTIVO'
}
