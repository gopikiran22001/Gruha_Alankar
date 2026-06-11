/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0C",  // Obsidian Dark Black
        surface: "#161618",     // Deep Charcoal Surface
        primary: {
          DEFAULT: "#E11D48",   // Crimson Red
          hover: "#BE123C",     // Rose-700
        },
        secondary: {
          DEFAULT: "#52525B",   // Charcoal Accent
          hover: "#3F3F46",
        },
        success: "#22C55E",     // Indicators Green
        muted: "#94A3B8",       // Muted Slate
        text: "#F8FAFC",        // Off-White readable text
        border: "rgba(255,255,255,0.06)", // Thin slate border
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glow': '0 0 15px rgba(225, 29, 72, 0.3)',
        'glow-secondary': '0 0 15px rgba(82, 82, 91, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
