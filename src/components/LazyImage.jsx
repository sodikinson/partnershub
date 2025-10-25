import { useState, useEffect } from "react";

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  sizes = "100vw",
  priority = false,
  placeholder = "/placeholder.svg",
  webpSrc = null,
  avifSrc = null
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  // Generate WebP and AVIF sources if not provided
  const generateOptimizedSrc = (originalSrc, format) => {
    if (!originalSrc) return null;
    // Only generate optimized sources if explicitly requested
    // Don't auto-generate to avoid 404 errors
    return null;
  };

  const webpSource = webpSrc; // Only use if explicitly provided
  const avifSource = avifSrc; // Only use if explicitly provided

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (priority) {
      setImageSrc(src);
      setIsInView(true);
      return;
    }

    if (imageRef && !isInView) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!didCancel && entry.isIntersecting) {
                setIsInView(true);
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { threshold: 0.01, rootMargin: "75%" }
        );
        observer.observe(imageRef);
      } else {
        setIsInView(true);
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef, priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Don't set back to placeholder to avoid blinking
    // Keep the current src and let CSS handle the error state
  };

  // If modern formats are available, use picture element
  if ((avifSource || webpSource) && imageSrc !== placeholder) {
    return (
      <picture ref={setImageRef} className={className}>
        {avifSource && (
          <source srcSet={avifSource} type="image/avif" sizes={sizes} />
        )}
        {webpSource && (
          <source srcSet={webpSource} type="image/webp" sizes={sizes} />
        )}
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${
            imageSrc === placeholder 
              ? 'opacity-60' 
              : isLoaded 
                ? 'opacity-100' 
                : 'opacity-0'
          } transition-opacity duration-500 ease-in-out`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            backgroundColor: imageSrc === placeholder ? '#f3f4f6' : 'transparent',
          }}
        />
      </picture>
    );
  }

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${
        imageSrc === placeholder 
          ? 'opacity-60' 
          : isLoaded 
            ? 'opacity-100' 
            : 'opacity-0'
      } transition-opacity duration-500 ease-in-out`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        backgroundColor: imageSrc === placeholder ? '#f3f4f6' : 'transparent',
      }}
    />
  );
};

export default LazyImage;
