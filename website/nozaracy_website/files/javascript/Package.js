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