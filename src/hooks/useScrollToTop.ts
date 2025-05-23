import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';

/**
 * Custom hook that scrolls to the top of the page
 * Can be used in pages or components that need to scroll to top on mount or when a dependency changes
 * 
 * @param dependencies - Optional array of dependencies that will trigger a scroll to top when changed
 */
export const useScrollToTop = (dependencies: React.DependencyList = []) => {
  const { pathname } = useLocation();
  
  // Scroll to top when pathname changes or any provided dependencies change
  useEffect(() => {
    scrollToTop();
  }, [pathname, ...dependencies]);
  
  // Also provide a manual scroll function that can be called from event handlers
  return {
    scrollToTop
  };
};

export default useScrollToTop; 