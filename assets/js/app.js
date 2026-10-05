const STORAGE_KEYS = {
  cart: 'cafeteriaCart',
  user: 'cafeteriaUser'
};

function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const toggleButton = nav.querySelector('.navbar-toggle');
  const menu = nav.querySelector('.navbar-links');

  if (toggleButton && menu) {
    toggleButton.addEventListener('click', () => nav.classList.toggle('open'));
  }
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.user));
  } catch {
    return null;
  }
}

function renderUserState() {
  const user = getCurrentUser();
  const authLinks = document.querySelectorAll('[data-auth-name]');
  const adminLinks = document.querySelectorAll('[data-admin-link]');

  authLinks.forEach((element) => {
    element.textContent = user ? user.name : 'Entrar';
  });

  adminLinks.forEach((element) => {
    element.style.display = user && user.role === 'gerente' ? 'inline-block' : 'none';
  });
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  window.location.href = 'login.html';
}

function initAuthPanel() {
  const user = getCurrentUser();
  const logoutBtn = document.querySelector('.logout-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  if (user && user.role === 'gerente') {
    return;
  }

  if (window.location.pathname.endsWith('administrativo.html')) {
    window.location.href = 'login.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderUserState();
  initAuthPanel();

  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
