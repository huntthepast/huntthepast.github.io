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

function checkScreenSize() {
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    console.log(width, height);
}