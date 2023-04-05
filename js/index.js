const gitForm = document.querySelector('#github-form');

//render github user details
 githubUserSearch = (event) => {
  event.preventDefault();
  const user = document.querySelector('#search').value;
  fetch(`https://api.github.com/users/${user}`)
    .then(resp => resp.json())
    .then(user => renderGithubUser(user))
    .catch(error => alert(error));
};

//render github user details
renderGithubUser = user => {
  const gitUserCard = document.createElement('div');
  gitUserCard.className = 'user-card';
  document.querySelector('#user-list').appendChild(gitUserCard);
  gitUserCard.innerHTML = `<img src="${user.avatar_url}">
                           <h2>${user.login}</h2>
                           <a class='submit-btn' href="${user.html_url}">Go to GitHub</a>
                           <button class='submit-btn'>View ${user.login}'s Repositories</button>`;
  gitUserCard.querySelector('.submit-btn').addEventListener('click', () => {
    fetchRepositories(user);
  });
};

//fetch repositories using the url provided
fetchRepositories = user => {
  fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(resp => resp.json())
    .then(repos => renderRepositoriesDetails(repos))
    .catch(error => alert(error));
};

//render repo details for each response
renderRepositoriesDetails = repos => {
  repos.forEach(repo => {
    const repositoryCard = document.createElement('div');
    repositoryCard.className = 'repo-card';
    document.querySelector('#repos-list').appendChild(repositoryCard);
    repositoryCard.innerHTML = `<h2 class="margin-none">${repo.name}</h2>
                                <p class="fs14 margin-none">${repo.description || 'No description provided'}</p>`;
  });
};
document.addEventListener('DOMContentLoaded', () => {
  gitForm.addEventListener('submit', githubUserSearch);
});





