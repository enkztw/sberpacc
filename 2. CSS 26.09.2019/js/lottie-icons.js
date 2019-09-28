const socialItems = document.querySelectorAll(`.contacts-list__item a`);
const arrowDownIcon = document.querySelector(`.form-container__title .icon`);
const arrowDownIconData = arrowDownIcon.getAttribute(`data-name`);

for (const socialItem of socialItems) {
    const icon = socialItem.querySelector(`.icon`);
    const iconData = icon.getAttribute(`data-name`);

    const iconInstance = lottie.loadAnimation({
        container: icon,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: `data/${iconData}.json`,
    });


    socialItem.addEventListener(`mouseover`, () => {
        iconInstance.play();
    });

    socialItem.addEventListener(`mouseout`, () => {
        iconInstance.stop();
    });
}

const arrowDownIconInstance = lottie.loadAnimation({
    container: arrowDownIcon,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: `data/${arrowDownIconData}.json`,
});