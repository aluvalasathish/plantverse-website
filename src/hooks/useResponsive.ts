import { useState, useEffect } from 'react';

// Breakpoint values in pixels
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type Breakpoint = keyof typeof breakpoints;

export interface ResponsiveState {
  isMobile: boolean;     // < sm
  isTablet: boolean;     // >= sm && < lg
  isDesktop: boolean;    // >= lg
  isXs: boolean;         // < sm
  isSm: boolean;         // >= sm && < md
  isMd: boolean;         // >= md && < lg
  isLg: boolean;         // >= lg && < xl
  isXl: boolean;         // >= xl && < 2xl
  is2xl: boolean;        // >= 2xl
  below: (breakpoint: Breakpoint) => boolean;
  above: (breakpoint: Breakpoint) => boolean;
  between: (min: Breakpoint, max: Breakpoint) => boolean;
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveState {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const { width, height } = windowSize;

  // Helper functions
  const below = (breakpoint: Breakpoint) => width < breakpoints[breakpoint];
  const above = (breakpoint: Breakpoint) => width >= breakpoints[breakpoint];
  const between = (min: Breakpoint, max: Breakpoint) => 
    width >= breakpoints[min] && width < breakpoints[max];

  return {
    isMobile: below('sm'),
    isTablet: between('sm', 'lg'),
    isDesktop: above('lg'),
    isXs: below('sm'),
    isSm: between('sm', 'md'),
    isMd: between('md', 'lg'),
    isLg: between('lg', 'xl'),
    isXl: between('xl', '2xl'),
    is2xl: above('2xl'),
    below,
    above,
    between,
    width,
    height,
  };
}

export default useResponsive; 