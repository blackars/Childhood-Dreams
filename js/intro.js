import { TIMELINE } from './config.js';
import { unlockAudio } from './audio.js';

let startedAt = null;
let timelineCallbacks = [];

export function initIntro({ onComplete, onStart }) {
  const trigger = document.getElementById('introTrigger');
  if (!trigger) return;

  function startIntro() {
    if (startedAt) return;
    startedAt = performance.now();

    document.body.classList.remove('intro-idle');
    document.body.classList.add('intro-playing');

    unlockAudio();
    onStart?.();

    scheduleTimeline(startedAt, onComplete);
  }

  trigger.addEventListener('click', startIntro);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startIntro();
    }
  });
}

function scheduleTimeline(startedAt, onComplete) {
  const schedule = (delay, callback) => {
    const timeoutId = setTimeout(callback, delay);
    timelineCallbacks.push(timeoutId);
  };

  schedule(TIMELINE.particlesVisible, () => {
    document.body.classList.add('particles-visible');
  });

  schedule(TIMELINE.introFadeout, () => {
    document.body.classList.add('intro-fadeout');
  });

  schedule(TIMELINE.titleVisible, () => {
    document.body.classList.add('title-visible');
    document.body.classList.remove('intro-playing');
  });

  schedule(TIMELINE.removeOverlay, () => {
    const intro = document.getElementById('introOverlay');
    if (intro) intro.remove();
    onComplete?.();
  });
}