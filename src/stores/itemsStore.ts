import { ref, computed } from 'vue'
import { useSpeechService } from '../services/speechService'

type Mode = 'letters' | 'numbers'
type Order = 'ascending' | 'descending'
type Case = 'lower' | 'upper'

// Data sets
const letters = {
  ascending: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  descending: 'zyxwvutsrqponmlkjihgfedcba'.split('')
}

const numbers = {
  ascending: Array.from({ length: 100 }, (_, i) => (i + 1).toString()),
  descending: Array.from({ length: 100 }, (_, i) => (100 - i).toString())
}

export function useItemsStore() {
  const { speak } = useSpeechService()
  
  // State
  const currentMode = ref<Mode>('letters')
  const currentOrder = ref<Order>('ascending')
  const currentIndex = ref(0)
  const isPlayMode = ref(false)
  const currentCase = ref<Case>('lower')
  const autoplayTimer = ref<number | null>(null)
  const soundEnabled = ref(true)
  
  // Computed
  const items = computed(() => {
    if (currentMode.value === 'letters') {
      const baseItems = currentOrder.value === 'ascending' ? letters.ascending : letters.descending
      return baseItems.map(letter => 
        currentCase.value === 'upper' ? letter.toUpperCase() : letter.toLowerCase()
      )
    } else {
      return currentOrder.value === 'ascending' ? numbers.ascending : numbers.descending
    }
  })
  
  const currentItem = computed(() => {
    return items.value[currentIndex.value]
  })
  
  // Actions
  function toggleMode() {
    currentMode.value = currentMode.value === 'letters' ? 'numbers' : 'letters'
    currentIndex.value = 0
    speakCurrentItem()
  }
  
  function toggleOrder() {
    currentOrder.value = currentOrder.value === 'ascending' ? 'descending' : 'ascending'
    currentIndex.value = 0
    speakCurrentItem()
  }
  
  function toggleCase() {
    if (currentMode.value === 'letters') {
      currentCase.value = currentCase.value === 'lower' ? 'upper' : 'lower'
      speakCurrentItem()
    }
  }
  
  function startAutoplay() {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value)
    }
    
    // Initial speech
    speakCurrentItem()
    
    // Repeat every 3 seconds
    autoplayTimer.value = setInterval(() => {
      speakCurrentItem()
    }, 3000)
  }
  
  function stopAutoplay() {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value)
      autoplayTimer.value = null
    }
  }
  
  function togglePlayMode() {
    isPlayMode.value = !isPlayMode.value
    if (isPlayMode.value) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
  }
  
  function nextItem() {
    currentIndex.value = (currentIndex.value + 1) % items.value.length
    if (isPlayMode.value) {
      startAutoplay()
    }
  }
  
  function prevItem() {
    currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length
    if (isPlayMode.value) {
      startAutoplay()
    }
  }
  
  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
  }
  
  function speakCurrentItem() {
    if (!soundEnabled.value) return
    const item = currentItem.value
    speak(item)
  }
  
  return {
    currentMode,
    currentOrder,
    currentIndex,
    currentItem,
    items,
    isPlayMode,
    currentCase,
    soundEnabled,
    toggleMode,
    toggleOrder,
    toggleCase,
    togglePlayMode,
    toggleSound,
    nextItem,
    prevItem,
    speakCurrentItem
  }
}