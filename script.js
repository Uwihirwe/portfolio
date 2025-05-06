// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu functionality
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");
    const mobileNavLinks = document.querySelectorAll(".nav-link-mobile");
    
    // Toggle mobile menu
    function toggleMobileMenu() {
      mobileMenu.classList.toggle("hidden");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    }
    
    // Event listener for menu button
    menuButton.addEventListener("click", toggleMobileMenu);
    
    // Close mobile menu when clicking a nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", toggleMobileMenu);
    });
    
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
  });