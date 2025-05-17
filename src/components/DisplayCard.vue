<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  item: string
  mode: 'letters' | 'numbers'
  isPlayMode: boolean
}

const props = defineProps<Props>()
const isAnimating = ref(false)

// Trigger animation when item changes
watch(() => props.item, () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
})
</script>

<template>
  <div 
    class="display-card" 
    :class="{ 
      'mode-letters': mode === 'letters', 
      'mode-numbers': mode === 'numbers',
      'play-mode': isPlayMode 
    }"
  >
    <div class="card-content">
      <div class="item-display" :class="{ 'bounce': isAnimating }">
        {{ item }}
      </div>
      <div v-if="!isPlayMode" class="item-description">
        <template v-if="mode === 'letters'">
          <span class="for-letter">Letter</span>
        </template>
        <template v-else>
          <span class="for-number">Number</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-card {
  width: 100%;
  max-width: 300px;
  height: 300px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: all var(--transition-speed) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.display-card.play-mode {
  max-width: none;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  border: none;
}

.mode-letters {
  background-color: #e3f2fd;
  border: 8px solid var(--primary-color);
}

.mode-numbers {
  background-color: #fff8e1;
  border: 8px solid var(--secondary-color);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.item-display {
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1rem;
  transition: all var(--transition-speed) ease;
}

.play-mode .item-display {
  font-size: 20rem;
  animation: float 3s ease-in-out infinite;
}

.mode-letters .item-display {
  color: var(--primary-color);
}

.mode-numbers .item-display {
  color: var(--secondary-color);
}

.item-description {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 999px;
}

.for-letter {
  color: var(--primary-color);
}

.for-number {
  color: var(--secondary-color);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 0.5s ease;
}

@media (max-width: 768px) {
  .display-card:not(.play-mode) {
    max-width: 250px;
    height: 250px;
  }
  
  .item-display {
    font-size: 6rem;
  }
  
  .play-mode .item-display {
    font-size: 15rem;
  }
  
  .item-description {
    font-size: 1rem;
  }
}
</style>