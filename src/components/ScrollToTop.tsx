import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the page to the top when the route changes
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // For regular scroll of the window
    window.scrollTo(0, 0);
    
    // For layouts that use a main element with overflow
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop; 