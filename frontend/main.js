/* samithcloudtech | main.js */

// ── Mobile nav toggle ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Flash auto-dismiss ────────────────────────────────────────
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .5s'; }, 4000);
});

// ── Entrance animations ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.cat-card, .tech-category-block, .detail-block, .bio-card, .stat'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Inject fade-up CSS once
const style = document.createElement('style');
style.textContent = `
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; }
  .fade-up.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);

// ── Bio comment section ───────────────────────────────────────
const commentBtn   = document.getElementById('commentBtn');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');

// Load persisted comments
function loadComments() {
  if (!commentsList) return;
  try {
    const saved = JSON.parse(localStorage.getItem('bio_comments') || '[]');
    saved.forEach(renderComment);
  } catch {}
}
function renderComment(text) {
  const div = document.createElement('div');
  div.className = 'comment-entry';
  div.textContent = text;
  commentsList.prepend(div);
}
function saveComment(text) {
  try {
    const saved = JSON.parse(localStorage.getItem('bio_comments') || '[]');
    saved.unshift(text);
    localStorage.setItem('bio_comments', JSON.stringify(saved.slice(0, 20)));
  } catch {}
}

if (commentBtn && commentInput && commentsList) {
  loadComments();
  commentBtn.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if (!text) return;
    renderComment(text);
    saveComment(text);
    commentInput.value = '';
  });
  commentInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) commentBtn.click();
  });
}
