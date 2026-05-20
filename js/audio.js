import { AUDIO_CONFIG } from './config.js';

let audioUnlocked = false;

const audioElements = {
  ambient: null,
  titleHover: null,
  cardHover: null,
  click: null
};

export function initAudio() {
  audioElements.ambient = document.getElementById('ambientAudio');
  audioElements.titleHover = document.getElementById('titleHoverAudio');
  audioElements.cardHover = document.getElementById('cardHoverAudio');
  audioElements.click = document.getElementById('clickAudio');

  configureAudio();

  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });

  setupHoverSounds();
}

function configureAudio() {
  if (audioElements.ambient) {
    audioElements.ambient.volume = AUDIO_CONFIG.ambient.volume;
  }
  if (audioElements.titleHover) {
    audioElements.titleHover.volume = AUDIO_CONFIG.titleHover.volume;
  }
  if (audioElements.cardHover) {
    audioElements.cardHover.volume = AUDIO_CONFIG.cardHover.volume;
  }
  if (audioElements.click) {
    audioElements.click.volume = AUDIO_CONFIG.click.volume;
  }
}

export function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  if (audioElements.ambient) {
    audioElements.ambient.play().catch(() => {});
  }
}

function playSound(audioElement) {
  if (!audioUnlocked || !audioElement) return;
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {});
}

function setupHoverSounds() {
  const title = document.getElementById('mainTitle');
  if (title) {
    title.addEventListener('mouseenter', () => playSound(audioElements.titleHover));
    title.addEventListener('focus', () => playSound(audioElements.titleHover));
  }

  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('mouseenter', () => playSound(audioElements.cardHover));
    card.addEventListener('pointerenter', () => playSound(audioElements.cardHover));
    card.addEventListener('click', () => playSound(audioElements.click));
  });
}

export function getAudioUnlock() {
  return unlockAudio;
}