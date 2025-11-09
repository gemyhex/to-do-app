<template>
  <button
    class="btn"
    :class="[
      variantClass,
      sizeClass,
      block ? 'w-full' : '',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "primary" | "ghost";
    size?: "sm" | "md" | "lg";
    block?: boolean;
  }>(),
  {
    type: "button",
    disabled: false,
    variant: "primary",
    size: "md",
    block: false,
  }
);

const variantClass =
  props.variant === "primary"
    ? "btn-primary"
    : props.variant === "ghost"
      ? "btn-ghost"
      : "";

const sizeClass =
  props.size === "sm"
    ? "text-sm px-3 py-1.5"
    : props.size === "lg"
      ? "text-base px-6 py-3"
      : "text-sm px-4 py-2"; // md = default
</script>
