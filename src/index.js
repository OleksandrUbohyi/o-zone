'use strict';

//импортируем ТОЛЬКО ТЕ функции, которые вызываем ТУТ
//поэтому функцию фильтр не импортируем, т.к. её здесь не вызываем
//браузеры пока не работают с import и export, есть поддердка под флагами в Chrome Canary?

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toggleCart from './modules/toggleCart';
import toggleCheckbox from './modules/toggleCheckbox';
import addCard from './modules/addCard';
import actionPage from './modules/actionPage';


(async function () {
    const db = await getData(); //await - подожди, пока выполнится функция getData(), и только тогда запускай следующую
    // т.е. когда функция асинхронная (фетч, сеттаймаут) - перед ней нужно поставить async

    //все рендеры и изменения на странице желательно выполнять в первую очередь
    renderCards(db);
    renderCatalog();
    toggleCart();
    toggleCheckbox();
    addCard();
    actionPage();

}());

// getData().then(data => {
    //все рендеры и изменения на странице желательно выполнять в первую очередь
//     renderCards(data);
//     renderCatalog();
//     toggleCart();
//     toggleCheckbox();
//     addCard();
//     actionPage();

// });
//getData возвращает fetch-промис, будем получать промис, поэтому вызов этой ф-и можем обработать с помощью then






// npm init -y // y - чтобы не задавал вопросов
// npm i webpack webpack-cli -D
// npx webpack