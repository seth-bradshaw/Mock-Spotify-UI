module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'spotify-green-400': '#1ED760',
        'spotify-green-500': '#1DD05D',
        'spotify-gray-200': '#A7A7A7',
        'spotify-gray-300': '#B3B3B3',
        'spotify-gray-600': '#5D5D5D',
        'spotify-gray-800': '#181818',
        'spotify-gray-900': '#121212'
      },
      keyframes: {
        'scroll-text-linear': {
          '0%': {
            transform: 'translateX(0)',
          },
          '6.5%': {
            transform: 'translateX(-30px) rotateY(-9deg)',
          },
          '12.5': {
            transform: 'translateX(-30px) rotateY(-9deg)',
          },
          '18.5%': {
            transform: 'translateX(10px) rotateY(7deg)',
          },
          '24.5%': {
            transform: 'translateX(10px) rotateY(7deg)',
          },
          '31.5%': {
            transform: 'translateX(-30px) rotateY(-5deg)',
          },
          '37.5%': {
            transform: 'translateX(-30px) rotateY(-5deg)',
          },
          '43.5%': {
            transform: 'translateX(10px) rotateY(3deg)',
          },
          '48.5%': {
            transform: 'translateX(10px) rotateY(3deg)',
          },
          '55%': {
            transform: 'translateX(0)',
          }
        }
      },
      animation: {
        'scroll-text-linear': 'scroll-text-linear 40s infinite'
      }
    },
  },
  plugins: []
}
