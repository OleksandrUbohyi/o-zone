import filter from './filter';

export default function actionPage() { // фильтр цены и поиск

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');


    discountCheckbox.addEventListener('change', filter);
    min.addEventListener('change', filter); // слушатель можно и на событие input, но будет более некорректно, будет больше раз срабатывать и нагружать систему.
    max.addEventListener('change', filter);


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