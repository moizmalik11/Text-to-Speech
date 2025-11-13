import React, { useState, useEffect, useRef } from 'react'
import './TextToSpeech.css'

const TextToSpeech = () => {
  const [text, setText] = useState('')
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const synthRef = useRef(window.speechSynthesis)

  // Helper function to detect gender from voice name
  const getVoiceGender = (voiceName) => {
    const nameLower = voiceName.toLowerCase()
    const femaleKeywords = ['female', 'woman', 'girl', 'zira', 'susan', 'karen', 'moira', 'tessa', 'samantha', 'victoria', 'fiona', 'amelie', 'anna', 'carmit', 'damayanti', 'ioana', 'jessica', 'joana', 'kanya', 'kyoko', 'laura', 'lekha', 'luciana', 'mariska', 'mei-jia', 'melina', 'milena', 'mónica', 'nora', 'paulina', 'satu', 'sin-ji', 'tessa', 'ting-ting', 'veena', 'yelda', 'zosia', 'ellen', 'sandy', 'sara']
    const maleKeywords = ['male', 'man', 'boy', 'david', 'mark', 'george', 'daniel', 'james', 'alex', 'thomas', 'xander', 'diego', 'lee', 'nathan']
    
    if (femaleKeywords.some(keyword => nameLower.includes(keyword))) return 'female'
    if (maleKeywords.some(keyword => nameLower.includes(keyword))) return 'male'
    return 'unknown'
  }

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices()
      setVoices(availableVoices)
      
      // Set default voice to Google US English or first available
      const defaultVoice = availableVoices.find(v => v.name === 'Google US English') || availableVoices[0]
      if (defaultVoice) {
        setSelectedVoice(defaultVoice.name)
      }
    }

    loadVoices()
    synthRef.current.addEventListener('voiceschanged', loadVoices)

    return () => {
      synthRef.current.removeEventListener('voiceschanged', loadVoices)
      synthRef.current.cancel()
    }
  }, [])

  const handleSpeak = () => {
    if (!text.trim()) return

    if (isSpeaking && !isPaused) {
      // Pause speaking
      synthRef.current.pause()
      setIsPaused(true)
    } else if (isPaused) {
      // Resume speaking
      synthRef.current.resume()
      setIsPaused(false)
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(text)
      const voice = voices.find(v => v.name === selectedVoice)
      
      if (voice) utterance.voice = voice
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      utterance.onstart = () => {
        setIsSpeaking(true)
        setIsPaused(false)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setIsPaused(false)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setIsPaused(false)
      }

      synthRef.current.speak(utterance)
    }
  }

  const handleStop = () => {
    synthRef.current.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  const getButtonText = () => {
    if (isSpeaking && !isPaused) return 'Pause Speech'
    if (isPaused) return 'Resume Speech'
    return 'Convert To Speech'
  }

  const getButtonIcon = () => {
    if (isSpeaking && !isPaused) return '⏸️'
    if (isPaused) return '▶️'
    return '🔊'
  }

  return (
    <div className="tts-container">
      <div className="tts-wrapper">
        <header className="tts-header">
          <div className="header-icon">🎤</div>
          <h1>Text To Speech</h1>
          <p className="subtitle">Transform your text into natural speech</p>
        </header>

        <div className="tts-content">
          {/* Text Input Section */}
          <div className="input-section">
            <label className="section-label">
              <span className="label-icon">✏️</span>
              <span>Enter Your Text</span>
              <span className="char-count">{text.length} characters</span>
            </label>
            <textarea
              className="text-input"
              placeholder="Enter your message or paste any text to convert into natural speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
            />
          </div>

          {/* Voice Selection */}
          <div className="control-section">
            <label className="section-label">
              <span className="label-icon">🎧</span>
              <span>Voice Selection</span>
              <span className="voice-count">{voices.length} voices</span>
            </label>
            <div className="select-wrap">
              <select
                className="voice-select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voices.map((voice, index) => {
                  const gender = getVoiceGender(voice.name)
                  const genderIcon = gender === 'female' ? '👩' : gender === 'male' ? '👨' : '🎤'
                  return (
                    <option key={index} value={voice.name}>
                      {genderIcon} {voice.name} ({voice.lang})
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Voice Gender Indicators */}
            <div className="voice-gender-info">
              <div className="gender-badge female">
                <span>👩</span>
                <span>Female Voices</span>
              </div>
              <div className="gender-badge male">
                <span>👨</span>
                <span>Male Voices</span>
              </div>
              <div className="gender-badge neutral">
                <span>🎤</span>
                <span>Other Voices</span>
              </div>
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="advanced-controls">
            <div className="control-group">
              <label className="slider-label">
                <span>⚡ Speed</span>
                <span className="slider-value">{rate.toFixed(1)}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="slider"
              />
            </div>

            <div className="control-group">
              <label className="slider-label">
                <span>🎵 Pitch</span>
                <span className="slider-value">{pitch.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="slider"
              />
            </div>

            <div className="control-group">
              <label className="slider-label">
                <span>🔊 Volume</span>
                <span className="slider-value">{Math.round(volume * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              className={`main-button ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleSpeak}
              disabled={!text.trim()}
            >
              <span className="button-icon">{getButtonIcon()}</span>
              <span>{getButtonText()}</span>
            </button>

            {isSpeaking && (
              <button className="stop-button" onClick={handleStop}>
                <span className="button-icon">⏹️</span>
                <span>Stop</span>
              </button>
            )}
          </div>

          {/* Status Indicator */}
          {isSpeaking && (
            <div className="status-indicator">
              <div className="pulse-dot"></div>
              <span>{isPaused ? 'Paused' : 'Speaking...'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextToSpeech
