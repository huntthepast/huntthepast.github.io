const carousel = document.querySelectorAll('.carouselContent');
const carouselMax = document.querySelectorAll('.carouselContent').length;
var carouselId = 0;

function nextImg(gap) {
    if(carouselId < (carouselMax - 1)){
        carouselId += 1;
    }else{
        carouselId = 0
    };

    carousel.forEach((caroul, i) => {
        width = caroul.clientWidth;
        caroul.style.transform = "translateX(" + (-carouselId * (width + gap)) + "px)";
    });
};

function prevImg(gap) {
    if(carouselId > 0){
        carouselId -= 1;
    }else{
        carouselId = (carouselMax - 1);
    };
    carousel.forEach((caroul, i) => {
        width = caroul.clientWidth;
        caroul.style.transform = "translateX(" + (-carouselId * (width + gap)) + "px)";
    });
};