const cup = document.querySelector(`.machine__fill`);
const water = document.getElementById(`water`);
let percent = cup.getAttribute(`data-percent`);

const interval = setInterval(() => {
    percent++;

    water.style.transform = 'translate(0' + ',' + (100 - percent) + '%)';
    if (percent === 100) {
        clearInterval(interval);
    }
}, 60);