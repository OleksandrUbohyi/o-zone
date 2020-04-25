export default function getData() {
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