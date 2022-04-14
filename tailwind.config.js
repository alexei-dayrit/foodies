module.exports = {
  content: [
    './client/app.jsx',
    './client/index.jsx',
    './client/pages/**/*.jsx',
    './client/components/**/*.jsx',
    './client/lib/**/*.jsx'
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
