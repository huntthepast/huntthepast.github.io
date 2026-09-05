/* Hunt The Past — site behaviour.
   Vanilla replacements for what Flowbite used to provide. */

/* Collapse toggles: [data-collapse-toggle="<target id>"] */
function initCollapseToggles() {
    document.querySelectorAll('[data-collapse-toggle]').forEach((toggle) => {
        const target = document.getElementById(toggle.getAttribute('data-collapse-toggle'));
        if (!target) return;

        toggle.setAttribute('aria-controls', target.id);
        toggle.setAttribute('aria-expanded', String(!target.classList.contains('hidden')));

        toggle.addEventListener('click', () => {
            const expanded = target.classList.toggle('hidden') === false;
            toggle.setAttribute('aria-expanded', String(expanded));
        });
    });
}

/* Carousel: a [data-carousel] root holding [data-carousel-item] slides,
   optional [data-carousel-slide-to] indicators and [data-carousel-prev/next]
   controls. `data-carousel-interval` (ms) enables auto-advance. */
function initCarousel(root) {
    const slides = Array.from(root.querySelectorAll('[data-carousel-item]'));
    if (slides.length === 0) return;

    const indicators = Array.from(root.querySelectorAll('[data-carousel-slide-to]'));
    const interval = Number(root.getAttribute('data-carousel-interval')) || 0;
    let current = Math.max(0, slides.findIndex((slide) => slide.hasAttribute('data-carousel-active')));
    let timer = null;

    function show(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === current;
            slide.classList.toggle('opacity-100', active);
            slide.classList.toggle('opacity-0', !active);
            slide.setAttribute('aria-hidden', String(!active));
        });

        indicators.forEach((indicator, i) => {
            const active = i === current;
            indicator.classList.toggle('bg-white', active);
            indicator.classList.toggle('bg-white/50', !active);
            indicator.setAttribute('aria-current', String(active));
        });
    }

    function start() {
        if (interval > 0) timer = window.setInterval(() => show(current + 1), interval);
    }

    function restart() {
        window.clearInterval(timer);
        start();
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            show(i);
            restart();
        });
    });

    root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
        show(current - 1);
        restart();
    });

    root.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
        show(current + 1);
        restart();
    });

    root.addEventListener('mouseenter', () => window.clearInterval(timer));
    root.addEventListener('mouseleave', restart);

    show(current);
    start();
}

/* Main section tabs: shows the blurb (#<name>) and the panel (#content_<name>)
   for the picked section and hides the rest. Called from inline onclick. */
const MAIN_SECTIONS = ['game', 'blog', 'portofolio', 'other'];

function mainbtn(name) {
    if (!MAIN_SECTIONS.includes(name)) return;

    MAIN_SECTIONS.forEach((section) => {
        const active = section === name;
        document.getElementById(section)?.classList.toggle('hidden', !active);
        document.getElementById('content_' + section)?.classList.toggle('hidden', !active);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCollapseToggles();
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);

    const blog = document.getElementById('blog_content');
    if (blog) {
        blog.innerHTML = '<iframe src="https://huntmygame.blogspot.com/" width="100%" height="500" title="Hunt My Game blog"><p>Your browser does not support iFrames.</p></iframe>';
    }
});
