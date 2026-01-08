// Navbar mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  if (navbarBurgers.length > 0) {
    navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarMenu = document.getElementById('navbarMenu');
          const navbarBurger = document.querySelector('.navbar-burger');
          if (navbarMenu.classList.contains('is-active')) {
            navbarMenu.classList.remove('is-active');
            navbarBurger.classList.remove('is-active');
          }
        }
      }
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      subject: contactForm.subject.value.trim(),
      message: contactForm.message.value.trim()
    };

    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      showFormResponse('Please fill in all required fields.', 'is-danger');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormResponse('Please enter a valid email address.', 'is-danger');
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.classList.add('is-loading');
    submitButton.disabled = true;
    hideFormResponse();

    try {
      // Send to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        showFormResponse(data.message || 'Message sent successfully! I\'ll get back to you soon.', 'is-success');
        contactForm.reset();
        
        // Scroll to response
        formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        showFormResponse(data.message || 'Something went wrong. Please try again.', 'is-danger');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showFormResponse('Unable to send message. Please try again or email me directly.', 'is-danger');
    } finally {
      // Remove loading state
      submitButton.classList.remove('is-loading');
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });

  // Helper function to show form response
  function showFormResponse(message, type) {
    formResponse.className = `notification ${type}`;
    formResponse.textContent = message;
    formResponse.classList.remove('is-hidden');
  }

  // Helper function to hide form response
  function hideFormResponse() {
    formResponse.classList.add('is-hidden');
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.experience-card, .box, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add active class to current section in navbar
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.navbar-item').forEach(item => {
          item.classList.remove('is-active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('is-active');
          }
        });
      }
    });
  });

  // Animate skill progress bars when in view
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress');
        progressBars.forEach(bar => {
          const value = bar.getAttribute('value');
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = '100%';
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
  });

  // Add hover effect to cards
  document.querySelectorAll('.experience-card, .box').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  console.log('🚀 Logan Cooper Resume Website - Ready!');
});

// Prevent form resubmission on page reload
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
