
# StylistExpert Frontend

A luxury-styled React frontend for the StylistExpert web app, providing an interactive and cinematic user experience for personalized fashion recommendations.

## Features

- **Luxury UI/UX**: Cinematic polish with smooth animations and micro-interactions
- **Personalized Input**: Comprehensive user profiling (gender, occasion, weather, body type, style, colors, height)
- **Interactive Experience**: Step-by-step form with beautiful transitions
- **Save & Export**: Local storage for favorite looks and PNG download functionality
- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Themes**: Elegant theme switching with system preference detection

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Vite** - Next generation frontend tooling

## Setup Instructions

1. Navigate to the `frontend` directory (if not already there):
  ```bash
  cd frontend
  ```
2. Install Node.js dependencies:
  ```bash
  npm install
  ```
3. Start the development server:
  ```bash
  npm run dev
  ```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation and theme toggle
│   │   ├── Hero.tsx         # Animated landing section
│   │   ├── InputForm.tsx    # Multi-step style preferences form
│   │   ├── RecommendationCards.tsx  # Style recommendation display
│   │   └── Footer.tsx       # Site footer
│   ├── contexts/
│   │   └── ThemeContext.tsx # Dark/light theme management
│   ├── types.ts             # TypeScript type definitions
│   └── App.tsx              # Main application component
├── index.html               # App entry point
├── index.css                # Global styles
├── package.json             # Node.js dependencies
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.ts           # Vite config
└── README.md                # This file
```

## Frontend Architecture

- **Component-based**: Modular React components with clear separation of concerns
- **State Management**: React hooks with context for theme management
- **Animation System**: Framer Motion for smooth, performant animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Performance Considerations

- **Lazy Loading**: Images load on demand for faster initial page loads
- **Optimized Animations**: Hardware-accelerated CSS transforms via Framer Motion
- **Efficient API Usage**: Minimal data transfer with structured JSON responses
- **Caching Strategy**: LocalStorage for user preferences and saved looks
- **Responsive Images**: Appropriate sizing for different screen densities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for fashion lovers everywhere.