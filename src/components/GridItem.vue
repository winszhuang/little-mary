<template>
  <div :class="['grid-item', { hollow: isHollow, highlight }]">
    <img v-if="image" :src="image" alt="Grid Image" />
    <div v-if="highlight" class="highlight-overlay"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isHollow: boolean;
  image?: string;
  highlight?: boolean;
}>()
</script>

<style scoped>
.grid-item {
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.3s, background-color 0.3s;
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

.highlight {
  border-color: red;
}

.highlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.3); /* Red semi-transparent overlay */
  pointer-events: none;
}
</style>
