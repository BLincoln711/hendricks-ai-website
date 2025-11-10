// Analytics utility functions for tracking custom events
// For use with Google Analytics 4 and Google Tag Manager

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// GA4 Event Tracking
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// GTM DataLayer Push
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Predefined tracking functions for Hendricks.AI

// CTA Tracking
export const trackCTA = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });

  pushToDataLayer({
    event: 'cta_interaction',
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

// Service Tier Interest
export const trackServiceInterest = (
  serviceName: string,
  priceRange: string
) => {
  trackEvent('service_interest', {
    service_name: serviceName,
    price_range: priceRange,
  });

  pushToDataLayer({
    event: 'service_interaction',
    service_name: serviceName,
    price_range: priceRange,
  });
};

// Form Tracking
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    form_name: formName,
  });

  pushToDataLayer({
    event: 'form_started',
    form_name: formName,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });

  pushToDataLayer({
    event: 'form_submitted',
    form_name: formName,
  });
};

export const trackFormError = (formName: string, errorMessage: string) => {
  trackEvent('form_error', {
    form_name: formName,
    error_message: errorMessage,
  });

  pushToDataLayer({
    event: 'form_error',
    form_name: formName,
    error_message: errorMessage,
  });
};

// Navigation Tracking
export const trackNavigation = (linkText: string, destination: string) => {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination: destination,
  });

  pushToDataLayer({
    event: 'navigation',
    link_text: linkText,
    destination: destination,
  });
};

// Download Tracking (for lead magnets like "2025 AI Playbook")
export const trackDownload = (assetName: string, assetType: string) => {
  trackEvent('download', {
    asset_name: assetName,
    asset_type: assetType,
  });

  pushToDataLayer({
    event: 'asset_download',
    asset_name: assetName,
    asset_type: assetType,
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    percent_scrolled: percentage,
  });

  pushToDataLayer({
    event: 'scroll',
    percent_scrolled: percentage,
  });
};

// Video/Demo Interaction
export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'complete',
  videoName: string
) => {
  trackEvent('video_interaction', {
    video_action: action,
    video_name: videoName,
  });

  pushToDataLayer({
    event: 'video_interaction',
    video_action: action,
    video_name: videoName,
  });
};

// Outbound Link Tracking
export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('outbound_link', {
    link_url: url,
    link_text: linkText,
  });

  pushToDataLayer({
    event: 'outbound_click',
    link_url: url,
    link_text: linkText,
  });
};

// Session Quality Indicators
export const trackEngagement = (engagementType: string, value?: number) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    engagement_value: value,
  });

  pushToDataLayer({
    event: 'engagement',
    engagement_type: engagementType,
    engagement_value: value,
  });
};

// Conversion Tracking (for attribution model)
export const trackConversion = (
  conversionType: string,
  conversionValue?: number
) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: conversionValue,
  });

  pushToDataLayer({
    event: 'conversion',
    conversion_type: conversionType,
    value: conversionValue,
  });
};
