# SnapTest — Reaction Time Game

**Deployed:** add your GitHub Pages URL after deploy  
**Repo:** this repo URL

## Objective
Click as soon as the pad says GO. Track your best reaction time and attempts. Settings let you save your name, pick difficulty, and toggle theme.

## Rules
1. Press Play / Reset.
2. Wait for GO.
3. Click the pad or press Space as fast as you can.
4. Best time persists in your browser.

## Tech
- HTML5 with semantic landmarks and Bootstrap 5 (Navbar, Cards, Modal, Progress)
- Google Font Inter
- ES modules: scripts/modules/game.js, scripts/modules/storage.js
- Local Storage for player name and best time
- Accessible updates via aria-live, keyboard support, visible focus
- Validation links auto-construct to this page

## Wireframe
See `/images/wireframe.svg`

## Code Snippet
Randomized delay based on difficulty and start timing:

```js
const base = { easy: 1500, normal: 2000, hard: 3000 }[prefs.difficulty || 'normal'];
const delay = rand(500, base);
this.timeoutId = setTimeout(() => {
  this.state = 'go';
  this.startTime = performance.now();
  this.els.pad.className = 'pad go';
  this.els.padText.textContent = 'GO!';
}, delay);
```
