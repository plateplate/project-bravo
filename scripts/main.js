import { Game } from './modules/game.js';
import { loadPrefs, savePrefs, clearPrefs, setLinks } from './modules/storage.js';

// Easter egg hint
console.log('%cEaster egg', 'font-weight:bold', ': type themeSwap() in the console to toggle theme');
window.themeSwap = () => document.body.classList.toggle('theme-alt');

const els = {
  pad: document.getElementById('pad'),
  padText: document.getElementById('padText'),
  live: document.getElementById('live'),
  btnPlay: document.getElementById('btnPlay'),
  btnCancel: document.getElementById('btnCancel'),
  btnTheme: document.getElementById('btnTheme'),
  bar: document.getElementById('bar'),
  outPlayer: document.getElementById('outPlayer'),
  outLast: document.getElementById('outLast'),
  outBest: document.getElementById('outBest'),
  outAttempts: document.getElementById('outAttempts'),
  form: document.getElementById('formSettings'),
  name: document.getElementById('playerName'),
  difficulty: document.getElementById('difficulty'),
};

// Validation and settings save
const applyValidation = () => {
  els.form.addEventListener('submit', (e) => {
    if (!els.form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
    els.form.classList.add('was-validated');
    const prefs = {
      playerName: els.name.value.trim(),
      difficulty: els.difficulty.value,
      theme: document.querySelector('input[name="theme"]:checked').value
    };
    if (els.form.checkValidity()){
      savePrefs(prefs);
      document.body.classList.toggle('theme-alt', prefs.theme === 'dark');
      els.outPlayer.textContent = prefs.playerName || '—';
    }
  }, false);
};

const init = () => {
  setLinks(); // builds Nu/WAVE links for the live URL
  const prefs = loadPrefs();
  if (prefs.playerName) els.name.value = prefs.playerName;
  if (prefs.difficulty) els.difficulty.value = prefs.difficulty;
  if (prefs.theme) document.getElementById(prefs.theme === 'dark' ? 'themeDark' : 'themeLight').checked = true;
  document.body.classList.toggle('theme-alt', (prefs.theme || 'light') === 'dark');
  els.outPlayer.textContent = prefs.playerName || '—';

  const game = new Game(els);
  els.btnPlay.addEventListener('click', () => game.start());
  els.btnCancel.addEventListener('click', () => game.cancel());
  els.pad.addEventListener('click', () => game.click());
  els.pad.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); game.click(); }
  });
  els.btnTheme.addEventListener('click', () => document.body.classList.toggle('theme-alt'));

  document.getElementById('btnClear').addEventListener('click', () => {
    clearPrefs(); els.outBest.textContent = '—'; els.outPlayer.textContent = '—'; els.name.value = '';
  });

  applyValidation();
};

document.addEventListener('DOMContentLoaded', init);
