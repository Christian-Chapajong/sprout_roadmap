/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lime-green": "var(--lime-green)",
        navy: "var(--navy)",
        orange: "var(--orange)",
        "sprout-green": "var(--sprout-green)",
        "variable-collection-grey": "var(--variable-collection-grey)",
        "variable-collection-lime-green":
          "var(--variable-collection-lime-green)",
        "variable-collection-navy": "var(--variable-collection-navy)",
        "variable-collection-orange": "var(--variable-collection-orange)",
        "variable-collection-sprout-green":
          "var(--variable-collection-sprout-green)",
        "variable-collection-white": "var(--variable-collection-white)",
        white: "var(--white)",
      },
    },
  },
  plugins: [],
};
