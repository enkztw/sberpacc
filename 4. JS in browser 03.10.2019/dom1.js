/**
 * Магия DOM.
 * Пора попробовать себя в роли иллюзиониста. При клике на кнопку "Телепорт",
 * Джем телепортируется и пропадает из DOM, мячик при этом грустно падает
 * и приобретает class .bouncing. При нажатии на кнопку "Невидимка", Джем остается
 * на месте, но становится невидимой. Мячик остается на её голове.
 * Разрешается добавить id один раз.
 *
 */

window.addEventListener("load", function (event) {
            const buttonTel = document.querySelectorAll(`.buttons`)[0];
            const buttonInv =  document.querySelectorAll(`.buttons`)[1];

            const girlWrapper = document.querySelector(`.wrapper.girl`);
            const girl = girlWrapper.querySelector(`.girl`);
            const ball = document.getElementById(`ball`);

            buttonTel.addEventListener("click", () => {
                girlWrapper.querySelector(`img`) ? girl.remove() : girlWrapper.appendChild(girl);
                ball.classList.toggle(`bouncing`);
            });

            buttonInv.addEventListener("click", () => girl.style.opacity === `0` ? girl.style.opacity = `1` : girl.style.opacity = `0`);
});

