/////////////////////////////////////// Get Browser Info /////////////////////////////////////
// Get Screen Size
function checkScreenSize() {
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    console.log(width, height);
}

/////////////////////////////////////// Intersection Observer /////////////////////////////////////
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

/////////////////////////////////////// Input Function /////////////////////////////////////
// Check and Set Radio Design 
function checkBtn(id, shell) {
    var radios = document.getElementsByName(id);
    var radioShell = document.getElementsByClassName(shell);
    var value;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            value = radios[i].value;

            // Change Radio Style On
            radioShell[i].classList.add('text-black');
            radioShell[i].classList.remove('text-neutral-600');
            radioShell[i].classList.add('bg-white');
            radioShell[i].classList.remove('bg-transparent');
            radioShell[i].classList.add('border-white');
            radioShell[i].classList.remove('border-neutral-600');

            // console.log(value);
        }else{
            // Change Radio Style Off
            radioShell[i].classList.remove('text-black');
            radioShell[i].classList.add('text-neutral-600');
            radioShell[i].classList.remove('bg-white');
            radioShell[i].classList.add('bg-transparent');
            radioShell[i].classList.remove('border-white');
            radioShell[i].classList.add('border-neutral-600');
        }
    }
};

// Check the value of Input Btn
function checkInputValue(id, label) {
    const input = document.getElementById(id);
    const inputLabel = document.getElementById(label);

    if (input && input.value) {
        // console.log(input.value);
        inputLabel.classList.remove('text-2xl');

        inputLabel.classList.add('text-xs');
        inputLabel.classList.add('-translate-y-full'); 
    }
    else {
        // console.log("no Value");
        inputLabel.classList.add('text-2xl');

        inputLabel.classList.remove('text-xs');
        inputLabel.classList.remove('-translate-y-full'); 
    }
};

// Set Textarea Size
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
};

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
};

/////////////////////////////////////// OnHover Function /////////////////////////////////////
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
const onMouseMove = (e) => {
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    title.forEach((tiles, i) => {
        title[i].style.left = e.pageX - scrollLeft + 'px';
        title[i].style.top = e.pageY - scrollTop + 'px';
    });
}
const onMouseEnter = (e, i) => {
    mouseSprite.style.transform = 'translate(-50%,-50%) scale(0)';
    title[i].style.transform = 'translate(-50%,-50%) scale(1)';
}
const onMouseLeave = (e, i) => {
    mouseSprite.style.transform = 'translate(-50%,-50%) scale(1)';
    title[i].style.transform = 'translate(-50%,-50%) scale(0)';
}

window.addEventListener("mousemove", (e) => onMouseMove(e));
window.addEventListener("mousemove", (e) => onGlobalMove(e));
window.addEventListener("scroll", (e) => onGlobalMove(e));

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("mouseenter", (e) => onMouseEnter(e, i));
    thumb.addEventListener("mouseleave", (e) => onMouseLeave(e, i));
});