<script setup lang="ts">
// No props or additional logic needed for the header
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <span class="letter letter-r">R</span>
      <span class="letter letter-e">e</span>
      <span class="letter letter-a">a</span>
      <span class="letter letter-d">d</span>
      <span class="app-title">App</span>
    </div>
    <h2 class="app-subtitle">Learn Letters & Numbers</h2>
  </header>
</template>

<style scoped>
.app-header {
  padding: 1.5rem 1rem;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.letter {
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0.1rem;
  display: inline-block;
}

.letter-r { color: #ff6b6b; }
.letter-e { color: #4a90e2; }
.letter-a { color: #ffd166; }
.letter-d { color: #06d6a0; }

.app-title {
  font-size: 2rem;
  font-weight: 600;
  margin-left: 0.5rem;
  color: var(--text-color);
}

.app-subtitle {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .letter {
    font-size: 2.2rem;
  }
  
  .app-title {
    font-size: 1.6rem;
  }
  
  .app-subtitle {
    font-size: 1.1rem;
  }
}
</style>