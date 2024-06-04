<template>
    <div :class="['grid-item', { hollow: isHollow }]"></div>
  </template>

<script lang="ts" setup>

defineProps<{
    isHollow: boolean;
  }>()
</script>

  <style scoped>
  .grid-item {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .hollow {
    background-color: transparent;
    border: none;
  }
  </style>
