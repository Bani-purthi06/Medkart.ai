import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselFeature {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface FeatureCarouselProps {
  features: CarouselFeature[];
  title?: string;
  autoRotate?: boolean;
}

export function FeatureCarousel({ features, title, autoRotate = true }: FeatureCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length, autoRotate]);

  const goToSlide = (index: number) => {
    setCurrent(index % features.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % features.length);
  };

  if (features.length === 0) return null;

  const feature = features[current];

  return (
    <div className="w-full space-y-6">
      {/* Carousel Container */}
      <div className="relative">
        {/* Slide */}
        <div className="space-y-4 text-center min-h-[280px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">{feature.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-ink dark:text-white">{feature.label}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 px-2">{feature.description}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute -left-12 top-1/3 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-600 dark:text-orange-400 transition-colors hidden lg:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-12 top-1/3 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-600 dark:text-orange-400 transition-colors hidden lg:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? "bg-orange-500 w-8" : "bg-orange-500/30 w-2 hover:bg-orange-500/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
