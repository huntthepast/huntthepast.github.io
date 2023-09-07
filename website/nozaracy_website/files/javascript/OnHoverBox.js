const htmlDoc = document.querySelector('#main');
const mouseSprite = document.querySelector('#mouse');
const thumbs = document.querySelectorAll(".box");
const title = document.querySelectorAll(".title")

const onGlobalMove = (e) => {
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    mouseSprite.style.left = e.pageX - scrollLeft + 'px';
    mouseSprite.style.top = e.pageY - scrollTop + 'px';
}
const onMouseMove = (e, i) => {
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    title[i].style.left = e.pageX - scrollLeft + 'px';
    title[i].style.top = e.pageY - scrollTop + 'px';
}
const onMouseEnter = (e, i) => {
    mouseSprite.style.transform = 'translate(-50%,-50%) scale(0)';
    title[i].style.transform = 'translate(-50%,-50%) scale(1)';
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    title[i].style.left = e.pageX - scrollLeft + 'px';
    title[i].style.top = e.pageY - scrollTop + 'px';
}
const onMouseLeave = (e, i) => {
    mouseSprite.style.transform = 'translate(-50%,-50%) scale(1)';
    title[i].style.transform = 'translate(-50%,-50%) scale(0)';
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    title[i].style.left = e.pageX - scrollLeft + 'px';
    title[i].style.top = e.pageY - scrollTop + 'px';
}

htmlDoc.addEventListener("mousemove", (e) => onGlobalMove(e));
htmlDoc.addEventListener("scroll", (e) => onGlobalMove(e));

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("mousemove", (e) => onMouseMove(e, i));
    thumb.addEventListener("mouseenter", (e) => onMouseEnter(e, i));
    thumb.addEventListener("mouseleave", (e) => onMouseLeave(e, i));
});