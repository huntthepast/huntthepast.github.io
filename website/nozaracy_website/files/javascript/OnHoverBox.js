const thumbs = document.querySelectorAll(".box");
const title = document.querySelectorAll(".title")
const onMouseMove = (e, i) => {
    title[i].style.left = e.pageX + 'px';
    title[i].style.top = e.pageY + 'px';
}
const onMouseEnter = (i) => {
    title[i].style.transform = 'translate(-50%,-50%) scale(1)';
}
const onMouseLeave = (i) => {
    title[i].style.transform = 'translate(-50%,-50%) scale(0)';
}

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("mousemove", (e) => onMouseMove(e, i));
    thumb.addEventListener("mouseenter", () => onMouseEnter(i));
    thumb.addEventListener("mouseleave", () => onMouseLeave(i));
});