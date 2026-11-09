const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
const clock = s => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, x = String(s % 60).padStart(2, '0'); return h ? `${h}:${String(m).padStart(2, '0')}:${x}` : `${m}:${x}`; };

function setupPage(home) {
  const audio = new Audio(home + 'audio.m4a');
  audio.preload = 'metadata';
  const pp = $('pp'), seek = $('seek'), time = $('clock'), rate = $('rate'), vol = $('vol');
  const rates = [1, 1.25, 1.5, 0.75];
  const listeners = [];
  const show = () => {
    pp.textContent = audio.paused ? '▶' : '❚❚';
    pp.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    if (audio.duration) seek.value = String(Math.round(audio.currentTime / audio.duration * 1000));
    time.textContent = clock(audio.currentTime) + (audio.duration ? ' / ' + clock(audio.duration) : '');
  };
  pp.onclick = () => audio.paused ? audio.play() : audio.pause();
  document.querySelectorAll('[data-skip]').forEach(b => b.onclick = () => { audio.currentTime = Math.max(0, audio.currentTime + Number(b.dataset.skip)); });
  rate.onclick = () => { audio.playbackRate = rates[(rates.indexOf(audio.playbackRate) + 1) % rates.length]; rate.textContent = audio.playbackRate + '×'; };
  vol.oninput = () => { audio.volume = Number(vol.value); };
  seek.oninput = () => { if (audio.duration) audio.currentTime = Number(seek.value) / 1000 * audio.duration; };
  ['play', 'pause', 'loadedmetadata'].forEach(e => audio.addEventListener(e, show));
  audio.addEventListener('timeupdate', () => { show(); listeners.forEach(f => f(audio.currentTime)); });
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,select,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.code === 'Space') { e.preventDefault(); pp.click(); }
  });
  fetch(home + '../sessions.json').then(r => r.ok ? r.json() : []).then(list => {
    if (list.length < 2) return;
    const pick = $('session'), here = Number(location.pathname.match(/\/(\d+)\//)?.[1]);
    for (const s of [...list].reverse()) { const o = el('option', null, s.title); o.value = s.n; o.selected = s.n === here; pick.append(o); }
    pick.hidden = false;
    pick.onchange = () => { location.href = home + '../' + pick.value + '/' + (location.pathname.includes('/matrix/') ? 'matrix/' : ''); };
  }).catch(() => {});
  return {
    at(t) { audio.currentTime = Math.max(0, t); audio.play(); },
    onTime(f) { listeners.push(f); },
  };
}

function lastAtOrBefore(times, t) {
  let lo = 0, hi = times.length - 1, found = -1;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (times[mid] <= t) { found = mid; lo = mid + 1; } else hi = mid - 1; }
  return found;
}
