export default function addCard() {
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