// 3D Card Tilt Effect
document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
    this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  card.addEventListener('mouseenter', function() {
    this.style.transition = 'none';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transition = 'transform 0.5s ease';
    this.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
});

// 3D Parallax Effect for Hero Image
const heroImage = document.querySelector('.image-container');
if (heroImage) {
  document.addEventListener('mousemove', function(e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    heroImage.style.transform = `translateY(${yAxis}px) translateX(${xAxis}px)`;
  });
}

// Floating Tech Icons Animation
const techIcons = document.querySelectorAll('.tech-icons .icon');
if (techIcons.length > 0) {
  techIcons.forEach((icon, index) => {
    gsap.to(icon, {
      y: 15,
      duration: 2 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

// Background Particle Effect
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 60;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `rgba(108, 99, 255, ${Math.random() * 0.5 + 0.1})`
    });
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${1 - distance / 150})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animate();
}

// Initialize particles after page load
window.addEventListener('load', initParticles);