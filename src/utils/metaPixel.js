/**
 * Meta Pixel Utility Functions
 * Provides a centralized way to track events with Meta Pixel
 */

// Check if fbq is available
const isFbqAvailable = () => {
  return typeof window !== 'undefined' && window.fbq && typeof window.fbq === 'function';
};

// Track standard events
export const trackEvent = (eventName, parameters = {}) => {
  if (!isFbqAvailable()) {
    console.warn('Meta Pixel (fbq) is not available');
    return;
  }

  try {
    window.fbq('track', eventName, parameters);
    console.log(`Meta Pixel: Tracked ${eventName}`, parameters);
  } catch (error) {
    console.error('Meta Pixel tracking error:', error);
  }
};

// Track custom events
export const trackCustomEvent = (eventName, parameters = {}) => {
  if (!isFbqAvailable()) {
    console.warn('Meta Pixel (fbq) is not available');
    return;
  }

  try {
    window.fbq('trackCustom', eventName, parameters);
    console.log(`Meta Pixel: Tracked custom event ${eventName}`, parameters);
  } catch (error) {
    console.error('Meta Pixel custom tracking error:', error);
  }
};

// Standard event helpers
export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackViewContent = (contentData = {}) => {
  trackEvent('ViewContent', {
    content_type: 'product',
    ...contentData
  });
};

export const trackLead = (leadData = {}) => {
  trackEvent('Lead', {
    content_category: 'lead_generation',
    ...leadData
  });
};

export const trackContact = (contactData = {}) => {
  trackEvent('Contact', {
    content_category: 'contact_form',
    ...contactData
  });
};

export const trackCompleteRegistration = (registrationData = {}) => {
  trackEvent('CompleteRegistration', {
    content_name: 'user_registration',
    ...registrationData
  });
};

// Business-specific tracking functions
export const trackSurveyStart = () => {
  trackCustomEvent('SurveyStart', {
    content_category: 'engagement',
    content_name: 'business_survey'
  });
};

export const trackSurveyComplete = (surveyData = {}) => {
  trackCustomEvent('SurveyComplete', {
    content_category: 'conversion',
    content_name: 'business_survey_completed',
    ...surveyData
  });
};

export const trackServiceView = (serviceName) => {
  trackViewContent({
    content_name: serviceName,
    content_category: 'service'
  });
};

export const trackContactFormSubmit = (formData = {}) => {
  trackLead({
    content_name: 'contact_form_submission',
    ...formData
  });
};

export const trackWhatsAppClick = () => {
  trackCustomEvent('WhatsAppClick', {
    content_category: 'engagement',
    content_name: 'whatsapp_contact'
  });
};