// Simple horizontal scrolling for testimonials without blocking vertical scroll
console.log('Simple horizontal scrolling loaded');

// Wait until the document is fully loaded
window.addEventListener('load', function() {
    // Get the testimonials elements
    const testimonialsSection = document.querySelector('.testimonials-section');
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    
    if (!testimonialsSection || !testimonialsContainer) {
        console.error('Testimonials section or container not found');
        return;
    }
    
    console.log('Found testimonials section and container');
    
    // Reset any existing styles that might interfere
    testimonialsContainer.style.scrollSnapType = '';
    testimonialsContainer.style.display = '';
    
    // Configure the container for horizontal scrolling
    testimonialsContainer.style.overflowX = 'auto';
    testimonialsContainer.style.overflowY = 'hidden';
    testimonialsContainer.style.WebkitOverflowScrolling = 'touch'; // For iOS
    testimonialsContainer.style.paddingLeft = '2%';  // Reduced left padding
    testimonialsContainer.style.paddingRight = '2%'; // Reduced right padding
    
    // Add margin to first and last testimonial items
    const testimonialItems = testimonialsContainer.querySelectorAll('.testimonial');
    if (testimonialItems.length > 0) {
        // Add margin to first item
        testimonialItems[0].style.marginLeft = '10px';
        
        // Add margin to last item
        testimonialItems[testimonialItems.length - 1].style.marginRight = '10px';
    }
    
    // Remove any existing indicators
    let lockIndicator = document.querySelector('.scroll-lock-indicator');
    if (lockIndicator) {
        lockIndicator.remove();
    }
    
    // Simple wheel event handler - only redirect wheel events when cursor is directly over testimonials
    function handleWheel(e) {
        // Check if mouse is directly over the testimonials container
        const rect = testimonialsContainer.getBoundingClientRect();
        const isMouseOver = 
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
        
        if (!isMouseOver) {
            return; // Allow normal vertical scrolling
        }
        
        // Detect if we're at the edge with a reasonable margin
        const currentScroll = testimonialsContainer.scrollLeft;
        const maxScroll = testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;
        const edgeMargin = 60; // Increased edge margin for smoother transition
        
        const atStart = currentScroll < edgeMargin;
        const atEnd = maxScroll - currentScroll < edgeMargin;
        
        // Only intercept vertical scrolling if we're not at the edges
        // or if we're at start and scrolling right, or at end and scrolling left
        if ((!atStart && !atEnd) || 
            (atStart && e.deltaY > 0) || 
            (atEnd && e.deltaY < 0)) {
            e.preventDefault();
            testimonialsContainer.scrollLeft += e.deltaY * 1.5; // Smoother scrolling speed
        }
        // In all other cases, allow normal vertical scrolling
    }
    
    // Add the wheel event listener directly to the container, nowhere else
    testimonialsContainer.addEventListener('wheel', handleWheel, { passive: false });
}); 