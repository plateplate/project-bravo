import { loadPrefs, saveBest } from './storage.js';
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export class Game{
  constructor(els){ this.els = els; this.reset(); }
  reset(){
    this.state = 'idle'; this.timeoutId = null; this.startTime = 0; this.attempts = 0;
    this.els.pad.className = 'pad'; this.els.padText.textContent = 'Press Play to begin'; this.updateBar();
  }
  start(){
    if (this.state === 'waiting') return;
    this.state = 'waiting';
    this.els.pad.className = 'pad ready';
    this.els.padText.textContent = 'Wait for GO...';
    const prefs = loadPrefs();
    const base = { easy: 1500, normal: 2000, hard: 3000 }[prefs.difficulty || 'normal'];
    const delay = rand(500, base);
    this.timeoutId = setTimeout(() => {
      this.state = 'go'; this.startTime = performance.now();
      this.els.pad.className = 'pad go'; this.els.padText.textContent = 'GO!'; this.say('Go');
    }, delay);
  }
  cancel(){
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.reset(); this.say('Round cancelled');
  }
  click(){
    if (this.state === 'idle') return;
    if (this.state === 'waiting'){
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.state = 'done'; this.els.pad.className = 'pad too-soon'; this.els.padText.textContent = 'Too soon! Press Play'; this.say('Too soon'); return;
    }
    if (this.state === 'go'){
      this.state = 'done'; const ms = Math.round(performance.now() - this.startTime);
      this.els.outLast.textContent = ms + ' ms'; const best = saveBest(ms);
      this.els.outBest.textContent = best ? best + ' ms' : ms + ' ms';
      this.attempts += 1; this.updateBar();
      this.els.pad.className = 'pad'; this.els.padText.textContent = 'Nice! Press Play for another round'; this.say('Time ' + ms + ' milliseconds');
    }
  }
  updateBar(){ const pct = Math.min(100, (this.attempts/10)*100); this.els.bar.style.width = pct + '%'; this.els.outAttempts.textContent = String(this.attempts); }
  say(message){ this.els.live.textContent = message; }
}
