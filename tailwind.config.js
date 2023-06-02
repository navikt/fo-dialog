const naviktTailwindPreset = require('@navikt/ds-tailwind');

module.exports = {
    presets: [naviktTailwindPreset],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            maxWidth: {
                'screen-w-1/3': '33vw',
                'max-paragraph': '40rem',
                248: '62rem',
                lgContainer: '700px'
            }
        }
    }
};
