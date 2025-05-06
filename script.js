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

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');
    
    // Validate name
    nameInput.addEventListener('input', function() {
      if (nameInput.validity.valid) {
        nameError.textContent = '';
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
      } else {
        validateName();
      }
    });
    
    // Validate email
    emailInput.addEventListener('input', function() {
      if (emailInput.validity.valid) {
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
      } else {
        validateEmail();
      }
    });
    
    // Validate message
    messageInput.addEventListener('input', function() {
      if (messageInput.validity.valid) {
        messageError.textContent = '';
        messageInput.classList.remove('invalid');
        messageInput.classList.add('valid');
      } else {
        validateMessage();
      }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate all fields before submission
      if (!nameInput.validity.valid) {
        validateName();
        isValid = false;
      }
      
      if (!emailInput.validity.valid) {
        validateEmail();
        isValid = false;
      }
      
      if (!messageInput.validity.valid) {
        validateMessage();
        isValid = false;
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        formStatus.textContent = 'Thanks! Your message has been sent successfully.';
        formStatus.classList.add('success');
        contactForm.reset();
        
        // Clear validation styles
        nameInput.classList.remove('valid');
        emailInput.classList.remove('valid');
        messageInput.classList.remove('valid');
        
        // Clear status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success');
        }, 5000);
      }
    });
    
    // Validation functions
    function validateName() {
      if (nameInput.validity.valueMissing) {
        nameError.textContent = 'Please enter your name';
      } else if (nameInput.validity.tooShort) {
        nameError.textContent = 'Name must be at least 2 characters';
      } else if (nameInput.validity.tooLong) {
        nameError.textContent = 'Name must not exceed 50 characters';
      }
      nameInput.classList.add('invalid');
      nameInput.classList.remove('valid');
    }
    
    function validateEmail() {
      if (emailInput.validity.valueMissing) {
        emailError.textContent = 'Please enter your email';
      } else if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
        emailError.textContent = 'Please enter a valid email address';
      }
      emailInput.classList.add('invalid');
      emailInput.classList.remove('valid');
    }
    
    function validateMessage() {
      if (messageInput.validity.valueMissing) {
        messageError.textContent = 'Please enter your message';
      } else if (messageInput.validity.tooShort) {
        messageError.textContent = 'Message must be at least 10 characters';
      } else if (messageInput.validity.tooLong) {
        messageError.textContent = 'Message must not exceed 500 characters';
      }
      messageInput.classList.add('invalid');
      messageInput.classList.remove('valid');
    }
  }
=

  
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