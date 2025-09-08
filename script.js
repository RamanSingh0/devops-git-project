// Smooth scrolling function
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Active navigation link
window.addEventListener('scroll', () => {
  const sections = ['home', 'about', 'skills', 'members'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const element = document.getElementById(section);
    const link = document.querySelector(`a[href="#${section}"]`);
    
    if (element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Load team members from GitHub API
function loadMembers() {
  const membersList = document.getElementById("members-list");
  
  // GitHub API configuration
  const GITHUB_API = "https://api.github.com/repos/RamanSingh0/devops-git-project/contributors";
  
  // Your fixed profile details (Always shown first)
  const fixedCollaborator = {
    login: "RamanSingh0",
    avatar_url: "https://github.com/RamanSingh0.png",
    html_url: "https://github.com/RamanSingh0"
  };

  // Show loading state
  membersList.innerHTML = `
    <div class="col-span-full text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading team members...</p>
    </div>
  `;

  fetch(GITHUB_API, {
    headers: {
      "Accept": "application/vnd.github.v3+json"
    }
  })
  .then(response => response.json())
  .then(data => {
    membersList.innerHTML = "";

    // Add fixed collaborator card first
    const fixedCard = document.createElement("div");
    fixedCard.className = "fade-in member-card rounded-2xl p-6 card-hover bg-white shadow-lg";
    fixedCard.innerHTML = `
      <div class="text-center">
        <div class="relative mb-6">
          <img src="${fixedCollaborator.avatar_url}" alt="${fixedCollaborator.login}" 
               class="w-20 h-20 mx-auto rounded-full object-cover border-4 border-gray-100">
          <div class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${fixedCollaborator.login}</h3>
        <p class="text-gray-600 font-medium mb-4">Project Owner</p>
        <a href="${fixedCollaborator.html_url}" target="_blank" 
           class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Profile
        </a>
      </div>
    `;
    membersList.appendChild(fixedCard);
    observer.observe(fixedCard);

    // Add other collaborators (avoiding duplicates)
    data.forEach((member, index) => {
      if (member.login !== fixedCollaborator.login) {
        const card = document.createElement("div");
        card.className = "fade-in member-card rounded-2xl p-6 card-hover bg-white shadow-lg";
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
        card.innerHTML = `
          <div class="text-center">
            <div class="mb-6">
              <img src="${member.avatar_url}" alt="${member.login}" 
                   class="w-20 h-20 mx-auto rounded-full object-cover border-4 border-gray-100">
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${member.login}</h3>
            <p class="text-gray-600 font-medium mb-4">Contributor</p>
            <a href="${member.html_url}" target="_blank" 
               class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Profile
            </a>
          </div>
        `;
        membersList.appendChild(card);
        observer.observe(card);
      }
    });
  })
  .catch(error => {
    membersList.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-red-500 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-gray-600 mb-2">Unable to load team members</p>
        <p class="text-gray-500 text-sm">Please check your internet connection</p>
      </div>
    `;
    console.error("Error:", error);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadMembers();
  
  // Typing animation
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    setTimeout(() => {
      typingElement.classList.remove('typing-animation');
    }, 3000);
  }
});