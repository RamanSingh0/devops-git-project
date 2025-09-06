const membersList = document.getElementById("members-list");

// Replace with your GitHub username and repository name
const GITHUB_API = "https://api.github.com/repos/YOUR_USERNAME/portfolio-website/collaborators";

fetch(GITHUB_API, {
  headers: {
    "Accept": "application/vnd.github.v3+json"
  }
})
.then(response => response.json())
.then(data => {
  membersList.innerHTML = "";
  if (data.message === "Not Found" || data.length === 0) {
    membersList.innerHTML = "<p>No collaborators found.</p>";
    return;
  }
  
  data.forEach(member => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <img src="${member.avatar_url}" alt="${member.login}">
      <h3>${member.login}</h3>
      <a href="${member.html_url}" target="_blank">View Profile</a>
    `;
    membersList.appendChild(card);
  });
})
.catch(error => {
  membersList.innerHTML = "<p>Error fetching members.</p>";
  console.error("Error:", error);
});
