// src/domain/entities/user.entity.ts
import { UserRole } from '../enums/user-role.enum';

/**
 * Entidad de Usuario del Dominio
 * Representa un usuario del sistema que puede realizar recargas
 */
export class User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  /**
   * Verifica si el usuario tiene el rol de administrador
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Verifica si el usuario puede crear recargas
   */
  canCreateRecharge(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Verifica si el usuario puede listar recargas
   */
  canListRecharges(): boolean {
    return this.role === UserRole.ADMIN || this.role === UserRole.READ_ONLY;
  }

  /**
   * Actualiza la información del usuario
   */
  updateInfo(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }
}