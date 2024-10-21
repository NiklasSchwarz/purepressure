/** @type {import {'tailwindcss'}.config} */ 

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      content: {
        'empty': '""', 
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primary2: 'rgb(var(--color-primary2) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        secondary2: 'rgb(var(--color-secondary2) / <alpha-value>)',
        neutral: 'rgb(var(--color-neutral) /  <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
      },
      backgroundImage: {
        'hero-pattern': "url('~/public/assets/images/hero.jpg')",
      }
    },
  },
  plugins: [],
}
