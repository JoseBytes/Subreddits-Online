const subreddits = ['FootFetishExperiences', 'FeetLoversHeaven', 'Feet_NSFW', 'feetpics', 'VerifiedFeet', 'FootFetish', 'Feetishh', 'FeetInYourFace', 'sendfeetpics', 'VIPFeet', 'Rate_my_feet'];

const subredditList = document.getElementById('subreddit-list');

const promises = subreddits.map(subreddit => {
  return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then(response => response.json())
    .then(data => {
      return {
        subreddit: subreddit,
        onlineUsers: data.data.active_user_count
      };
    })
    .catch(error => console.error(error));
});

Promise.all(promises).then(results => {
  results.sort((a, b) => b.onlineUsers - a.onlineUsers);
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = `${result.subreddit}: ${result.onlineUsers} online`;
    if (result.onlineUsers > 400) {
      listItem.style.color = 'green';
    }
    subredditList.appendChild(listItem);
  });
});
