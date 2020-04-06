'use strict';

// checkbox
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
// end checkbox

// корзина
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
    })

//end корзина



// работа с корзиной

const cards = document.querySelectorAll('.goods .card'),
cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        console.log(card);
        const cardClone = card.cloneNode(true); // true - клонирует также вложенные элементы
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    })
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}



// end работа с корзиной

