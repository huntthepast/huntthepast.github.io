/////////////////////////////////////// Get Browser Info /////////////////////////////////////
// Get Screen Size
function checkScreenSize() {
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    // console.log(width, height);
}

/////////////////////////////////////// Number Generator Animation /////////////////////////////////////
function createRandomSpan() {
    const newDigit = document.createElement("span");
    return newDigit;
}

function getRandom(nonZero) {
return nonZero
    ? Math.floor(Math.random() * 9) + 1
    : Math.floor(Math.random() * 10);
}

function createRandomNumbersTo(parentNode) {
    if (!parentNode) {
        throw new Error("Must be a valid parent node");
    }
    return function (digits, nextDigitTimeGap, digitSettledTime, finalNumber) {
        let isValid = (number) => Number.isSafeInteger(+number) && +number > 0;

        if (
        !isValid(digits) ||
        !isValid(nextDigitTimeGap) ||
        !isValid(digitSettledTime)
        ) {
        throw new Error("Arguments must be positive integer");
        }

        if (digitSettledTime <= 10) {
        throw new Error("digitSettledTime must be greater than 10 milliseconds");
        }

        return new Promise((resolve, reject) => {
        function getFinalNumber(finalNumber) {
            if(finalNumber == null){
                parentNode.classList.add("random-resolved");
                let number = parentNode.innerText;
                parentNode.innerHTML = number;
                if (!Number.isSafeInteger(+number)) {
                resolve(BigInt(number));
                return;
                }
                resolve(+number);
            }
            else{
                parentNode.classList.add("random-resolved");
                parentNode.innerHTML = finalNumber;
            }
        }

        function gerenateNumber(speed, endTime, nonZero = false) {
            let newDigit = createRandomSpan();
            parentNode.prepend(newDigit);
            let digitId = setInterval(() => {
            if (shouldStop()) {
                clearInterval(digitId);
                return;
            }
            endTime -= speed;
            let randomNumber = getRandom(nonZero);
            if (endTime > 0) {
                newDigit.textContent = randomNumber;
                return;
            }
            newDigit.classList.add("random-resolved");
            clearInterval(digitId);
            }, speed);
        }
        let digit = 1;
        let isLastDigit = () => digit === digits;

        function generateDigit() {
            if (shouldStop()) {
            clearInterval(genRandomNumberId);
            return;
            }
            if (isLastDigit()) {
            gerenateNumber(10, digitSettledTime, true);
            setTimeout(() => {
                getFinalNumber(finalNumber);
            }, digitSettledTime);
            clearInterval(genRandomNumberId);
            return;
            }
            gerenateNumber(10, digitSettledTime);
            digit++;
        }

        let genRandomNumberId = setInterval(generateDigit, nextDigitTimeGap);
        generateDigit(); //remove first interval delay
        });
    };
}

function prependRandomNumbersTo(selector) {
    if (typeof selector !== "string" || !selector.length) {
        throw new Error("Selector should be non-empty string");
    }
    const element = document.querySelector(selector);
        return createRandomNumbersTo(element);
}

function shouldStop() {
    return stop;
}
function resetAll() {
    stop = true;
    let numbers = [...document.querySelectorAll(".number")];
    numbers.forEach((number) => {
        number.textContent = "";
        number.classList.remove("random-resolved");
    });
    setTimeout(() => {
        main();
    }, 1000);
}

function main() {
    stop = false;
    prependRandomNumbersTo(".gnr-1")(2, 1000, 1600, 3).then((n) =>
        console.log(`resolved (very slow):`, n)
    );
    prependRandomNumbersTo(".gnr-2")(2, 1000, 1600, 40).then((n) =>
        console.log(`resolved (very slow):`, n)
    );
    prependRandomNumbersTo(".gnr-3")(2, 1000, 1600, 8).then((n) =>
        console.log(`resolved (very slow):`, n)
    );
}

let stop = false;

/////////////////////////////////////// Intersection Observer /////////////////////////////////////
// Fade In - Fade Out
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

// Random Number Observer
const ShowNumber = document.querySelectorAll(".gnr-1");
const observerNumber = new IntersectionObserver(
    entries => {
        entries.forEach(entry =>{
            if(entry.isIntersecting){main()}
            if(entry.isIntersecting) observerNumber.unobserve(entry.target)
        })
    },
    {
        threshold: 0.6,
    }
);
ShowNumber.forEach(showAnim => {
    observerNumber.observe(showAnim);
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
            radioShell[i].classList.remove('bg-black');
            radioShell[i].classList.add('bg-white');
            radioShell[i].classList.remove('bg-transparent');
            radioShell[i].classList.add('border-white');
            radioShell[i].classList.remove('border-neutral-600');

            // console.log(value);
        }else{
            // Change Radio Style Off
            radioShell[i].classList.remove('text-black');
            radioShell[i].classList.add('text-neutral-600');
            radioShell[i].classList.add('bg-black');
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
        inputLabel.classList.remove('-top-[14px]');
        
        inputLabel.classList.add('top-0');
        inputLabel.classList.add('text-xs');
        inputLabel.classList.add('-translate-y-full'); 
    }
    else {
        // console.log("no Value");
        inputLabel.classList.add('text-2xl');
        inputLabel.classList.add('-top-[14px]');
        
        inputLabel.classList.remove('top-0');
        inputLabel.classList.remove('text-xs');
        inputLabel.classList.remove('-translate-y-full'); 
    }
};

function homepageBtnInit() {
    checkBtn('ServiceRadio', 'RadioShell');
    checkBtn('ServicePrice', 'PriceShell');
    checkInputValue('fullname', 'fullname-label');
    checkInputValue('gmail', 'gmail-label');
    checkInputValue('description', 'description-label');
}

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
const title = document.querySelectorAll(".title");

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
window.addEventListener("wheel", (e) => onGlobalMove(e));

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("mouseenter", (e) => onMouseEnter(e, i));
    thumb.addEventListener("mouseleave", (e) => onMouseLeave(e, i));
});