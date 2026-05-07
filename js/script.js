document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('scrollspyNav');
  const navHeight = navbar ? navbar.offsetHeight : 0;
  const revealSections = document.querySelectorAll('.reveal-section');

  if (revealSections.length) {
    const observer = new IntersectionObserver(function (entries, sectionObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });

      const expandedMenu = document.querySelector('.navbar-collapse.show');
      if (expandedMenu && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(expandedMenu).hide();
      }
    });
  });
});
