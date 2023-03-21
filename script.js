const subreddits = ['FootFetishExperiences', 'FeetLoversHeaven', 'Feet_NSFW', 'feetpics', 'VerifiedFeet', 'FootFetish', 'Feetishh', 'FeetInYourFace', 'sendfeetpics', 'VIPFeet', 'Rate_my_feet'];

const apiUrl = 'https://www.reddit.com/';

function getSubredditData(subreddit) {

  return fetch(`${apiUrl}r/${subreddit}/about.json`)

    .then(response => response.json())

    .then(data => ({

      name: subreddit,

      usersOnline: data.data.active_user_count

    }))

    .catch(error => console.error(error));

}

function updateSubredditData(subreddit) {

  const subredditElement = document.querySelector(`#${subreddit}`);

  getSubredditData(subreddit)

    .then(data => {

      subredditElement.querySelector('.subreddit-users').textContent = `${data.usersOnline} users online`;

      if (data.usersOnline > 400) {

        subredditElement.querySelector('.subreddit-users').classList.add('green');

        subredditElement.querySelector('.subreddit-users').classList.remove('red');

      } else {

        subredditElement.querySelector('.subreddit-users').classList.add('red');

        subredditElement.querySelector('.subreddit-users').classList.remove('green');

      }

    })

    .catch(error => console.error(error));

}

function renderSubreddits() {

  const subredditsElement = document.querySelector('.subreddits');

  subreddits.forEach(subreddit => {

    const subredditElement = document.createElement('div');

    subredditElement.classList.add('subreddit');

    subredditElement.id = subreddit;

    const subredditNameElement = document.createElement('div');

    subredditNameElement.classList.add('subreddit-name');

    subredditNameElement.textContent = subreddit;

    subredditElement.appendChild(subredditNameElement);

    const subredditUsersElement = document.createElement('div');

    subredditUsersElement.classList.add('subreddit-users');

    subredditElement.appendChild(subredditUsersElement);

    subredditsElement.appendChild(subredditElement);

    updateSubredditData(subreddit);

    setInterval(() => updateSubredditData(subreddit), 10 * 1000);

  });

}

renderSubreddits();


