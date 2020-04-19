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
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');


    discountCheckbox.addEventListener('change', filter);
    min.addEventListener('change', filter); // слушатель можно и на событие input, но будет более некорректно, будет больше раз срабатывать и нагружать систему.
    max.addEventListener('change', filter);


    function filter() { //пишем объединённую функцию внутри action page
        cards.forEach((card) => {
            //объединяем константы перебора
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent), //убираем знак валюты
                discount = card.querySelector('.card-sale');

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
                // или  card.parentElement.remove();
            } else if (discountCheckbox.checked && !discount) {//почему без дискаунта? - скрываем карточки, которые без акции
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
                /* или
                  const goods = document.querySelector('.goods');
                  goods.appendChild(card.parentElement);
               */
            }
        });
    }
    //end фильтр


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





//получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {//then всегда возвращает промис
            if (response.ok) {
                return response.json(); //объязателен return
            } else {
                throw new Error('Данные не были получены. Ошибка: ' + response.status);
            }
        })
        // .then(data => renderCards(data))
        .then(data => {
            return data; //возвращаем data чтобы передать в следующий then
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 24px">Упс, что-то пошло не так!</div>';
        });
    //если действие в одну строчку - может не писать фигурные скобки
    //ловит все ошибки, в т.ч. ту которую вручную создали 
}
// end получение данных с сервера



// выводим карточки товара
function renderCards(cards) {
    let goodsWrapper = document.querySelector('.goods');
    cards.goods.forEach((good) => {
        let card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        // или card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
            ${ good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" ${good.sale ? 'style="color: red"' : ''}>${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        `;
        goodsWrapper.appendChild(card);
    });
}


function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogBtn = document.querySelector('.catalog-button'),
        catalogList = document.querySelector('.catalog-list'),
        catalogWrapper = document.querySelector('.catalog'),
        categories = new Set();

    cards.forEach((card) => {
        categories.add(card.dataset.category); // add - метод добавления у коллекции set и map, в порядке добавления
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentElement.style.display = '';
                } else {
                    card.parentElement.style.display = 'none';
                }
            })
        }
    });

}





getData().then(data => {
    renderCards(data);
    toggleCart();
    toggleCheckbox();
    addCard();
    actionPage();
    renderCatalog();
});//getData возвращает fetch-промис, будем получать промис, поэтому вызов этой ф-и можем обработать с помощью then
