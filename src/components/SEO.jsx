import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({ 
    title, 
    description, 
    keywords, 
    image, 
    type = "website",
    author = "Partners Hub Indonesia",
    publishedTime,
    modifiedTime,
    article = false,
    noindex = false,
    structuredData,
    canonicalUrl
}) => {
    const location = useLocation();
    const siteUrl = "https://partnershub.co";
    const currentUrl = `${siteUrl}${location.pathname}`;
    
    // Use custom canonical URL if provided, otherwise use current URL
    const finalCanonicalUrl = canonicalUrl || currentUrl;
    
    // Default image if none provided
    const defaultImage = `${siteUrl}/images/thumbnailphi.png`;
    const seoImage = image ? `${siteUrl}${image}` : defaultImage;
    
    // Enhanced title with site name
    const fullTitle = title.includes("Partners Hub") ? title : `${title} | Partners Hub Indonesia`;
    
    // Default structured data for organization
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Partners Hub Indonesia",
        "url": siteUrl,
        "logo": `${siteUrl}/images/logo.png`,
        "description": "Professional business solutions provider in Indonesia offering Business Permit, Legal Services, Tax & Accounting, Business Advisory, HR Management, M&A, and Feasibility Studies.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "ID",
            "addressLocality": "Jakarta"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-811-1840-070",
            "contactType": "customer service",
            "availableLanguage": ["Indonesian", "English"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/partners-hub-indonesia",
            "https://www.instagram.com/partnershub.co"
        ]
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
            <meta name="language" content="en-US" />
            <meta name="revisit-after" content="7 days" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            
            {/* Viewport and Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="theme-color" content="#2563eb" />
            
            {/* Open Graph Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Partners Hub Indonesia" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="id_ID" />
            
            {/* Article specific Open Graph tags */}
            {article && (
                <>
                    <meta property="article:author" content={author} />
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    <meta property="article:section" content="Business" />
                    <meta property="article:tag" content={keywords} />
                </>
            )}
            
            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@partnershub_co" />
            <meta name="twitter:creator" content="@partnershub_co" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:image:alt" content={title} />
            
            {/* Additional Meta Tags for SEO */}
            <meta name="geo.region" content="ID" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content="-6.2088;106.8456" />
            <meta name="ICBM" content="-6.2088, 106.8456" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={finalCanonicalUrl} />
            
            {/* Alternative URLs for different languages/regions */}
            <link rel="alternate" hrefLang="en" href={`${siteUrl}${location.pathname}`} />
            <link rel="alternate" hrefLang="id" href={`${siteUrl}/id${location.pathname}`} />
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${location.pathname}`} />
            
            {/* Favicon and Icons */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* Preconnect for Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://connect.facebook.net" />
            
            {/* DNS Prefetch */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//connect.facebook.net" />
            
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData || defaultStructuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
