import { GAMES } from './config.js';

export function initGames() {
  const frame = document.getElementById('gameFrame');
  const screen = document.getElementById('gameScreen');
  const backBtn = document.getElementById('gameBack');
  const titleEl = document.getElementById('gameTitle');
  const externalLink = document.getElementById('gameOpenExternal');

  if (!frame || !screen) return;

  document.querySelectorAll('.book-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const game = GAMES[index];
      if (game) openGame(game);
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', closeGame);
  }

  window.addEventListener('popstate', handleRoute);

  function openGame(game) {
    frame.title = game.title;
    frame.src = game.itchEmbed;
    titleEl.textContent = game.title;
    externalLink.href = game.itchPage || '#';
    screen.hidden = false;
    screen.classList.add('active');
    document.body.classList.add('game-active');
    history.pushState({ game: game.id }, '', `#/juego/${game.id}`);
  }

  function closeGame() {
    frame.src = '';
    screen.hidden = true;
    screen.classList.remove('active');
    document.body.classList.remove('game-active');
    history.pushState(null, '', '#');
  }

  function handleRoute() {
    if (!location.hash.startsWith('#/juego/')) {
      closeGame();
    }
  }

  const fallbackTimeout = setTimeout(() => {
    if (frame.src && frame.contentDocument?.body?.innerText === '') {
      externalLink.hidden = false;
    }
  }, 8000);

  frame.addEventListener('load', () => {
    clearTimeout(fallbackTimeout);
  });
}