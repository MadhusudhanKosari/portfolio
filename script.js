document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Theme Toggle
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', function() {
    document.documentElement.setAttribute('data-theme', this.checked ? 'dark' : 'light');
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
  });

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeSwitch.checked = true;
    }
  }

  // Mobile Navigation
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Sticky Navigation
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Removed custom cursor effects

  // Typing Animation
  const typingText = document.querySelector('.typing-text');
  const strings = JSON.parse(typingText.getAttribute('data-strings'));
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentString = strings[stringIndex];
    
    if (isDeleting) {
      typingText.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentString.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);

  // Animate Skills Progress Bars
  function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }

  // Initialize skills animation when section is in view
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Skills Radar Chart
  const skillsChart = document.getElementById('skillsRadarChart');
  if (skillsChart) {
    const chart = new Chart(skillsChart, {
      type: 'radar',
      data: {
        labels: ['Python', 'JavaScript', 'React', 'Node.js', 'DSA', 'ML'],
        datasets: [{
          label: 'Skill Level',
          data: [90, 85, 88, 82, 92, 75],
          backgroundColor: 'rgba(108, 99, 255, 0.2)',
          borderColor: 'rgba(108, 99, 255, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(108, 99, 255, 1)',
          pointRadius: 4
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              backdropColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.8)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'var(--text-color)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            tension: 0.1
          }
        }
      }
    });
  }

  // Portfolio Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filterValue === 'all') {
          item.style.display = '';
          item.style.opacity = '1';
        } else if (categories && categories.includes(filterValue)) {
          item.style.display = '';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // Project Modals
  const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
  const projectModals = document.querySelectorAll('.project-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('href');
      const modal = document.querySelector(modalId);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.project-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  projectModals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Section Highlight
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      
      if (pageYOffset >= (sectionTop - navbarHeight - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      console.log({ name, email, subject, message });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      this.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input').value;
      console.log('Newsletter subscription:', email);
      
      alert('Thank you for subscribing to my newsletter!');
      this.reset();
    });
  }

  // Current Year in Footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // About Section Tabs
  const aboutTabBtns = document.querySelectorAll('.tab-btn');
  const aboutTabPanes = document.querySelectorAll('.tab-pane');

  aboutTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      aboutTabBtns.forEach(b => b.classList.remove('active'));
      aboutTabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding pane
      const targetTab = this.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Research Tabs
  const researchTabBtns = document.querySelectorAll('.research-tab-btn');
  const researchTabPanes = document.querySelectorAll('.research-tab-pane');

  researchTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      researchTabBtns.forEach(b => b.classList.remove('active'));
      researchTabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding pane
      const targetTab = this.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Testimonials Slider
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener('click', function() {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });

    testimonialNext.addEventListener('click', function() {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Enhanced Form Validation
  // contactForm already declared above, reusing it
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    function validateField(field) {
      const value = field.value.trim();
      const fieldName = field.name;
      let isValid = true;
      let errorMessage = '';

      // Remove existing error styling
      field.classList.remove('error');
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      // Validation rules
      switch (fieldName) {
        case 'name':
          if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
          }
          break;
        case 'subject':
          if (value.length < 5) {
            isValid = false;
            errorMessage = 'Subject must be at least 5 characters long';
          }
          break;
        case 'message':
          if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
          }
          break;
      }

      if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#ff6584';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
      }

      return isValid;
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        this.classList.add('loading');

        // Simulate form submission
        setTimeout(() => {
          this.classList.remove('loading');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Show success message
          showNotification('Message sent successfully! I will get back to you soon.', 'success');
          this.reset();
        }, 2000);
      } else {
        showNotification('Please fix the errors in the form', 'error');
      }
    });
  }

  // Notification System
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.certification-card, .blog-card, .publication-item, .conference-item, .patent-item').forEach(el => {
    observer.observe(el);
  });

  // Add animation classes
  const style = document.createElement('style');
  style.textContent = `
    .certification-card, .blog-card, .publication-item, .conference-item, .patent-item {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .certification-card.animate-in, .blog-card.animate-in, .publication-item.animate-in, .conference-item.animate-in, .patent-item.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .form-group input.error, .form-group textarea.error {
      border-color: #ff6584;
      box-shadow: 0 0 0 3px rgba(255, 101, 132, 0.1);
    }
  `;
  document.head.appendChild(style);

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Animate hero elements
  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.5
  });

  gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.7
  });

  gsap.from('.hero-role', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.9
  });

  gsap.from('.hero-description', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.1
  });

  gsap.from('.hero-buttons', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.3
  });

  gsap.from('.hero-social', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.5
  });

  gsap.from('.image-container', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 0.8,
    ease: 'back.out(1.7)'
  });

  gsap.from('.icon', {
    duration: 1,
    scale: 0,
    opacity: 0,
    delay: 1.2,
    stagger: 0.2,
    ease: 'elastic.out(1, 0.5)'
  });

  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
    if (section.id !== 'home') {
      gsap.from(section.querySelectorAll('.section-header'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8
      });

      gsap.from(section.querySelectorAll('h3, p, .btn, .about-image, .about-text, .skill-category, .project-item, .achievement-card, .info-item, .form-group'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      });
    }
  });
});