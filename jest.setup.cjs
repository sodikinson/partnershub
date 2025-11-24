// Learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom')

// Mock import.meta.env for Vite
if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'import', {
    value: {
      meta: {
        env: {
          DEV: false,
          VITE_SURVEY_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec',
          VITE_SURVEY_BANNER_URL: '/images/seminar-banner.jpg',
        },
      },
    },
    writable: true,
    configurable: true,
  })
}

