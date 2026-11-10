/**
 * Kishor Kumar R - Portfolio JavaScript
 * Interactive controls, animations, theme toggling, project filtering & modal system
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFilters();
  initProjectModals();
  initCertificateLightbox();
  initCopyActions();
  initContactForm();
  initStatCounters();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('kishor_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kishor_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.className = 'fas fa-moon';
  } else {
    themeIcon.className = 'fas fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. Responsive Navigation & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggleBtn');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile nav when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (activeLink) activeLink.classList.add('active');
      } else {
        if (activeLink) activeLink.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Project Categorization & Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectDetailsData = {
  'exam-system': {
    title: 'Online Examination & Assessment System',
    subtitle: 'Java, Spring Boot, MySQL, HTML5/CSS3/JavaScript',
    description: 'An enterprise-grade online evaluation platform engineered to administer computer-based tests, timed questionnaires, automated scoring, and comprehensive candidate analytics with zero paper waste.',
    features: [
      'Timed assessment engine with automatic submission on timer expiry.',
      'Automated grading pipeline with instant score generation and statistical feedback.',
      'Role-based access control (RBAC) separating student and faculty administration dashboards.',
      'Relational database architecture in MySQL for storing questions, options, test sessions, and results.',
      'Robust input validation and protection against concurrent multiple submissions.'
    ],
    github: 'https://github.com/Kishor-1825',
    category: 'Full Stack / Enterprise Java'
  },
  'file-integrity': {
    title: 'File Integrity Monitoring System (FIM)',
    subtitle: 'Java, SHA-256 Cryptography, File I/O, JDBC, MySQL',
    description: 'A cybersecurity utility designed to ensure system integrity by detecting unauthorized alterations, corruptions, deletions, or new file injections across monitored directories using SHA-256 cryptographic hashing.',
    features: [
      'High-throughput SHA-256 hash generation for files of arbitrary sizes.',
      'Automated recursive directory traversal and baseline checksum calculation.',
      'Real-time delta comparison engine flagging modified, added, and deleted files.',
      'Persistent audit trail logging changes to a MySQL database via JDBC.',
      'Tamper-evident logs providing timestamps and file metadata for forensics.'
    ],
    github: 'https://github.com/Kishor-1825',
    category: 'Systems & Security / Java'
  },
  'mini-db': {
    title: 'Mini Database Engine from Scratch',
    subtitle: 'Python, B+ Tree & Hash Indexing, Storage Engine, Web UI',
    description: 'A custom relational database storage and indexing engine built from scratch in pure Python to demonstrate how internal database primitives operate and why index structures outperform full table scans by orders of magnitude.',
    features: [
      'In-Memory Row Storage Layer with persistent row IDs and table management.',
      'Hash Index implementation delivering O(1) instantaneous equality lookups.',
      'B+ Tree Index implementation supporting O(log N) point queries and fast linked range scans.',
      'SQL-like query parser and execution planner supporting INSERT, SELECT, DELETE, and EXPLAIN.',
      'Interactive benchmark dashboard displaying latency comparisons between index scans and table scans.'
    ],
    github: 'https://github.com/Kishor-1825',
    category: 'Core Database Systems'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const viewDetailBtns = document.querySelectorAll('[data-project-target]');

  if (!modalOverlay) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetKey = btn.getAttribute('data-project-target');
      const data = projectDetailsData[targetKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.description;
      
      modalFeaturesList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeaturesList.appendChild(li);
      });

      if (modalGithubLink) {
        modalGithubLink.href = data.github;
      }

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. One-Click Copy Actions
   -------------------------------------------------------------------------- */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check" style="color: var(--success);"></i>';
        
        // Show tooltip or notification
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Processing
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Compose mailto link so user's client opens directly with the message
    const mailtoUrl = `mailto:kishorkumar28546@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

    if (statusMsg) {
      statusMsg.className = 'form-status success';
      statusMsg.textContent = 'Opening your email client to deliver the message directly to Kishor...';
      statusMsg.style.display = 'block';
    }

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   7. Stat Counters Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const countUp = () => {
    statNumbers.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = isDecimal ? target.toFixed(2) : Math.floor(target) + '+';
          clearInterval(timer);
        } else {
          el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + '+';
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        countUp();
        started = true;
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   8. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. Certificate Lightbox & Preview System
   -------------------------------------------------------------------------- */
const certificateData = {
  'oracle-java': {
    title: 'Oracle Certified Professional: Java SE 11 Developer',
    issuer: 'Oracle University (Oracle Corporation)',
    date: 'November 19, 2024',
    certId: '314721541OCPJSE11',
    image: 'assets/certificates/Oracle_Java_SE11_preview.jpg',
    pdf: 'assets/certificates/Oracle_Java_SE11_Developer_Kishor.pdf',
    downloadName: 'Oracle_Java_SE11_Developer_Kishor.pdf'
  },
  'oracle-dbms': {
    title: 'Oracle Database SQL Certified Specialist',
    issuer: 'Oracle University (Oracle Corporation)',
    date: 'October 10, 2024',
    certId: '314721541OCSSQL12C',
    image: 'assets/certificates/Oracle_SQL_preview.jpg',
    pdf: 'assets/certificates/Oracle_Database_SQL_Specialist_Kishor.pdf',
    downloadName: 'Oracle_Database_SQL_Specialist_Kishor.pdf'
  },
  'cybernaut-fsd': {
    title: "Cybernaut's Full Stack Web Development Course",
    issuer: 'Cybernaut Edu-Tech LLP',
    date: 'August 18, 2024',
    certId: 'CNFSD0000006',
    image: 'assets/certificates/Cybernaut_preview.jpg',
    pdf: 'assets/certificates/Cybernaut_FullStack_Certificate_Kishor.pdf',
    downloadName: 'Cybernaut_FullStack_Certificate_Kishor.pdf'
  },
  'duhzine-internship': {
    title: 'Fullstack Developer Intern - Certificate of Achievement',
    issuer: 'Duhzine IT Solutions Pvt Ltd (MSME)',
    date: '20 Aug 2025 - 20 Nov 2025 (Grade: A)',
    certId: 'Director & CEO Santhosh Kumar Ramesh',
    image: 'assets/certificates/Duhzine_IT_Internship_Certificate.jpg',
    pdf: 'assets/certificates/Duhzine_IT_Internship_Certificate.jpg',
    downloadName: 'Duhzine_IT_Internship_Certificate.jpg'
  },
  'nlc-internship': {
    title: 'Industrial Training Certificate - NLC India Limited',
    issuer: 'NLC India Limited (Navratna PSU, Govt. of India)',
    date: '04 Aug 2025 - 27 Sep 2025',
    certId: 'L&D Centre Block-20 Neyveli (GM Certified)',
    image: 'assets/certificates/NLC_India_Internship_Certificate.jpg',
    pdf: 'assets/certificates/NLC_India_Internship_Certificate.jpg',
    downloadName: 'NLC_India_Internship_Certificate.jpg'
  }
};

function initCertificateLightbox() {
  const modal = document.getElementById('certLightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const triggerBtns = document.querySelectorAll('[data-cert-target]');

  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert-target');
      openCertificateLightbox(certKey);
    });
  });

  const closeLightbox = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

function openCertificateLightbox(certKey) {
  const data = certificateData[certKey];
  if (!data) return;

  const modal = document.getElementById('certLightboxModal');
  const title = document.getElementById('lightboxTitle');
  const img = document.getElementById('lightboxImg');
  const downloadLink = document.getElementById('lightboxDownloadLink');
  const meta = document.getElementById('lightboxMeta');

  if (title) title.textContent = data.title;
  if (img) {
    img.onerror = () => {
      if (!img.src.includes('nlc_certificate.jpg') && certKey === 'nlc-internship') {
        img.src = 'assets/certificates/nlc_certificate.jpg';
      }
    };
    img.src = data.image;
    img.alt = data.title;
  }
  if (meta) {
    meta.textContent = `${data.issuer} • ${data.date} • ID: ${data.certId}`;
  }
  if (downloadLink) {
    downloadLink.href = data.pdf;
    downloadLink.download = data.downloadName;
  }

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
window.openCertificateLightbox = openCertificateLightbox;
