import checkNumInputs from './checkNumInputs';

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		modal = document.querySelector('.popup_calc_end');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
	};
	// методы async await для того чтобы функция ждала res перед завершением
	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text(); // если серверный PHP возвращает текстовые данные
	};

	const clearInputs = () => {
		inputs.forEach((item) => {
			item.value = '';
		});
	};

	form.forEach((item) => {
		item.addEventListener('submit', (e) => {
			// отмена стандартной отправки данных по submit
			e.preventDefault();
			// создаем блок с сообщением
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			//если это последняя форма собираем данные state, отправляем в formData
			let formData = new FormData(item);
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
				setTimeout(() => {
					modal.style.display = 'none';
					document.body.style.overflow = '';
				}, 5000);
			}

			//написание запроса и отправка на сервер. Промис
			postData('assets/server.php', formData)
				.then((res) => {
					statusMessage.textContent = message.success;
					console.log('res1: ', res);
				})
				.catch(() => (statusMessage.textContent = message.failure))
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 1000);
				});
		});
	});
};

export default forms;
