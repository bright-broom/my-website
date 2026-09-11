import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

// Fades content in when it scrolls into view. Content already on screen at load is never hidden.
export function Reveal({ as: Tag = 'div', delay = 0, className, style, ...props }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('transition duration-700 ease-out-expo', hidden && 'translate-y-4 opacity-0', className)}
      style={{ transitionDelay: hidden ? '0ms' : `${delay}ms`, ...style }}
      {...props}
    />
  );
}
