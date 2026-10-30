(() => {
    'use strict';

    const toggle = document.querySelector('.haunt-toggle');
    if (!toggle) return;

    const body = document.body;
    const apparitions = document.querySelector('.haunt-apparitions');
    const scare = document.querySelector('.haunt-scare');
    const summon = document.querySelector('.haunt-summon');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const storageKey = 'geodes-haunting';
    const timers = new Set();
    let wanted = true;
    let enabled = false;
    let busy = false;

    try { wanted = localStorage.getItem(storageKey) !== 'off'; } catch { /* Storage is optional. */ }

    const random = (min, max) => min + Math.random() * (max - min);
    const later = (callback, delay) => {
        const timer = window.setTimeout(() => {
            timers.delete(timer);
            callback();
        }, delay);
        timers.add(timer);
        return timer;
    };
    const active = () => enabled && !document.hidden;
    const readingOrTyping = () => {
        const focus = document.activeElement;
        return document.querySelector('#nav-trigger:checked') ||
            focus?.matches('input, textarea, select, [contenteditable="true"]') ||
            Boolean(window.getSelection()?.toString());
    };

    const clearEffects = () => {
        timers.forEach(window.clearTimeout);
        timers.clear();
        apparitions.replaceChildren();
        scare.classList.remove('is-visible');
        body.classList.remove('is-flickering');
        busy = false;
        if (summon) {
            summon.disabled = !enabled;
            summon.querySelector('span').textContent = summon.dataset.ready;
        }
    };

    const dimLights = () => {
        if (!active()) return;
        body.classList.remove('is-flickering');
        // Restart the single, gentle dim even after a recent apparition.
        void body.offsetWidth;
        body.classList.add('is-flickering');
        later(() => body.classList.remove('is-flickering'), 850);
    };

    const drift = () => {
        if (!active() || busy || readingOrTyping()) return;
        const ghost = document.createElement('div');
        const duration = random(9500, 14500);
        ghost.className = 'haunt-apparition' + (Math.random() > 0.5 ? ' is-reversed' : '');
        ghost.style.setProperty('--ghost-top', `${random(18, 62)}vh`);
        ghost.style.setProperty('--ghost-size', `${random(65, 115)}px`);
        ghost.style.setProperty('--ghost-duration', `${duration}ms`);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 240');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#haunt-ghost');
        svg.append(use);
        ghost.append(svg);
        apparitions.append(ghost);
        later(() => ghost.remove(), duration + 100);
    };

    const surprise = () => {
        if (!active() || busy || readingOrTyping()) return;
        busy = true;
        apparitions.replaceChildren();
        if (summon) {
            summon.disabled = true;
            summon.querySelector('span').textContent = summon.dataset.summoning;
        }
        dimLights();
        later(() => {
            if (!active()) return;
            scare.classList.add('is-visible');
            later(() => {
                scare.classList.remove('is-visible');
                busy = false;
                if (summon) {
                    summon.disabled = false;
                    summon.querySelector('span').textContent = summon.dataset.ready;
                }
            }, 1300);
        }, 650);
    };

    const scheduleGhost = () => later(() => {
        drift();
        if (active()) scheduleGhost();
    }, random(15000, 25000));

    const scheduleScare = () => later(() => {
        surprise();
        if (active()) scheduleScare();
    }, random(65000, 100000));

    const scheduleDim = () => later(() => {
        if (!busy && !readingOrTyping()) dimLights();
        if (active()) scheduleDim();
    }, random(23000, 41000));

    const start = () => {
        clearEffects();
        if (!active()) return;
        later(drift, random(5000, 9000));
        later(surprise, random(33000, 48000));
        scheduleGhost();
        scheduleScare();
        scheduleDim();
    };

    const sync = () => {
        enabled = wanted && !motion.matches;
        body.classList.toggle('haunting', enabled);
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.disabled = motion.matches;
        toggle.title = motion.matches ? toggle.dataset.reducedHint : toggleHint;
        toggle.querySelector('.haunt-toggle-label').textContent = motion.matches
            ? toggle.dataset.reduced : enabled ? toggle.dataset.on : toggle.dataset.off;
        if (summon) {
            summon.disabled = !enabled;
            summon.title = motion.matches ? toggle.dataset.reducedHint : '';
        }
        start();
    };

    const setWanted = (value) => {
        wanted = value;
        try { localStorage.setItem(storageKey, wanted ? 'on' : 'off'); } catch { /* Private browsing still works. */ }
        sync();
    };

    const toggleHint = toggle.title;
    toggle.hidden = false;
    if (summon) {
        summon.hidden = false;
        summon.addEventListener('click', surprise);
    }
    toggle.addEventListener('click', () => setWanted(!wanted));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && enabled) setWanted(false);
    });
    document.addEventListener('visibilitychange', start);
    window.addEventListener('pagehide', clearEffects);
    window.addEventListener('pageshow', start);
    motion.addEventListener('change', sync);
    sync();
})();
