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
      <button @click="startHighlighting">Start Highlighting</button>
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
let interval: number | undefined

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

const directions = ['right', 'down', 'left', 'up'] as const
let currentDirectionIndex = 0
let currentIndex = 0
const steps = ref(0)
const maxSteps = ref(40)

const moveHighlight = () => {
  const rows = gridSize.value
  const cols = gridSize.value

  const row = Math.floor(currentIndex / cols)
  const col = currentIndex % cols

  switch (directions[currentDirectionIndex]) {
    case 'right':
      if (col < cols - 1) {
        currentIndex++
      } else {
        currentDirectionIndex = (currentDirectionIndex + 1) % 4
      }
      break
    case 'down':
      if (row < rows - 1) {
        currentIndex += cols
      } else {
        currentDirectionIndex = (currentDirectionIndex + 1) % 4
      }
      break
    case 'left':
      if (col > 0) {
        currentIndex--
      } else {
        currentDirectionIndex = (currentDirectionIndex + 1) % 4
      }
      break
    case 'up':
      if (row > 0) {
        currentIndex -= cols
      } else {
        currentDirectionIndex = (currentDirectionIndex + 1) % 4
      }
      break
  }

  highlightedIndex.value = currentIndex
}

const startHighlighting = () => {
  currentDirectionIndex = 0
  currentIndex = 0
  steps.value = 0
  maxSteps.value = 40 // Reset maxSteps

  if (interval !== null) {
    clearInterval(interval)
  }

  interval = window.setInterval(() => {
    if (steps.value >= maxSteps.value) {
      if (interval !== null) {
        clearInterval(interval)
      }
      // Gradually slow down
      interval = window.setInterval(() => {
        if (maxSteps.value < 80) {
          maxSteps.value++
        } else {
          clearInterval(interval)
        }
      }, 100)
    } else {
      moveHighlight()
      steps.value++
    }
  }, 100)
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
