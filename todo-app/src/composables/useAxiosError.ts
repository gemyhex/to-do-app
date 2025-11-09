import type { AxiosError } from 'axios';

export function useAxiosError(error: AxiosError) {
  const status = error.response?.status;
  const message = (status && `${status} ${error.response?.statusText}`) || error.message || 'Network error';
  return { status, message };
}
