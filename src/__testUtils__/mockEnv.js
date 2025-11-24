// Utility to mock import.meta.env in tests
// This needs to be called before importing components that use import.meta.env

export function setupMockEnv(env = {}) {
  const defaultEnv = {
    DEV: false,
    VITE_SURVEY_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec',
    VITE_SURVEY_BANNER_URL: '/images/seminar-banner.jpg',
    ...env,
  }

  // Mock import.meta at global level
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, 'import', {
      value: {
        meta: {
          env: defaultEnv,
        },
      },
      writable: true,
      configurable: true,
    })
  }

  return defaultEnv
}


