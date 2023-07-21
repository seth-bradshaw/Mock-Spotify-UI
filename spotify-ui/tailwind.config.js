module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'inner-md': '-15px 0 10px 20px #18181'
      },
      colors: {
        'spotify-green-400': '#1ED760',
        'spotify-green-500': '#1DD05D',
        'spotify-gray-200': '#A7A7A7',
        'spotify-gray-300': '#B3B3B3',
        'spotify-gray-600': '#5D5D5D',
        'spotify-gray-650': '#303030',
        'spotify-gray-700': '#242424',
        'spotify-gray-800': '#181818',
        'spotify-gray-900': '#121212'
      },
      keyframes: {
        'scroll-text-linear': {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)',
          },
        }
      },
      animation: {
      'scroll-text-linear': 'scroll-text-linear 20s 2'
      }
    },
  },
  plugins: []
}
