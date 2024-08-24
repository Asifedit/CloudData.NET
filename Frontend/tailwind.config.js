/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#1e1e1e",
                primary: "#333",
                link: "#007bff",
                highlight: "#003cff",
                red: "#dc3545",
                acua: "#003cff",
            },
            fontFamily: {
                LargFront: "Edu AU VIC WA NT Hand",
                basicFont: "Timmana",
                normalFont: "Kanit",
            },
        },
    },
    plugins: [],
};
