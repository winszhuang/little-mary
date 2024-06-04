// src/config.ts
import { ref } from 'vue'

const gridSize = ref(9)

export const setGridSize = (size: number) => {
  gridSize.value = size
  document.documentElement.style.setProperty('--grid-size', size.toString())
}

export default gridSize
