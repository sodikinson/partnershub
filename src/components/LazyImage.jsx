import { useState, useEffect } from "react";

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  sizes = "100vw",
  priority = false,
  placeholder = "/placeholder.jpg",
  webpSrc = null,
  avifSrc = null
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP and AVIF sources if not provided
  const generateOptimizedSrc = (originalSrc, format) => {
    if (!originalSrc) return null;
    const extension = originalSrc.split('.').pop();
    return originalSrc.replace(`.${extension}`, `.${format}`);
  };

  const webpSource = webpSrc || generateOptimizedSrc(src, 'webp');
  const avifSource = avifSrc || generateOptimizedSrc(src, 'avif');

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (priority) {
      setImageSrc(src);
      return;
    }

    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!didCancel && entry.isIntersecting) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { threshold: 0.01, rootMargin: "75%" }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef, priority, placeholder]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(placeholder);
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
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
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
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    />
  );
};

export default LazyImage;
