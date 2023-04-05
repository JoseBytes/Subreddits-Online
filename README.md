# Tabla de contenido
1. [Descripción](#descripcion)
2. [Código](#codigo)
3. [Resultado](#resultado)

## Descripción <a name="descripcion"></a>

Este código es un ejemplo de JavaScript que recopila el número de usuarios en línea de una lista de subreddits y los muestra en una lista ordenada en una página web.

## Código <a name="codigo"></a>

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

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

## Resultado <a name="resultado"></a>

Un ejemplo del resultado podría ser una lista ordenada que se ve así:

Feet_NSFW: 2282 online
FootFetish: 1705 online
FeetLoversHeaven: 1163 online
VerifiedFeet: 734 online
FootFetishExperiences: 640 online
Feetishh: 423 online
Rate_my_feet: 298 online
FeetInYourFace: 150 online
VIPFeet: 125 online
feetpics: 92 online
sendfeetpics: 6 online
