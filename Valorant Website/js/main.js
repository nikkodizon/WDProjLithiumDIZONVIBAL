// -- LOADING SCREEN --
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.style.display = 'none';
      }, 500);
    }, 300);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }
  setupMusic();
});

// -- MUSIC PLAYER --
function setupMusic() {
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  if (audio && musicBtn) {
    musicBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = '❚❚'; // Pause symbol
      } else {
        audio.pause();
        musicBtn.innerHTML = '▶'; // Play symbol
      }
    });
  }
}

// -- POPUP --
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
      modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
  }
});
