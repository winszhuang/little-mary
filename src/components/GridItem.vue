<template>
  <div :class="['grid-item', { hollow: isHollow }]">
    <img v-if="image" :src="image" alt="Grid Image" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isHollow: boolean;
  image?: string;
}>()
</script>

<style scoped>
.grid-item {
  background-color: #fff;
  border: 1px solid #ddd;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hollow {
  background-color: transparent;
  border: none;
}

.grid-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
