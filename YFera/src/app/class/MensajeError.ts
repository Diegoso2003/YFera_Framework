import { HttpErrorResponse } from '@angular/common/http';

export function extraerMensajeError(error: HttpErrorResponse, opcional: string): string {
  if (typeof error.error?.message === 'string') {
    return error.error.message;
  }
  if (Array.isArray(error.error?.message)) {
    return error.error.message.join('\n');
  }
  if (typeof error.error?.error === 'string') {
    return error.error.error;
  }
  if (typeof error.error === 'string') {
    return error.error;
  }
  if (error.message) {
    return error.message;
  }

  return opcional;
}
