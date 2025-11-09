import { ref, readonly } from "vue";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  timeout: number;
}

const toastsState = ref<ToastItem[]>([]);

export function useToast() {
  function push(
    message: string,
    type: ToastType = "info",
    timeout = 3000
  ): string {
    const id = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const toast: ToastItem = { id, message, type, timeout };

    toastsState.value.push(toast);

    if (timeout > 0) {
      setTimeout(() => remove(id), timeout);
    }

    return id;
  }

  function remove(id: string) {
    toastsState.value = toastsState.value.filter((t) => t.id !== id);
  }

  return {
    push,
    remove,
    toasts: readonly(toastsState),
  };
}

export const toastsRef = toastsState;
