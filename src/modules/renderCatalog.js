import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogBtn = document.querySelector('.catalog-button'),
        catalogList = document.querySelector('.catalog-list'),
        catalogWrapper = document.querySelector('.catalog'),
        categories = new Set(),
        filterTitle = document.querySelector('.filter-title h5');

    cards.forEach((card) => {
        categories.add(card.dataset.category); // add - метод добавления у коллекции set и map, в порядке добавления
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
            // cards.forEach((card) => {
            //     if (card.dataset.category === event.target.textContent) {
            //         card.parentElement.style.display = '';
            //     } else {
            //         card.parentElement.style.display = 'none';
            //     }
            // });
            allLi.forEach((li) => {
                if (li === e.target) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });
            filterTitle.textContent = e.target.textContent;
            filter();
        }
    });
}