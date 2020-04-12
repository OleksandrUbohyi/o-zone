'use strict';

// checkbox

function toggleCheckbox() {
    const checkboxes = document.querySelectorAll('.filter-check_checkbox');

    checkboxes.forEach((item) => {
        item.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}

// end checkbox

// корзина

function toggleCart() {
    const cartBtn = document.querySelector('#cart'),
        modalCart = document.querySelector('.cart'),
        closeBtn = document.querySelector('.cart-close');

    cartBtn.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    });
}



//end корзина



// работа с корзиной

function addCard() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {

            const cardClone = card.cloneNode(true); // true - клонирует также вложенные элементы
            cartWrapper.appendChild(cardClone);
            // cartEmpty.remove();
            showData();

            const removeBtn = cardClone.querySelector('.btn'); // получаем одну кнопку в одной конкретной карточке
            removeBtn.textContent = 'Удалить из корзины';

            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();

            });
        });
    });

    function showData() {

        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cartTotal = document.querySelector('.cart-total span');

        //подсчитываем количество товаров в корзине
        countGoods.textContent = cardsCart.length;

        //подсчитываем общую сумму товаров в корзине
        let sum = 0;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });

        cartTotal.textContent = sum;

        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);

        } else {
            cartEmpty.remove();
        }
    }
}
// end работа с корзиной



//фильтр акции

function actionPage() { // фильтр цены и поиск

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        // для фильтра цены
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        // для поиска
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');


    discountCheckbox.addEventListener('change', () => {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });
    //end фильтр по акции





    //фильтр по цене
    // слушатель на change, а не на input
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent); //убираем знак валюты

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentElement.style.display = 'none';
                // или  card.parentElement.remove();
            } else {
                card.parentElement.style.display = '';

                /* или
                  const goods = document.querySelector('.goods');
                  goods.appendChild(card.parentElement);
               */
            }
        });
    }
    //end фильтр по цене

    // поиск товаров
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        // флаг "i" в регулярных выражениях отключает зависимость от регистра. Больше информации на https://regexr.com/

        cards.forEach((card) => {
            const cardTitle = card.querySelector('.card-title');

            if (!searchText.test(cardTitle.textContent)) { // test - возвращает булевое значение
                // также можно с помощью String.includes
                card.parentElement.style.display = 'none';
            } else {
                card.parentElement.style.display = '';
            }
        });
        search.value = '';
    });
}

//end фильтр акции

toggleCart();
toggleCheckbox();
addCard();
actionPage();