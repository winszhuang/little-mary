<template>
  <div class="grid-container">
    <GridItem v-for="(item, index) in gridItems" :key="index" :isHollow="item.isHollow" />
    <div class="center-content">
      <!-- 在这里插入你想要的图片或动画 -->
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s" alt="Center Image" />
    </div>
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
  position: relative; /* To position the center content */
}

.center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2 * 50px); /* Adjust width to fit within the hollow */
  height: calc(100% - 2 * 50px); /* Adjust height to fit within the hollow */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optional: background color */
  box-sizing: border-box;
}

.center-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Ensure the image fits within the container */
}
</style>
