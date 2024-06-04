<template>
  <div class="grid-container">
    <GridItem v-for="(item, index) in gridItems" :key="index" :isHollow="item.isHollow" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import GridItem from './components/GridItem.vue'

const gridSize = ref(9)

const gridItems = computed(() => {
  const items = []
  for (let row = 0; row < gridSize.value; row++) {
    for (let col = 0; col < gridSize.value; col++) {
      const isEdgeCell = row === 0 || row === gridSize.value - 1 || col === 0 || col === gridSize.value - 1
      items.push({ isHollow: !isEdgeCell })
    }
  }
  return items
})
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--grid-size), 50px);
  grid-template-rows: repeat(var(--grid-size), 50px);
  gap: 1px; /* Optional: space between the cells */
}
</style>
