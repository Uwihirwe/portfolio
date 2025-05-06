document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  
  // Function to toggle mobile menu - making it available globally
  window.toggleMobileMenu = function() {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    
    // Add/remove no-scroll class to body when menu is open/closed
    document.body.classList.toggle('no-scroll');
    
    // Fix for menu disappearing issue
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.style.display = 'block';
    } else {
      // Use setTimeout to delay hiding the menu until after the animation completes
      setTimeout(() => {
        if (mobileMenu.classList.contains('hidden')) {
          mobileMenu.style.display = '';
        }
      }, 300);
    }
  };
  
  // Add click event to menu button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMobileMenu();
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        e.target !== mobileMenuBtn && 
        !mobileMenuBtn.contains(e.target)) {
      toggleMobileMenu();
    }
  });
  
  // Close menu when clicking on mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        toggleMobileMenu();
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  });
  
  // Handle home link special case
  const homeLink = document.querySelector('.nav-link-mobile[href="#"]');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Form submission
  const contactForm = document.getElementById("contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      
      // Here you would typically send the form data to a server
      // For this example, we'll just log it and show an alert
      console.log("Form submitted:", { name, email, message });
      
      // Show success message
      alert("Thank you for your message! I will get back to you soon.");
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      
      // Skip if it's just "#"
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll to the element
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Smooth scrolling function
  function smoothScroll(target, duration = 800) {
    if (target === '#') {
      // Scroll to top for "Home"
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  // Handle all navigation link clicks (both desktop and mobile)
  document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      
      // Close mobile menu if it's a mobile link
      if (this.classList.contains('nav-link-mobile')) {
        toggleMobileMenu();
        // Small delay to allow menu to close before scrolling
        setTimeout(() => {
          smoothScroll(target);
        }, 300);
      } else {
        smoothScroll(target);
      }
    });
  });
  
  // Add scroll handling for CTA and hero buttons too
  document.querySelectorAll('[onclick*="location.href"]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const hrefMatch = this.getAttribute('onclick').match(/location\.href='([^']+)'/);
      if (hrefMatch && hrefMatch[1]) {
        const target = hrefMatch[1];
        
        // If it also has toggleMobileMenu in the onclick, call that function
        if (this.getAttribute('onclick').includes('toggleMobileMenu')) {
          toggleMobileMenu();
          setTimeout(() => {
            smoothScroll(target);
          }, 300);
        } else {
          smoothScroll(target);
        }
      }
    });
    
    // Remove the inline onclick to avoid duplicate actions
    button.removeAttribute('onclick');
  });

  // Handle all "Get in Touch" buttons
  const contactButtons = document.querySelectorAll('.btn[onclick*="#contact"]');
  contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // If the button is in the mobile menu, close it first
      if (this.classList.contains('mobile-cta')) {
        toggleMobileMenu();
        setTimeout(() => {
          smoothScroll('#contact');
        }, 300);
      } else {
        smoothScroll('#contact');
      }
    });
    
    // Remove the inline onclick to prevent duplicate actions
    button.removeAttribute('onclick');
  });
  
  // Handle other buttons with location.href in onclick
  const otherActionButtons = document.querySelectorAll('.btn[onclick*="location.href"]:not([onclick*="#contact"])');
  otherActionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Extract target from onclick attribute
      const onclickValue = this.getAttribute('onclick');
      const targetMatch = onclickValue.match(/location\.href='([^']+)'/);
      
      if (targetMatch && targetMatch[1]) {
        smoothScroll(targetMatch[1]);
      }
    });
    
    // Remove the inline onclick
    button.removeAttribute('onclick');
  });
});