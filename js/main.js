import { initAudio, getAudioUnlock } from './audio.js';
import { initIntro } from './intro.js';
import { initNavigation, initHashRouting } from './navigation.js';
import { initGames } from './games.js';

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initIntro({ onStart: getAudioUnlock() });
  initNavigation();
  initGames();

  initHashRouting((gameId) => {
  });
});