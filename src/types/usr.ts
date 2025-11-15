export interface Usr {
  id: string;
  name: string;
  lastName: string;
  email: string;
  lastClickAt: Date | null; // fecha del último click
}

export interface UsrResponse extends Usr {}

// DTO para crear un usuario
export interface CreateUsrDTO {
  name: string;
  lastName: string;
  email: string;
}

// DTO para actualizar (PUT o PATCH)
export interface UpdateUsrDTO {
  name?: string;
  lastName?: string;
  email?: string;
  lastClickAt?: Date | null;
}
