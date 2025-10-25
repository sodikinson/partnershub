// Structured Data utility for Partners Hub Indonesia
// Based on Schema.org standards for better search engine understanding

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Partners Hub Indonesia",
  "alternateName": "PHI",
  "url": "https://partnershub.co",
  "logo": "https://partnershub.co/images/logo.png",
  "image": "https://partnershub.co/images/thumbnailphi.png",
  "description": "Professional business solutions provider in Indonesia offering comprehensive services including Business Permit, Legal Services, Tax & Accounting, Business Advisory, HR Management, M&A, and Feasibility Studies.",
  "foundingDate": "2020",
  "legalName": "Partners Hub Indonesia",
  "slogan": "Your Trusted Business Partner in Indonesia",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Sudirman Kav. 52-53",
    "addressLocality": "Jakarta Selatan",
    "addressRegion": "DKI Jakarta",
    "postalCode": "12190",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.2088,
    "longitude": 106.8456
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+62-811-1840-070",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"],
      "areaServed": "ID"
    },
    {
      "@type": "ContactPoint",
      "email": "info@partnershub.co",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"]
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/partners-hub-indonesia",
    "https://www.instagram.com/partnershub.co",
    "https://www.facebook.com/partnershub.co"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "knowsAbout": [
    "Business Permits",
    "Legal Services",
    "Tax Consulting",
    "Accounting Services",
    "Business Advisory",
    "HR Management",
    "Mergers and Acquisitions",
    "Feasibility Studies",
    "Corporate Law",
    "Investment Advisory"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Permit Services",
          "description": "Complete business licensing and permit assistance for Indonesian market entry"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Legal Services",
          "description": "Comprehensive legal support including contract drafting, compliance, and corporate law"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tax & Accounting",
          "description": "Professional tax planning, accounting services, and financial compliance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Advisory",
          "description": "Strategic business consulting and market entry advisory services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HR Management",
          "description": "Human resources management, recruitment, and employee relations services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "M&A Services",
          "description": "Mergers and acquisitions advisory, due diligence, and transaction support"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Feasibility Studies",
          "description": "Comprehensive market research and business feasibility analysis"
        }
      }
    ]
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Partners Hub Indonesia",
  "url": "https://partnershub.co",
  "description": "Professional business solutions provider in Indonesia",
  "publisher": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://partnershub.co/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia",
    "url": "https://partnershub.co"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "serviceType": service.type,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": service.priceRange || "Contact for pricing"
  }
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Partners Hub Indonesia",
  "description": "Get in touch with Partners Hub Indonesia for professional business solutions",
  "url": "https://partnershub.co/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-811-1840-070",
      "email": "info@partnershub.co",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"]
    }
  }
});

export const generateAboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Partners Hub Indonesia",
  "description": "Learn about Partners Hub Indonesia, your trusted business partner for comprehensive solutions in Indonesia",
  "url": "https://partnershub.co/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia",
    "description": "Professional business solutions provider established to help businesses navigate the Indonesian market with comprehensive services including legal, tax, accounting, and business advisory services."
  }
});

// Combined schema for homepage
export const generateHomepageSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    {
      "@type": "WebPage",
      "name": "Partners Hub Indonesia - Professional Business Solutions",
      "description": "Your trusted partner for business permits, legal services, tax & accounting, and business advisory in Indonesia",
      "url": "https://partnershub.co",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Partners Hub Indonesia",
        "url": "https://partnershub.co"
      },
      "about": {
        "@type": "Organization",
        "name": "Partners Hub Indonesia"
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Partners Hub Indonesia"
      }
    }
  ]
});