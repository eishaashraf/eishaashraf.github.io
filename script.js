const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// Project screenshot galleries. Images are served from the projects' public GitHub repositories.
const projectGalleries = {
  'OncoAssist AI': [
    ['https://raw.githubusercontent.com/eishaashraf/OncoAssist-AI/main/screenshots/01_home.png', 'Main interface'],
    ['https://raw.githubusercontent.com/eishaashraf/OncoAssist-AI/main/screenshots/02_prediction.png', 'Risk prediction'],
    ['https://raw.githubusercontent.com/eishaashraf/OncoAssist-AI/main/screenshots/03_shap.png', 'SHAP explanation'],
    ['https://raw.githubusercontent.com/eishaashraf/OncoAssist-AI/main/screenshots/04_history.png', 'Prediction history'],
    ['https://raw.githubusercontent.com/eishaashraf/OncoAssist-AI/main/screenshots/05_report.png', 'PDF report']
  ],
  'AI Health Assistant': [
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/home.png.png', 'Home interface'],
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/bmi.png.png', 'BMI calculator'],
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/symptoms.png.png', 'AI symptom checker'],
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/imaging.png.png', 'Medical imaging guide'],
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/lifestyle.png.png', 'Lifestyle support'],
    ['https://raw.githubusercontent.com/eishaashraf/AI-Health-Assistant/main/screenshots/firstaid.png.png', 'First-aid guidance']
  ]
};

Object.entries(projectGalleries).forEach(([title, images]) => {
  const card = [...document.querySelectorAll('.project-card')].find(el => el.querySelector('h3')?.textContent.trim() === title);
  if (!card || card.querySelector('.project-gallery')) return;
  const gallery = document.createElement('div');
  gallery.className = 'project-gallery';
  images.forEach(([src, alt]) => {
    const item = document.createElement('a');
    item.href = src;
    item.target = '_blank';
    item.rel = 'noopener';
    item.className = 'project-gallery-item';
    item.innerHTML = `<img src="${src}" alt="${title} — ${alt}" loading="lazy"><span>${alt}</span>`;
    gallery.appendChild(item);
  });
  const tags = card.querySelector('.tags');
  card.insertBefore(gallery, tags || null);
});

// Reveal cards gently as they enter the viewport.
const revealItems = document.querySelectorAll('.project-card, .interest-grid article, .skills-grid div, .timeline div, .certificate-placeholder');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => revealObserver.observe(item));

// Update the footer year automatically.
const year = document.querySelector('footer p');
if (year) year.textContent = `© ${new Date().getFullYear()} Eisha Ashraf · Built with curiosity, physics & code.`;

// Gallery styling is injected here so the existing portfolio CSS does not need to be changed.
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
.project-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 0 4px}
.project-gallery-item{position:relative;display:block;overflow:hidden;border:1px solid var(--line);border-radius:14px;background:#f7f9fc;text-decoration:none;min-height:105px}
.project-gallery-item img{display:block;width:100%;height:105px;object-fit:cover;transition:transform .25s ease}
.project-gallery-item span{position:absolute;left:8px;bottom:8px;padding:4px 7px;border-radius:8px;background:rgba(19,34,56,.86);color:#fff;font-size:10px;font-weight:600;line-height:1.2}
.project-gallery-item:hover img{transform:scale(1.04)}
@media(max-width:520px){.project-gallery{grid-template-columns:1fr}.project-gallery-item img{height:150px}}
`;
document.head.appendChild(galleryStyle);
