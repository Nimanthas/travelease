"use client";

import { useEffect, useState } from 'react';

export default function RangeSlider(props: any) {
  const [SliderComponent, setSliderComponent] = useState<any>(null);

  useEffect(() => {
    import('rc-slider').then((mod) => {
      setSliderComponent(() => mod.default);
    });
  }, []);

  if (!SliderComponent) {
    return <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />;
  }

  return <SliderComponent {...props} />;
}
