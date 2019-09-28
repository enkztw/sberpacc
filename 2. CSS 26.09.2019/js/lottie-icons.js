const socialItems = document.querySelectorAll(`.contacts-list__item`);

for (const socialItem of socialItems) {
    const icon = socialItem.querySelector(`.icon`);
    const iconData = icon.getAttribute(`data-name`);

    console.log(icon);

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