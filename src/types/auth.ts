export interface LoginResponse {
  message: string
  token: string
  usuario: UsuarioAuth
}

export interface UsuarioAuth {
  id: string
  email: string
  nombre: string
  roles: string[]
  niveles: string[]
}
