'use strict';

// функционал отправки заявок в Телеграм
const TOKEN = '6412981933:AAE6mj4fYc6PbjuUMxuWHmZ4MIrVEHKV95k';
const CHAT_ID ='-1002027809328';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById('success');

document.getElementById('contacts_form').addEventListener('submit', function(e) {
    e.preventDefault();

    let message = `<b>Заявка на расчет стоимости с сайта ТЕХНОСТАР</b>\n`;
    let name = this.name.value;
    let tel = this.phone.value;
    message += `<b>Имя: </b> ${name} \n`;
    message += `<b>Номер телефона: </b> ${tel}`;

    if (name !== '' && tel !== '') {
        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html', 
            text: message
        })
        .then((res) => {
            this.name.value = '';
            this.phone.value ='';
            success.innerHTML = 'Данные отправлены';
            success.style.display = 'block';
            success.style.color = '#fff';
            setTimeout(() => {
            success.style.display = 'none';
            }, 3000);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => {
            console.log('Конец')
        })
    } else {
        success.style.display = 'block';
        success.style.color = 'white';
        success.innerHTML = 'Ведите корректные данные!';
        setTimeout(() => {
            success.style.display = 'none';
            this.name.value = '';
            this.phone.value ='';
        }, 3000);
    }
})
