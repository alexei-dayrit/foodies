module.exports = {
  content: [
    './client/app.jsx',
    './client/pages/home.jsx'
  ],
  theme: {
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif']
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        main: 'var(--main)',
        background: 'var(--background)',
        header: 'var(--header)',
        accent: 'var(--accent)'
      }
    }
  },
  plugins: []
};
