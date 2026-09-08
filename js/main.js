/* Hunt The Past — site behaviour.
   Plain ES2020, no build step, no dependencies. Everything degrades to a
   readable static page if JavaScript fails. */

/* -------------------------------------------------------------------------
   Preferences — language and reduced motion, both remembered per browser

   localStorage can throw outright (Safari private mode, blocked site data),
   so every access goes through these helpers and silently falls back to the
   default rather than taking the rest of the script down with it.
   ------------------------------------------------------------------------- */
const STORE_LANG = 'htp-lang';
const STORE_MOTION = 'htp-motion';

function readPref(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function writePref(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) { /* nothing we can do; the choice just will not persist */ }
}

let currentLang = 'id';

function t(key) {
    const dict = (typeof I18N !== 'undefined' && I18N[currentLang]) || {};
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
}

/* --- Reduced motion ------------------------------------------------------ */
function initMotion() {
    const buttons = Array.from(document.querySelectorAll('[data-motion-toggle]'));
    // The inline <head> script already decided the initial state; read it back
    // so the button matches what is on screen.
    let reduced = document.documentElement.classList.contains('reduce-motion');

    function sync() {
        document.documentElement.classList.toggle('reduce-motion', reduced);
        buttons.forEach((btn) => btn.setAttribute('aria-pressed', String(reduced)));
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            reduced = !reduced;
            writePref(STORE_MOTION, reduced ? 'reduce' : 'full');
            sync();
            // Anything still waiting to animate in should just be shown.
            if (reduced) {
                document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
            }
        });
    });

    sync();
}

/* --- Language ------------------------------------------------------------ */
function applyLang(lang) {
    if (typeof I18N === 'undefined' || !I18N[lang]) return;
    currentLang = lang;

    document.documentElement.lang = t('meta.lang');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });

    // Only used for the few strings that carry inline markup. The values come
    // from js/i18n.js, never from user input.
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
        el.setAttribute('placeholder', t(el.dataset.i18nPh));
    });

    document.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // Video cards hold translated labels and locale-formatted dates.
    renderVideos();
}

function initLang() {
    const saved = readPref(STORE_LANG);
    const lang = saved === 'en' || saved === 'id' ? saved : 'id';

    document.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.addEventListener('click', () => {
            writePref(STORE_LANG, btn.dataset.lang);
            applyLang(btn.dataset.lang);
        });
    });

    applyLang(lang);
}

/* -------------------------------------------------------------------------
   Header — solid + blurred once the page has scrolled past the hero edge
   ------------------------------------------------------------------------- */
function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const SCROLLED = ['bg-ink-950/85', 'backdrop-blur-md', 'border-b', 'border-cream/10'];

    function sync() {
        const scrolled = window.scrollY > 20;
        SCROLLED.forEach((cls) => header.classList.toggle(cls, scrolled));
    }

    sync();
    window.addEventListener('scroll', sync, { passive: true });
}

/* -------------------------------------------------------------------------
   Sidebar — full-height drawer sliding in from the right on mobile
   ------------------------------------------------------------------------- */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const openBtn = document.getElementById('sidebar-open');
    const closeBtn = document.getElementById('sidebar-close');
    if (!sidebar || !overlay || !openBtn || !closeBtn) return;

    const FOCUSABLE = 'a[href], button:not([disabled])';
    let isOpen = false;

    function open() {
        isOpen = true;
        sidebar.classList.replace('translate-x-full', 'translate-x-0');
        sidebar.setAttribute('aria-hidden', 'false');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        openBtn.setAttribute('aria-expanded', 'true');
        // keep the page behind the drawer from scrolling
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        if (!isOpen) return;
        isOpen = false;
        sidebar.classList.replace('translate-x-0', 'translate-x-full');
        sidebar.setAttribute('aria-hidden', 'true');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        openBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    // Any nav link inside the drawer closes it before jumping to the section.
    sidebar.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', close));

    document.addEventListener('keydown', (event) => {
        if (!isOpen) return;

        if (event.key === 'Escape') {
            close();
            return;
        }

        // Trap focus inside the drawer while it is open.
        if (event.key !== 'Tab') return;
        const items = Array.from(sidebar.querySelectorAll(FOCUSABLE));
        if (items.length === 0) return;

        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    // Returning to desktop width while open would leave the page scroll-locked.
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
        if (event.matches) close();
    });
}

/* -------------------------------------------------------------------------
   Active section highlighting in both navigations
   ------------------------------------------------------------------------- */
function initSectionSpy() {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const links = Array.from(document.querySelectorAll('[data-nav]'));
    if (sections.length === 0 || links.length === 0) return;

    function mark(id) {
        links.forEach((link) => {
            link.setAttribute('aria-current', String(link.dataset.nav === id));
        });
    }

    const observer = new IntersectionObserver((entries) => {
        // The entry closest to the top of the viewport wins.
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) mark(visible.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
}

/* -------------------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------------------- */
function initReveal() {
    const items = Array.from(document.querySelectorAll('.reveal'));
    if (items.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    items.forEach((item) => observer.observe(item));
}

/* -------------------------------------------------------------------------
   YouTube — lightweight facades built from js/data.js

   Only a thumbnail is rendered up front; the real player is injected on click.
   That keeps the page free of YouTube's ~1MB embed until someone wants it, and
   means no API key is needed (which matters on a public GitHub Pages repo).
   ------------------------------------------------------------------------- */
function formatDate(iso) {
    const date = new Date(iso + 'T00:00:00');
    if (Number.isNaN(date.getTime())) return 'YouTube';
    return date.toLocaleDateString(t('meta.dateLocale'), { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderVideos() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;

    // Re-runnable: called again whenever the language changes.
    grid.innerHTML = '';

    const videos = typeof YOUTUBE_VIDEOS !== 'undefined' ? YOUTUBE_VIDEOS : [];
    const channel = typeof YOUTUBE_CHANNEL !== 'undefined'
        ? YOUTUBE_CHANNEL
        : 'https://www.youtube.com/';

    if (videos.length === 0) {
        grid.innerHTML =
            '<p class="rounded-2xl border border-cream/10 bg-ink-900/70 p-6 text-mist sm:col-span-2 lg:col-span-3">' +
            t('video.empty') + ' ' +
            '<a class="text-cyan underline" href="' + channel + '" target="_blank" rel="noopener">' + t('video.emptyLink') + '</a>.' +
            '</p>';
        return;
    }

    videos.forEach((video, index) => {
        const card = document.createElement('article');
        card.className = 'card group flex flex-col';
        // The third card onward only appears from `sm` up, so small screens
        // stay short without needing a separate list.
        if (index >= 3) card.classList.add('hidden', 'sm:flex');

        const button = document.createElement('button');
        button.type = 'button';
        button.className =
            'relative block aspect-video w-full overflow-hidden border-b border-cream/10 bg-ink-850';
        button.setAttribute('aria-label', t('a11y.playVideo') + video.title);

        const thumb = document.createElement('img');
        thumb.src = 'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg';
        thumb.alt = '';
        thumb.loading = 'lazy';
        thumb.className =
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105';
        thumb.addEventListener('error', () => {
            thumb.src = 'img/placeholder 480 x 480.png';
        });

        const play = document.createElement('span');
        play.className =
            'absolute inset-0 grid place-content-center bg-ink-950/35 transition-colors duration-300 group-hover:bg-ink-950/15';
        play.innerHTML =
            '<span class="grid h-16 w-16 place-content-center rounded-full bg-gold text-ink-950 shadow-xl transition-transform duration-300 group-hover:scale-110">' +
            '<svg viewBox="0 0 24 24" class="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
            '</span>';

        button.append(thumb, play);

        const body = document.createElement('div');
        body.className = 'flex flex-1 flex-col p-5';

        const title = document.createElement('h3');
        title.className = 'text-lg leading-snug';
        title.textContent = video.title;

        const meta = document.createElement('span');
        meta.className = 'mt-3 text-xs font-semibold uppercase tracking-widest text-cyan';
        meta.textContent = video.date ? formatDate(video.date) : 'YouTube';

        body.append(title, meta);
        card.append(button, body);
        grid.append(card);

        button.addEventListener('click', () => {
            const frame = document.createElement('iframe');
            frame.className = 'aspect-video w-full border-b border-cream/10';
            frame.src =
                'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1&rel=0';
            frame.title = video.title;
            frame.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            frame.allowFullscreen = true;
            button.replaceWith(frame);
        });
    });
}

/* -------------------------------------------------------------------------
   Misc
   ------------------------------------------------------------------------- */
function initYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
}

/* -------------------------------------------------------------------------
   Contact form

   GitHub Pages has no backend, so the form is submitted with fetch() to
   Web3Forms, which relays the message to the email tied to the access key.
   Everything degrades gracefully: without JS the form still posts normally,
   and the visible mailto link is always there as a fallback.
   ------------------------------------------------------------------------- */
function initContact() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = document.getElementById('contact-status');
    const button = form.querySelector('[data-cf-submit]');

    function setStatus(key, tone) {
        status.textContent = t(key);
        status.classList.remove('text-mist', 'text-lime', 'text-magenta');
        status.classList.add(tone === 'ok' ? 'text-lime' : tone === 'err' ? 'text-magenta' : 'text-mist');
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // The form carries `novalidate`, so trigger the native checks ourselves.
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        setStatus('contact.sending', '');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form),
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok && data.success) {
                setStatus('contact.success', 'ok');
                form.reset();
            } else {
                setStatus('contact.error', 'err');
            }
        } catch (e) {
            setStatus('contact.error', 'err');
        } finally {
            button.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMotion();
    initHeader();
    initSidebar();
    initSectionSpy();
    initReveal();
    initLang(); // also renders the video cards
    initYear();
    initContact();
});
