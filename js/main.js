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

  // Check login status on page load
  checkUserLogin();
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

  // Initialize Page Specific Logic
  handleSignup();
  handleLogin();
  loadProfile();
  handleEditProfile();
  handleLogout();
  handleProfileButtonInNav(); // Setup generic nav listener if not on profile page logic
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

// -- POPUP (MODAL) --
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

// --- AUTHENTICATION & PROFILE LOGIC ---

// 1. Global Navigation Logic
function checkUserLogin() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navLinks = document.getElementById('nav-links');

  if (navLinks) {
    // Find if we already have a profile/login link to update, or append one
    // We'll search for a link that goes to login.html or profile.html
    let authLink = navLinks.querySelector('a[href="login.html"], a[href="profile.html"]');

    // If it doesn't exist (e.g. on pages that didn't have it hardcoded), we create it
    if (!authLink) {
      const li = document.createElement('li');
      authLink = document.createElement('a');
      li.appendChild(authLink);
      navLinks.appendChild(li);
    }

    if (isLoggedIn) {
      authLink.textContent = 'MY PROFILE';
      authLink.href = 'profile.html';
      // Add active style if on profile page
      if (window.location.pathname.includes('profile.html')) {
        authLink.style.color = '#ff4655';
      } else {
        authLink.style.color = 'inherit';
      }
    } else {
      authLink.textContent = 'LOGIN / JOIN';
      authLink.href = 'login.html';
      if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
        authLink.style.color = '#ff4655';
      } else {
        authLink.style.color = 'inherit';
      }
    }
  }
}

// Ensure the profile button click works correctly (extra safety)
function handleProfileButtonInNav() {
  // Logic mostly handled by checkUserLogin setting the href
}

// 2. Signup Logic
function handleSignup() {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value; // In real app, hash this!
      const bio = document.getElementById('bio').value;
      const role = document.getElementById('role').value;
      const agent = document.getElementById('agent').value;
      const rank = document.getElementById('rank').value;
      const peakRank = document.getElementById('peak-rank').value;

      const user = {
        username,
        email,
        pass,
        bio,
        role,
        agent,
        rank,
        peakRank,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');

      window.location.href = 'profile.html';
    });
  }
}

// 3. Login Logic
function handleLogin() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;

      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.pass === pass) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'profile.html';
      } else {
        alert('Invalid credentials! Please try again or sign up.');
      }
    });
  }
}

// 4. Profile Display Logic
function loadProfile() {
  const profilePage = document.getElementById('profile-page');
  if (profilePage) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'login.html';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Safe checks for elements before setting textContent
      const setSafeText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      };

      setSafeText('display-username', user.username);
      setSafeText('display-role', user.role);
      setSafeText('display-agent', user.agent);
      setSafeText('display-rank', user.rank);
      setSafeText('display-peak-rank', user.peakRank);
      setSafeText('display-bio', user.bio || 'No bio written yet.');
    }
  }
}

// 5. Edit Profile Logic
function handleEditProfile() {
  const editForm = document.getElementById('edit-form');
  if (editForm) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'login.html';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    // Pre-fill form
    if (user) {
      if (document.getElementById('username')) document.getElementById('username').value = user.username;
      if (document.getElementById('email')) document.getElementById('email').value = user.email; // Readonly
      if (document.getElementById('bio')) document.getElementById('bio').value = user.bio;
      if (document.getElementById('role')) document.getElementById('role').value = user.role;
      if (document.getElementById('agent')) document.getElementById('agent').value = user.agent;
      if (document.getElementById('rank')) document.getElementById('rank').value = user.rank;
      if (document.getElementById('peak-rank')) document.getElementById('peak-rank').value = user.peakRank;
    }

    editForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Update user object (keep email and pass same for now, or could add logic to change)
      user.username = document.getElementById('username').value;
      user.bio = document.getElementById('bio').value;
      user.role = document.getElementById('role').value;
      user.agent = document.getElementById('agent').value;
      user.rank = document.getElementById('rank').value;
      user.peakRank = document.getElementById('peak-rank').value;

      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'profile.html';
    });
  }
}

// 6. Logout Logic
function handleLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.setItem('isLoggedIn', 'false');
      window.location.href = 'index.html';
    });
  }
}
