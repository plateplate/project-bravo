const KEY = 'snaptest:prefs'; const BEST = 'snaptest:best';

export function loadPrefs(){ try{ const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; } }
export function savePrefs(prefs){ try{ localStorage.setItem(KEY, JSON.stringify(prefs)); }catch(e){} }
export function clearPrefs(){ try{ localStorage.removeItem(KEY); localStorage.removeItem(BEST); }catch(e){} }
export function saveBest(ms){
  try{ const current = Number(localStorage.getItem(BEST) || Infinity);
    if (ms < current){ localStorage.setItem(BEST, String(ms)); return ms; }
    return current !== Infinity ? current : null;
  }catch(e){ return null; }
}
export function setLinks(){
  const url = window.location.href; const enc = encodeURIComponent(https://plateplate.github.io/project-bravo/);
  document.getElementById('linkNu').href = `https://validator.w3.org/nu/?doc=${enc}`;
  document.getElementById('linkWave').href = `https://wave.webaim.org/report#/${https://plateplate.github.io/project-bravo/}`;
}
