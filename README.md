# Text-to-Speech React App 🎤

A modern, feature-rich Text-to-Speech application built with React and the Web Speech API. Transform your text into natural speech with advanced controls and a beautiful, animated glassmorphic UI.

## ✨ Features

- **Modern React Architecture** - Built with React 18 and functional components using hooks
- **Beautiful Glassmorphic UI** - Stunning gradient backgrounds with glassmorphism effects
- **Advanced Voice Controls**:
  - Multiple voice selection (system TTS voices)
  - Speed control (0.5x - 2x)
  - Pitch adjustment (0.5 - 2)
  - Volume control (0% - 100%)
- **Play/Pause/Resume** - Full control over speech playback
- **Character Counter** - Real-time character count display
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Engaging animations throughout the UI
- **Status Indicators** - Visual feedback for speaking/paused states

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Built With

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Web Speech API** - Browser-native text-to-speech
- **CSS3** - Modern styling with animations and glassmorphism

## 📦 Project Structure

```
text-to-speech-react/
├── src/
│   ├── components/
│   │   ├── TextToSpeech.jsx      # Main TTS component
│   │   └── TextToSpeech.css      # Component styles
│   ├── App.jsx                    # Root component
│   ├── App.css                    # Global styles
│   └── main.jsx                   # Entry point
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

## 🎨 Features Breakdown

### Voice Selection
Choose from all available system voices with language indicators.

### Speed Control
Adjust speech rate from 0.5x (slow) to 2x (fast) for optimal listening experience.

### Pitch Control
Modify voice pitch from 0.5 (low) to 2 (high) for voice customization.

### Volume Control
Fine-tune output volume from 0% to 100%.

### Playback Controls
- **Convert to Speech** - Start speaking the text
- **Pause Speech** - Temporarily pause playback
- **Resume Speech** - Continue from where you paused
- **Stop** - Cancel current speech completely

## 🌐 Browser Compatibility

The Web Speech API is supported in:
- Chrome/Edge (Recommended)
- Safari
- Firefox (Limited voice options)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Usage Tips

1. Type or paste your text in the textarea
2. Select your preferred voice from the dropdown
3. Adjust speed, pitch, and volume to your liking
4. Click "Convert To Speech" to start
5. Use Pause/Resume for long texts
6. Click Stop to cancel at any time

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Powered by the Web Speech API
- Inspired by modern UI/UX design principles

---

**Enjoy using the Text-to-Speech app! 🎉**
