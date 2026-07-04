/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      id: string;
      username: string;
      role: 'aluno' | 'coordenador' | 'adm';
      salaId: string | null;
      mustChangePassword: boolean;
    } | null;
  }
}
