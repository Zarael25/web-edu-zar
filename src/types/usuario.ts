import { RolUsuario } from './roles'
export interface Usuario {
  id: string
  email: string
  nombre: string
  appaterno: string
  apmaterno: string
  carnet: string
  complemento: string
  expedido: string
  fechaNacimiento: string
  genero: 'MASCULINO' | 'FEMENINO'
  celular: string
  estado: 'ACTIVE' | 'INACTIVE'
  roles: RolUsuario[] 
  niveles: string[]
  createdAt: string
  updatedAt: string
}
