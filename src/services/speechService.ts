// Web Speech API service for text-to-speech

export function useSpeechService() {
  const synth = window.speechSynthesis
  
  function speak(text: string) {
    // Cancel any ongoing speech
    if (synth.speaking) {
      synth.cancel()
    }
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Configure the utterance
    utterance.rate = 0.9 // Slightly slower for kids
    utterance.pitch = 1.1 // Slightly higher pitch for kids
    utterance.volume = 1.0
    
    // Get available voices and try to find a child-friendly one
    const voices = synth.getVoices()
    
    // Look for child voices first, or female voices as alternatives
    const childVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('child') || 
      voice.name.toLowerCase().includes('kid')
    )
    
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman')
    )
    
    // Use child voice if available, otherwise female, or default if neither is available
    if (childVoice) {
      utterance.voice = childVoice
    } else if (femaleVoice) {
      utterance.voice = femaleVoice
    }
    
    // Speak the text
    synth.speak(utterance)
  }
  
  return {
    speak
  }
}