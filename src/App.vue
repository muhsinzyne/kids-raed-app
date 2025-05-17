<script setup lang="ts">
import { onMounted, watch } from "vue";
import DisplayCard from "./components/DisplayCard.vue";
import ControlPanel from "./components/ControlPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import { useItemsStore } from "./stores/itemsStore";

const {
  currentMode,
  currentOrder,
  currentCase,
  currentIndex,
  currentItem,
  items,
  isPlayMode,
  soundEnabled,
  toggleMode,
  toggleOrder,
  toggleCase,
  togglePlayMode,
  toggleSound,
  nextItem,
  prevItem,
  speakCurrentItem,
} = useItemsStore();

// Handle keyboard navigation
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowRight" || event.key === " ") {
    nextItem();
    speakCurrentItem();
  } else if (event.key === "ArrowLeft") {
    prevItem();
    speakCurrentItem();
  } else if (event.key === "Escape" && isPlayMode.value) {
    togglePlayMode();
  }
}

// Watch for play mode changes
watch(isPlayMode, (newValue) => {
  if (newValue) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  // Speak the initial item
  setTimeout(() => {
    speakCurrentItem();
  }, 500);
});
</script>

<template>
  <div class="app-container" :class="{ 'play-mode': isPlayMode }">
    <AppHeader v-if="!isPlayMode" />

    <main class="main-content">
      <DisplayCard
        :item="currentItem"
        :mode="currentMode"
        :isPlayMode="isPlayMode"
      />

      <ControlPanel
        :currentMode="currentMode"
        :currentOrder="currentOrder"
        :currentCase="currentCase"
        :isPlayMode="isPlayMode"
        :soundEnabled="soundEnabled"
        @toggle-mode="toggleMode"
        @toggle-order="toggleOrder"
        @toggle-case="toggleCase"
        @toggle-play-mode="togglePlayMode"
        @toggle-sound="toggleSound"
        @next-item="nextItem"
        @prev-item="prevItem"
        @speak="speakCurrentItem"
      />

      <div v-if="!isPlayMode" class="progress-indicator">
        <div
          v-for="index in items.length"
          :key="index - 1"
          :class="['progress-dot', { active: index - 1 === currentIndex }]"
        ></div>
      </div>
    </main>

    <footer v-if="!isPlayMode" class="app-footer">
      <p>Press Space or Right Arrow to move to the next item</p>
      <p>Press ESC to exit play mode</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  transition: all var(--transition-speed) ease;
}

.app-container.play-mode {
  max-width: none;
  min-height: 100vh;
  background-color: var(--background-color);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.progress-indicator {
  display: flex;
  gap: 8px;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background-color: var(--primary-color);
  transform: scale(1.2);
}

.app-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .progress-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
