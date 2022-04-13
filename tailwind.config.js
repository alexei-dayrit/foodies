module.exports = {
  content: [
    './client/app.jsx',
    './client/index.jsx',
    './client/pages/**/*.jsx'
  ],
  theme: {
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif']
    },
    extend: {
      colors: {
        wrapper: 'var(--wrapper)'
      }
    }
  },
  plugins: []
};
