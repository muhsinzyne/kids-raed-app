<script setup lang="ts">
import { onMounted, watch } from "vue";
import DisplayCard from "./components/DisplayCard.vue";
import ControlPanel from "./components/ControlPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import MobileControls from "./components/MobileControls.vue";
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
        @swipe-left="nextItem"
        @swipe-right="prevItem"
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

    <MobileControls
      :isPlayMode="isPlayMode"
      @prev="prevItem"
      @next="nextItem"
      @exit="togglePlayMode"
    />

    <footer v-if="!isPlayMode" class="app-footer">
      <p>Swipe left/right or use arrows to navigate</p>
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
  padding: 0 1rem;
}

.app-container.play-mode {
  max-width: none;
  min-height: 100vh;
  background-color: var(--background-color);
  padding: 0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.progress-indicator {
  display: flex;
  gap: 8px;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  overflow-x: auto;
  padding: 0.5rem;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.progress-dot.active {
  background-color: var(--primary-color);
  transform: scale(1.2);
}

.app-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

@media (max-width: 768px) {
  .app-container {
    padding: 0 0.5rem;
  }

  .main-content {
    padding: 0.5rem;
    gap: 1rem;
    margin-bottom: 5rem; /* Add space for mobile controls */
  }

  .progress-dot {
    width: 10px;
    height: 10px;
  }

  .app-footer {
    font-size: 0.8rem;
    padding: 0 1rem;
    margin-bottom: 5rem; /* Add space for mobile controls */
  }
}
</style>
