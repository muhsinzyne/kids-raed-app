<script setup lang="ts">
interface Props {
  currentMode: "letters" | "numbers";
  currentOrder: "ascending" | "descending";
  currentCase: "lower" | "upper";
  isPlayMode: boolean;
  soundEnabled: boolean;
}

defineProps<Props>();
const emit = defineEmits([
  "toggle-mode",
  "toggle-order",
  "toggle-case",
  "toggle-play-mode",
  "toggle-sound",
  "next-item",
  "prev-item",
  "speak",
]);
</script>

<template>
  <div class="control-panel" :class="{ hidden: isPlayMode }">
    <div class="control-row">
      <button
        class="control-btn mode-btn"
        :class="{ active: currentMode === 'letters' }"
        @click="emit('toggle-mode')"
      >
        {{ currentMode === "letters" ? "ABC" : "123" }}
      </button>

      <button
        class="control-btn order-btn"
        :class="{ active: currentOrder === 'ascending' }"
        @click="emit('toggle-order')"
      >
        {{ currentOrder === "ascending" ? "A → Z" : "Z → A" }}
      </button>

      <button
        v-if="currentMode === 'letters'"
        class="control-btn case-btn"
        :class="{ active: currentCase === 'upper' }"
        @click="emit('toggle-case')"
      >
        {{ currentCase === "upper" ? "ABC" : "abc" }}
      </button>

      <button
        class="control-btn sound-btn"
        :class="{ active: soundEnabled }"
        @click="emit('toggle-sound')"
      >
        {{ soundEnabled ? "🔊" : "🔇" }}
      </button>

      <button class="control-btn speak-btn" @click="emit('speak')">🔊</button>
    </div>

    <div class="control-row">
      <button class="control-btn nav-btn prev-btn" @click="emit('prev-item')">
        ◀
      </button>

      <button
        class="control-btn nav-btn play-btn"
        :class="{ active: isPlayMode }"
        @click="emit('toggle-play-mode')"
      >
        {{ isPlayMode ? "⏹" : "▶" }}
      </button>

      <button class="control-btn nav-btn next-btn" @click="emit('next-item')">
        ▶
      </button>
    </div>
  </div>
</template>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  transition: opacity 0.3s ease;
}

.control-panel.hidden {
  opacity: 0;
  pointer-events: none;
}

.control-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: var(--border-radius);
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.mode-btn {
  background-color: var(--primary-color);
  color: white;
}

.order-btn {
  background-color: var(--accent-color);
  color: var(--text-color);
}

.case-btn {
  background-color: var(--secondary-color);
  color: white;
}

.sound-btn {
  background-color: var(--success-color);
  color: white;
}

.speak-btn {
  background-color: var(--success-color);
  color: white;
}

.play-btn {
  background-color: var(--success-color);
  color: white;
}

.nav-btn {
  background-color: #f0f0f0;
  color: var(--text-color);
  font-size: 1.5rem;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: #e0e0e0;
}

.control-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.control-btn:active {
  transform: translateY(0);
}

.active {
  border: 2px solid rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .control-btn {
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
    min-width: 60px;
  }
}
</style>
