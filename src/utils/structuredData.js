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
  "description": "One partner for all your business needs: Legal Permits, Tax Advisory, and Accounting. Modernize your workflow with our in-house custom ERP, HRIS, and App development. Jakarta's trusted consultant for Business Permits, Tax, and Accounting. From PT establishment to custom software (ERP/HRIS), we provide end-to-end business support.",
  "foundingDate": "2020",
  "legalName": "PT. KOLEGA BISNIS INDONESIA",
  "slogan": "Your Trusted Business Partner in Indonesia",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Treasury Tower LT 16 Unit I, District 8 SCBD Lot 28, Jl. Jend. Sudirman Kav 52-53",
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
      "telephone": "+62-878-7379-5212",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"],
      "areaServed": "ID"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+62-21-50300844",
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
    "Tax and Accounting",
    "Tax Consulting",
    "Accounting Services",
    "PT Registration",
    "PMA Registration",
    "Monthly Tax Compliance",
    "Business Advisory",
    "HR Management",
    "Mergers and Acquisitions",
    "Feasibility Studies",
    "Corporate Law",
    "Investment Advisory",
    "Custom Web Development",
    "Apps Development",
    "ERP Systems",
    "HRIS Systems",
    "Digitalize",
    "Software Development"
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
  "description": "One partner for all your business needs: Legal Permits, Tax Advisory, and Accounting. Modernize your workflow with our in-house custom ERP, HRIS, and App development.",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+62-878-7379-5212",
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+62-21-50300844",
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "English"]
      },
      {
        "@type": "ContactPoint",
        "email": "info@partnershub.co",
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "English"]
      }
    ]
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
      "description": "One partner for all your business needs: Legal Permits, Tax Advisory, and Accounting. Modernize your workflow with our in-house custom ERP, HRIS, and App development. Jakarta's trusted consultant for Business Permits, Tax, and Accounting.",
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

// Schema for Our Services page
export const generateOurServicesSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Services - Partners Hub Indonesia",
  "description": "Comprehensive business services including Business Permit & Legal Services, Tax & Accounting, Business Advisory, HR Services, M&A, and Feasibility Studies in Indonesia",
  "url": "https://partnershub.co/ourservices",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Business Permit & Legal Services",
        "description": "Business registration & licensing, Compliance with local regulations, Legal documentation & corporate governance"
      },
      {
        "@type": "Service",
        "name": "Tax & Accounting",
        "description": "Tax Planning, tax compliance, reporting, Tax Lawyer, Financial Statement, Auditing"
      },
      {
        "@type": "Service",
        "name": "Business Advisory & Strategy",
        "description": "Business Process Optimization, Market entry Strategy, Corporate Restructuring"
      },
      {
        "@type": "Service",
        "name": "HR Services",
        "description": "Policies, Compliance, Recruitment, Talent Acquisition, Payroll, and Employee benefits"
      },
      {
        "@type": "Service",
        "name": "Mergers & Acquisitions",
        "description": "Due diligence, valuation, Negotiation, Deal Structuring, Post-merger integration"
      },
      {
        "@type": "Service",
        "name": "Feasibility Study",
        "description": "Market analysis, Research, Final projections, Risk assessment"
      }
    ]
  }
});

// Schema for Team/Clients page
export const generateTeamSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Clients - Partners Hub Indonesia",
  "description": "Meet our diverse portfolio of clients across various industries including Retail, Education, Food & Beverage, Manufacturing, Mining, and more",
  "url": "https://partnershub.co/team"
});

// Schema for Portfolio page
export const generatePortfolioSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Vision for The Future - Partners Hub Indonesia",
  "description": "Our company is committed to becoming a one-stop service provider, offering our clients everything they need in one convenient location",
  "url": "https://partnershub.co/portfolio",
  "mainEntity": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia",
    "description": "Committed to evolving into a super company by expanding offerings to include a wide range of products and services, investing in cutting-edge technology, and recruiting the best talent to deliver the highest levels of quality and efficiency."
  }
});

// Schema for Event page
export const generateEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Events - Partners Hub Indonesia",
  "description": "Stay updated with our latest events, seminars, and business networking opportunities in Indonesia",
  "url": "https://partnershub.co/event"
});

// Schema for Survey page
export const generateSurveySchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Survey - Partners Hub Indonesia",
  "description": "Help us improve our services by sharing your feedback and experience",
  "url": "https://partnershub.co/survey"
});

// Schema for individual service pages
export const generateServicePageSchema = (serviceName, serviceDescription, serviceSlug) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "url": `https://partnershub.co/service/${serviceSlug}`,
  "provider": {
    "@type": "Organization",
    "name": "Partners Hub Indonesia",
    "url": "https://partnershub.co",
    "logo": "https://partnershub.co/images/logo.png"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "serviceType": serviceName,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "Contact for pricing"
  }
});