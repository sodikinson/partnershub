/**
 * Google Analytics utility functions for tracking events
 * Provides a centralized way to track user interactions with Google Analytics
 */

/**
 * Check if gtag is available
 * @returns {boolean} True if gtag is loaded and available
 */
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a custom event with Google Analytics
 * @param {string} eventName - The name of the event
 * @param {Object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics (gtag) is not available');
    return;
  }

  try {
    window.gtag('event', eventName, parameters);
    console.log('GA Event tracked:', eventName, parameters);
  } catch (error) {
    console.error('Error tracking GA event:', error);
  }
};

/**
 * Track page view
 * @param {string} pageTitle - The page title
 * @param {string} pagePath - The page path
 */
export const trackPageView = (pageTitle, pagePath) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics (gtag) is not available');
    return;
  }

  try {
    window.gtag('config', 'G-LEWFYGVCZL', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath
    });
    console.log('GA Page view tracked:', pageTitle, pagePath);
  } catch (error) {
    console.error('Error tracking GA page view:', error);
  }
};

/**
 * Track form submission
 * @param {string} formName - The name/type of the form
 * @param {Object} formData - Additional form data to track
 */
export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
};

/**
 * Track button clicks
 * @param {string} buttonName - The name/type of the button
 * @param {Object} additionalData - Additional data to track
 */
export const trackButtonClick = (buttonName, additionalData = {}) => {
  trackEvent('click', {
    button_name: buttonName,
    ...additionalData
  });
};

/**
 * Track survey interactions
 * @param {string} action - The survey action (start, complete, etc.)
 * @param {Object} surveyData - Survey-specific data
 */
export const trackSurveyInteraction = (action, surveyData = {}) => {
  trackEvent('survey_interaction', {
    survey_action: action,
    ...surveyData
  });
};

/**
 * Track contact interactions
 * @param {string} method - The contact method (whatsapp, form, etc.)
 * @param {Object} contactData - Contact-specific data
 */
export const trackContactInteraction = (method, contactData = {}) => {
  trackEvent('contact', {
    contact_method: method,
    ...contactData
  });
};

/**
 * Track service page views
 * @param {string} serviceName - The name of the service
 */
export const trackServiceView = (serviceName) => {
  trackEvent('service_view', {
    service_name: serviceName
  });
};