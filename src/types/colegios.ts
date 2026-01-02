// ===============================
// COLEGIO (ENTITY)
// ===============================
export interface Colegio {
  _id: string
  nombre_colegio: string
  niveles: string[]
  estado: 'ACTIVO' | 'INACTIVO'
  createdAt?: string
  updatedAt?: string
}

// ===============================
// RESPONSES
// ===============================

// GET /v1/colegios
export interface GetColegiosResponse {
  count: number
  data: Colegio[]
}

// GET /v1/colegios/:id
export interface GetColegioByIdResponse extends Colegio {}

// POST /v1/colegios
export interface CrearColegioResponse extends Colegio {}

// PATCH /v1/colegios/:id
export interface EditarColegioResponse {
  message: string
  data: Colegio
}

// ===============================
// PAYLOADS (REQUEST BODY)
// ===============================

// POST /v1/colegios
export interface CrearColegioPayload {
  nombre_colegio: string
  niveles: string[]
}

// PATCH /v1/colegios/:id
export interface EditarColegioPayload {
  nombre_colegio?: string
  niveles?: string[]
}
