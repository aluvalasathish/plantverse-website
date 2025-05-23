/**
 * Scrolls the page to the top
 * Can be used in components, event handlers, or anywhere else
 */
export const scrollToTop = (): void => {
  // For regular scroll of the window
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
  
  // For layouts that use a main element with overflow
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

/**
 * Scrolls to a specific element on the page
 * @param elementId The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Scrolls to a specific section within the main content
 * @param sectionClassName The class name of the section to scroll to
 */
export const scrollToSection = (sectionClassName: string): void => {
  const section = document.querySelector(`.${sectionClassName}`);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}; 