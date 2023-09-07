const showAnim = document.querySelectorAll(".showAnim");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry =>{
            entry.target.classList.toggle("opacity-100", entry.isIntersecting)
            if(entry.isIntersecting){entry.target.classList.remove("translate-y-16", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("translate-y-32", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("translate-x-16", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("translate-x-32", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("-translate-y-16", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("-translate-y-32", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("-translate-x-16", entry.isIntersecting)}
            if(entry.isIntersecting){entry.target.classList.remove("-translate-x-32", entry.isIntersecting)}
            if(entry.isIntersecting) observer.unobserve(entry.target)
        })
    },
    {
        threshold: 0.6,
    }
);

showAnim.forEach(showAnim => {
    observer.observe(showAnim);
});