/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './*.html',
        './src/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#8ed4c4',
                'primary-container': '#0f5f53',
                'on-primary': '#003730',
                'background': '#14130e',
                'surface': '#14130e',
                'surface-variant': '#36352f',
                'surface-container': '#1e1d17',
                'on-surface': '#e7e2d9',
                'on-surface-variant': '#bec9c5',
                'secondary': '#abcec6',
                'secondary-container': '#2c4d47',
                'on-secondary': '#153630',
                'outline': '#89938f',
                'outline-variant': '#3f4946',
                'accent-brown': '#8B5E34',
            },
            spacing: {
                'margin-mobile': '20px',
                'margin-desktop': '64px',
                'gutter': '24px',
                'unit': '8px',
                'stack-sm': '16px',
                'stack-md': '32px',
                'stack-lg': '80px',
                'container-max': '1280px',
            },
            maxWidth: {
                'container-max': '1280px',
            },
            fontFamily: {
                'display-lg': ['Montserrat', 'sans-serif'],
                'headline-md': ['Montserrat', 'sans-serif'],
                'headline-sm': ['Montserrat', 'sans-serif'],
                'body-lg': ['Montserrat', 'sans-serif'],
                'body-md': ['Montserrat', 'sans-serif'],
                'label-md': ['Montserrat', 'sans-serif'],
                'caption': ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-lg-mobile': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
                'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
                'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
                'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
                'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
                'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
                'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
