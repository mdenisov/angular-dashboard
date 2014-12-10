angular.module('resources.products', [])
	.factory('Products', ['ngResource',
		function ($resource) {

			var data = [
				{name: 'Вклады'},
				{name: 'Ипотечные кредиты'},
				{name: 'Потребительские кредиты'},
				{name: 'Кредитные карты'},
				{name: 'Дебетовые карты'},
				{name: 'Автокредиты'},
				{name: 'Кредитование малого и среднего бизнеса'},
				{name: 'Обслуживание юрлиц'},
				{name: 'Лизинг'},
				{name: 'Дистанционное обслуживание'},
				{name: 'Финансовая грамотность'},
				{name: 'Реструктуризация кредитов'},
				{name: 'БКИ'},
				{name: 'Микрозаймы'},
				{name: 'Страхование'}
			];

			var Products = $resource(data);

			return Products;
		}
	]);