const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "dashboard-header":
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        card: "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        earnBg: "url('/images/howToEarnBg.svg')",
        herobg: "url('/images/heroBg.svg')",
        task1: "url('/images/taskOneImage.svg')",
        task2: "url('/images/taskTwoImage.svg')",
        task3: "url('/images/taskThreeImage.svg')",
        task4: "url('/images/taskFourImage.svg')",
        heroDoddle: "url('/images/heroDoddles.svg')",
        collectionsBg: "url('/images/collectionsBg.svg')",
        // "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops)",
        // "post-hero-img": "url('/src/assets/post-bg-img.png')",
        // 'settings-hero-img': "url('/src/assets/settings-hero.png')",
      },
      animation: {
        custombounce: "custombounce 2s ease infinite",
        customrotate: "customrotate 4s ease infinite",
      },
      keyframes: {
        custombounce: {
          "0%, 100%": {
            transform: "translate(-50%,-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translate(-50%,0%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        customrotate: {
          "0%, 100%": {
            transform: "translate(-50%,-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translate(-50%,0%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      fontFamily: {
        // lato: "var(--lato)",
        // poppins: "var(--poppins)",
        roboto_Slab: "var(--roboto_Slab)",
      },
      colors: {
        primary: "#0D0E32",
        secondary: "#F4801D",
        lightBlue: " #00ADEF",
        tertiary: "#090A25",
        textColor: "#DFDFF7",
        white: "#FBFBFE",
        black: "#101128",
        error: "#EF4444",
        grey: "#636488",
        "gray-300": "#9595B2",
        "gray-500": "#636488",
        "gray-700": "#3C3D53",
        "green-400": "#B5D558",
      },
      boxShadowColor: {
        primary: "0px 2px 18px 0px rgba(0, 0, 0, 0.05)",
      },
      customScrollbar: {
        "scrollbar-width": "none", // For Firefox and some other browsers
        "::-webkit-scrollbar": {
          width: "0", // For webkit browsers (Chrome, Safari)
        },
        "::-webkit-scrollbar-thumb": {
          background: "transparent", // For webkit browsers (Chrome, Safari)
        },
      },
    },
  },
  plugins: [],
};
export default config;
