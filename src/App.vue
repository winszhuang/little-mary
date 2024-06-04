<template>
  <div>
    <div class="grid-container">
      <GridItem
        v-for="(item, index) in gridItems"
        :key="index"
        :isHollow="item.isHollow"
        :image="item.image"
        :highlight="highlightedIndex === index"
      />
      <div class="center-content">
        <!-- 在这里插入你想要的图片或动画 -->
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s" alt="Center Image" />
      </div>
    </div>
    <div class="button-container">
      <button @click="highlightRandomCell">Highlight Random Cell</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import GridItem from './components/GridItem.vue'
import gridSize, { setGridSize } from './config/config'

// Set initial grid size
setGridSize(10)

// State for highlighted index
const highlightedIndex = ref<number | null>(null)

// Example image URLs array (you can replace these with your own images)
const images = [
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  'https://cdn-icons-png.flaticon.com/512/4436/4436481.png'
  // ... add as many URLs as needed
]

const gridItems = computed(() => {
  const items = []
  for (let row = 0; row < gridSize.value; row++) {
    for (let col = 0; col < gridSize.value; col++) {
      const isEdgeCell = row === 0 || row === gridSize.value - 1 || col === 0 || col === gridSize.value - 1
      const image = isEdgeCell ? images[(row * gridSize.value + col) % images.length] : ''
      items.push({ isHollow: !isEdgeCell, image })
    }
  }
  return items
})

const highlightRandomCell = () => {
  const edgeIndices = gridItems.value
    .map((item, index) => (item.isHollow ? null : index))
    .filter(index => index !== null) as number[]
  highlightedIndex.value = edgeIndices[Math.floor(Math.random() * edgeIndices.length)]
}
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

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
