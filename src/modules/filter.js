export default function filter() { //пишем объединённую функцию внутри action page
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        activeLi = document.querySelector('.catalog-list li.active');
    cards.forEach((card) => {
        //объединяем константы перебора
        const cardPrice = card.querySelector('.card-price'),
            price = parseFloat(cardPrice.textContent), //убираем знак валюты
            discount = card.querySelector('.card-sale');

            card.parentNode.style.display = ''; //делаем все карточки изначально видимыми, поэтому else после if нам не нужен
            /* или
              const goods = document.querySelector('.goods');
              goods.appendChild(card.parentElement);
           */

        if ((min.value && price < min.value) || (max.value && price > max.value)) {
            card.parentNode.style.display = 'none';
            // или  card.parentElement.remove();
        } else if (discountCheckbox.checked && !discount) {//почему без дискаунта? - скрываем карточки, которые без акции
            card.parentNode.style.display = 'none';
        } else if (activeLi) {
            if (card.dataset.category !== activeLi.textContent) {
                card.parentNode.style.display = 'none';
            }
        }
    });
}