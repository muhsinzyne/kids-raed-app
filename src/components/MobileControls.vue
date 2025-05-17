<script setup lang="ts">
interface Props {
  isPlayMode: boolean;
}

defineProps<Props>();
const emit = defineEmits(["prev", "next", "exit"]);
</script>

<template>
  <div class="mobile-controls" :class="{ 'play-mode': isPlayMode }">
    <button
      v-if="!isPlayMode"
      class="control-btn prev-btn"
      @click="emit('prev')"
      aria-label="Previous"
    >
      ◀
    </button>

    <button
      v-if="!isPlayMode"
      class="control-btn next-btn"
      @click="emit('next')"
      aria-label="Next"
    >
      ▶
    </button>

    <button
      v-if="isPlayMode"
      class="control-btn exit-btn"
      @click="emit('exit')"
      aria-label="Exit Play Mode"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.mobile-controls {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0 1rem;
  z-index: 100;
  pointer-events: none;
}

.mobile-controls.play-mode {
  top: 2rem;
  bottom: auto;
}

.control-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.control-btn:active {
  transform: scale(0.95);
}

.prev-btn,
.next-btn {
  background-color: var(--primary-color);
  color: white;
}

.exit-btn {
  background-color: var(--secondary-color);
  color: white;
  font-size: 1.2rem;
}

@media (min-width: 769px) {
  .mobile-controls {
    display: none;
  }
}

@media (max-width: 768px) {
  .mobile-controls {
    bottom: 1rem;
  }

  .mobile-controls.play-mode {
    top: 1rem;
  }

  .control-btn {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
  }
}
</style>
