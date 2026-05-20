export function initNavigation() {
  const title = document.getElementById('mainTitle');
  if (title) {
    title.addEventListener('click', goToSecondScreen);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSecondScreen();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.body.classList.contains('game-active')) {
        return;
      }
      if (document.body.classList.contains('second-screen-active')) {
        goToHub();
      }
    }
  });
}

export function goToSecondScreen() {
  document.body.classList.add('second-screen-active');
}

export function goToHub() {
  document.body.classList.remove('second-screen-active');
}

export function initHashRouting(onGameOpen) {
  window.addEventListener('popstate', handleRoute);

  if (location.hash.startsWith('#/juego/')) {
    const gameId = location.hash.replace('#/juego/', '');
    if (onGameOpen) onGameOpen(gameId);
  }
}

function handleRoute() {
  if (!location.hash.startsWith('#/juego/')) {
  }
}