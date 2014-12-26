
angular.module('app', [
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
		'ngSwitcher',
		'uiSwitch',
		'cgNotify',
		'ng-breadcrumbs',
		'angular-redactor',
        'lr.upload',
		'ngTagsInput',

        'ui.bootstrap',
		'ui.select2',
        'ui.bankiru',

        'services.i18nNotifications',
        'directives.crud',

        'home',
		'daytheme',
		'lenta',
		'bankpress',
		'interview',
		'author',
		'columnist',
		'history',
		'topic',
		'settings',

		'templates.app',
		'templates.common'
    ])

    .constant('I18N.MESSAGES', {
        'errors.validation.required': 'Обязательно для заполнения.',
        'errors.validation.invalid.email': 'Обязательно для заполнения.',
        'errors.validation.invalid.url': 'Неверная ссылка.',

        'errors.upload.save.error':"При загрузке файла произошла ошибка.",
        'errors.upload.save.success':"Файла успешно загружен.",
        'errors.upload.remove.error':"При удалении файла произошла ошибка.",

        'errors.system.general': 'Произошла системная ошибка.',

        'errors.route.changeError':'Ошибка роутинга.',

        'crud.news.save.success':"Элемент с номером '{{id}}' успешно сохранен.",
        'crud.news.update.success':"Элемент с номером '{{id}}' успешно обновлен.",
        'crud.news.remove.success':"Элемент с номером '{{id}}' успешно удален.",
        'crud.news.remove.error':"При удалении элемента с номером '{{id}}' произошла ошибка",
        'crud.news.save.error':"При сохранении элемента с номером '{{id}}' произошла ошибка."
    })

    .constant('CONFIG', {
        //baseUrl: '/api/index.php'
        baseUrl: '',
		uploadUrl: '/uploads/'
    })

	.config(['$resourceProvider', function($resourceProvider) {
		// Don't strip trailing slashes from calculated URLs
		$resourceProvider.defaults.stripTrailingSlashes = false;
	}])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:'/news'});
    }])

	.config(function(redactorOptions) {
		redactorOptions.lang = 'ru';
		redactorOptions.observeLinks = true;
		redactorOptions.convertVideoLinks = true;
		redactorOptions.buttonSource = true;
		redactorOptions.emoveEmpty = ['strong', 'em', 'span', 'p'];
		redactorOptions.toolbarFixed = false;
		//redactorOptions.toolbarFixedTarget = '.page';
		//redactorOptions.toolbarFixedTopOffset = 195;
		//redactorOptions.scrollTarget = '.page';
		redactorOptions.maxHeight = 800;
		//redactorOptions.plugins = ['table','fullscreen'];
		redactorOptions.pasteBeforeCallback = function(html) {
			html = html.replace(/<br[^>]*>/g, '');
			html = html.replace(/(<font style=\".+?\">|<font face=\".+?\">|<\/font>)/g, '');
			html = html.replace(/(<span style=\".+?\">|<span class=\".+?\">|<\/span>)/g, '');
			html = html.replace(/(<tt>|<\/tt>)/g, '');
			html = html.replace(/(<span style=\"[\s\S]*?\">)/g, '');
			html = html.replace(/\\n+/g, ' ');
			html = html.replace(/ style=\"[^{>,\"}]*\"/g, '');
			html = html.replace(/ class=\"[^{>,\"}]*\"/g, '');
			html = html.replace(/<h1[^>]*>/g, '<p>');
			html = html.replace(/<\/h1>/g, '</p>');
			html = html.replace(/<h2[^>]*>/g, '<p>');
			html = html.replace(/<\/h2>/g, '</p>');
			html = html.replace(/<h3[^>]*>/g, '<p>');
			html = html.replace(/<\/h3>/g, '</p>');
			html = html.replace(/<b[^>]*>/g, '<strong>');
			html = html.replace(/<\/b>/g, '</strong>');
			html = html.replace(/<i[^>]*>/g, '<em>');
			html = html.replace(/<\/i>/g, '</em>');
			html = html.replace(/<big[^>]*>/g, '<strong>');
			html = html.replace(/<\/big>/g, '</strong>');
			html = html.replace(/<strike[^>]*>/g, '<del>');
			html = html.replace(/<\/strike>/g, '</del>');
			html = html.replace(/ - /g, ' � ');

			return html;
		};
	})

	.config(function(tagsInputConfigProvider) {
		tagsInputConfigProvider
			.setDefaults('tagsInput', {
				placeholder: 'New tag',
				addOnEnter: false,
				addFromAutocompleteOnly: true
			})
			.setDefaults('autoComplete', {
				minLength: 1,
				debounceDelay: 0,
				maxResultsToShow: 10,
				addFromAutocompleteOnly: true
			})
			.setActiveInterpolation('tagsInput', {
				placeholder: true,
				addOnEnter: true,
				removeTagSymbol: true
			})
			.setTextAutosizeThreshold(15);
	})

	.service('Products', function($q) {
		var tags = [
			{id: 1, name: 'Вклады'},
			{id: 2, name: 'Ипотечные кредиты'},
			{id: 3, name: 'Потребительские кредиты'},
			{id: 4, name: 'Кредитные карты'},
			{id: 5, name: 'Дебетовые карты'},
			{id: 6, name: 'Автокредиты'},
			{id: 7, name: 'Кредитование малого и среднего бизнеса'},
			{id: 8, name: 'Обслуживание юрлиц'},
			{id: 9, name: 'Лизинг'},
			{id: 10, name: 'Дистанционное обслуживание'},
			{id: 11, name: 'Финансовая грамотность'},
			{id: 12, name: 'Реструктуризация кредитов'},
			{id: 13, name: 'БКИ'},
			{id: 14, name: 'Микрозаймы'},
			{id: 15, name: 'Страхование'}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Banks', function($q) {
		var tags = [
			{"id":289539,"name":"Укрэксимбанк(Киев) (ID: 289539)"},
			{"id":289529,"name":"Фидобанк(Киев) (ID: 289529)"},
			{"id":1334114,"name":"АзияУниверсалБанк(Бишкек) (ID: 1334114)"},
			{"id":284663,"name":"Легбанк(Киев) (ID: 284663)"},
			{"id":1346996,"name":"ЮМК(Краснодар) (ID: 1346996)"},
			{"id":1331966,"name":"Казкоммерцбанк (Кыргызстан)(Бишкек) (ID: 1331966)"},
			{"id":240492,"name":"Лидер(Москва) (ID: 240492)"},
			{"id":792004,"name":"Банка де Економий(Кишинев) (ID: 792004)"},
			{"id":214245,"name":"БелСвиссБанк(Минск) (ID: 214245)"},
			{"id":213714,"name":"МТБанк(Минск) (ID: 213714)"},
			{"id":196995,"name":"Мираф-Банк(Омск) (ID: 196995)"},
			{"id":197016,"name":"Северинвестбанк(Белгород) (ID: 197016)"},
			{"id":196717,"name":"КБЦ(Тверь) (ID: 196717)"},
			{"id":196055,"name":"Булгар Банк(Казань) (ID: 196055)"},
			{"id":195691,"name":"Курган(Курган) (ID: 195691)"},
			{"id":444046,"name":"Армянский Банк Развития(Ереван) (ID: 444046)"},
			{"id":441485,"name":"Араратбанк(Ереван) (ID: 441485)"},
			{"id":195615,"name":"Кранбанк(Иваново) (ID: 195615)"},
			{"id":195251,"name":"Агросоюз(Москва) (ID: 195251)"},
			{"id":195223,"name":"Аксонбанк(Кострома) (ID: 195223)"},
			{"id":366265,"name":"Мерседес-Бенц Банк Рус(Москва) (ID: 366265)"},
			{"id":195190,"name":"Владбизнесбанк(Владимир) (ID: 195190)"},
			{"id":194885,"name":"Мострансбанк(Москва) (ID: 194885)"},
			{"id":194605,"name":"Верхневолжский(Ярославль) (ID: 194605)"},
			{"id":293954,"name":"Мисто Банк(Одесса) (ID: 293954)"},
			{"id":194354,"name":"ИпоТек Банк(Москва) (ID: 194354)"},
			{"id":194298,"name":"Славянбанк(Великий Новгород) (ID: 194298)"},
			{"id":293097,"name":"Идея Банк(Львов) (ID: 293097)"},
			{"id":292323,"name":"Промэкономбанк(Донецк) (ID: 292323)"},
			{"id":194262,"name":"Рублевский(Москва) (ID: 194262)"},
			{"id":111734,"name":"Морган Стэнли Банк(Москва) (ID: 111734)"},
			{"id":186664,"name":"Темпбанк(Москва) (ID: 186664)"},
			{"id":187046,"name":"Московский Нефтехимический Банк(Москва) (ID: 187046)"},
			{"id":17264,"name":"ГПБ-Ипотека(Москва) (ID: 17264)"},
			{"id":189301,"name":"РФИ Банк(Москва) (ID: 189301)"},
			{"id":190314,"name":"K2 Банк(Черкесск) (ID: 190314)"},
			{"id":195629,"name":"Военно-Промышленный Банк(Москва) (ID: 195629)"},
			{"id":140182,"name":"Донбанк(Ростов-на-Дону) (ID: 140182)"},
			{"id":139121,"name":"Данске Банк(Санкт-Петербург) (ID: 139121)"},
			{"id":131248,"name":"Арзамас(Арзамас) (ID: 131248)"},
			{"id":130565,"name":"Евромет(Москва) (ID: 130565)"},
			{"id":129791,"name":"АБ Финанс(Москва) (ID: 129791)"},
			{"id":125713,"name":"Ипотечный Банк Развития Регионов(Ростов-на-Дону) (ID: 125713)"},
			{"id":191982,"name":"РБА(Москва) (ID: 191982)"},
			{"id":191961,"name":"Ренессанс(Москва) (ID: 191961)"},
			{"id":192735,"name":"Вкабанк(Астрахань) (ID: 192735)"},
			{"id":100663,"name":"Уралфинпромбанк(Екатеринбург) (ID: 100663)"},
			{"id":191915,"name":"Муниципальный Камчатпрофитбанк(Петропавловск-Камчатский) (ID: 191915)"},
			{"id":95970,"name":"Уральский Банк Реконструкции и Развития(Екатеринбург) (ID: 95970)"},
			{"id":95880,"name":"Северная Казна(Екатеринбург) (ID: 95880)"}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('BanksInfo', function($q) {
		var tags = [
			{"id":289539,"name":"Укрэксимбанк(Киев) (ID: 289539)"},
			{"id":289529,"name":"Фидобанк(Киев) (ID: 289529)"},
			{"id":1334114,"name":"АзияУниверсалБанк(Бишкек) (ID: 1334114)"},
			{"id":284663,"name":"Легбанк(Киев) (ID: 284663)"},
			{"id":1346996,"name":"ЮМК(Краснодар) (ID: 1346996)"},
			{"id":1331966,"name":"Казкоммерцбанк (Кыргызстан)(Бишкек) (ID: 1331966)"},
			{"id":240492,"name":"Лидер(Москва) (ID: 240492)"},
			{"id":792004,"name":"Банка де Економий(Кишинев) (ID: 792004)"},
			{"id":214245,"name":"БелСвиссБанк(Минск) (ID: 214245)"},
			{"id":213714,"name":"МТБанк(Минск) (ID: 213714)"},
			{"id":196995,"name":"Мираф-Банк(Омск) (ID: 196995)"},
			{"id":197016,"name":"Северинвестбанк(Белгород) (ID: 197016)"},
			{"id":196717,"name":"КБЦ(Тверь) (ID: 196717)"},
			{"id":196055,"name":"Булгар Банк(Казань) (ID: 196055)"},
			{"id":195691,"name":"Курган(Курган) (ID: 195691)"},
			{"id":444046,"name":"Армянский Банк Развития(Ереван) (ID: 444046)"},
			{"id":441485,"name":"Араратбанк(Ереван) (ID: 441485)"},
			{"id":195615,"name":"Кранбанк(Иваново) (ID: 195615)"},
			{"id":195251,"name":"Агросоюз(Москва) (ID: 195251)"},
			{"id":195223,"name":"Аксонбанк(Кострома) (ID: 195223)"},
			{"id":366265,"name":"Мерседес-Бенц Банк Рус(Москва) (ID: 366265)"},
			{"id":195190,"name":"Владбизнесбанк(Владимир) (ID: 195190)"},
			{"id":194885,"name":"Мострансбанк(Москва) (ID: 194885)"},
			{"id":194605,"name":"Верхневолжский(Ярославль) (ID: 194605)"},
			{"id":293954,"name":"Мисто Банк(Одесса) (ID: 293954)"},
			{"id":194354,"name":"ИпоТек Банк(Москва) (ID: 194354)"},
			{"id":194298,"name":"Славянбанк(Великий Новгород) (ID: 194298)"},
			{"id":293097,"name":"Идея Банк(Львов) (ID: 293097)"},
			{"id":292323,"name":"Промэкономбанк(Донецк) (ID: 292323)"},
			{"id":194262,"name":"Рублевский(Москва) (ID: 194262)"},
			{"id":111734,"name":"Морган Стэнли Банк(Москва) (ID: 111734)"},
			{"id":186664,"name":"Темпбанк(Москва) (ID: 186664)"},
			{"id":187046,"name":"Московский Нефтехимический Банк(Москва) (ID: 187046)"},
			{"id":17264,"name":"ГПБ-Ипотека(Москва) (ID: 17264)"},
			{"id":189301,"name":"РФИ Банк(Москва) (ID: 189301)"},
			{"id":190314,"name":"K2 Банк(Черкесск) (ID: 190314)"},
			{"id":195629,"name":"Военно-Промышленный Банк(Москва) (ID: 195629)"},
			{"id":140182,"name":"Донбанк(Ростов-на-Дону) (ID: 140182)"},
			{"id":139121,"name":"Данске Банк(Санкт-Петербург) (ID: 139121)"},
			{"id":131248,"name":"Арзамас(Арзамас) (ID: 131248)"},
			{"id":130565,"name":"Евромет(Москва) (ID: 130565)"},
			{"id":129791,"name":"АБ Финанс(Москва) (ID: 129791)"},
			{"id":125713,"name":"Ипотечный Банк Развития Регионов(Ростов-на-Дону) (ID: 125713)"},
			{"id":191982,"name":"РБА(Москва) (ID: 191982)"},
			{"id":191961,"name":"Ренессанс(Москва) (ID: 191961)"},
			{"id":192735,"name":"Вкабанк(Астрахань) (ID: 192735)"},
			{"id":100663,"name":"Уралфинпромбанк(Екатеринбург) (ID: 100663)"},
			{"id":191915,"name":"Муниципальный Камчатпрофитбанк(Петропавловск-Камчатский) (ID: 191915)"},
			{"id":95970,"name":"Уральский Банк Реконструкции и Развития(Екатеринбург) (ID: 95970)"},
			{"id":95880,"name":"Северная Казна(Екатеринбург) (ID: 95880)"}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Mfo', function($q) {
		var tags = [
			{"id":1,"name":"Домашние деньги (ID: 1)"},
			{"id":2,"name":"Нано-Финанс (ID: 2)"},
			{"id":3,"name":"Pay P. S. (ID: 3)"},
			{"id":4,"name":"Быстроденьги (ID: 4)"},
			{"id":5,"name":"Займо (ID: 5)"},
			{"id":6,"name":"Монетный Двор (ID: 6)"},
			{"id":7,"name":"MoneyMan (ID: 7)"},
			{"id":8,"name":"VIVA Деньги (ID: 8)"},
			{"id":9,"name":"Синергия Капитал (ID: 9)"},
			{"id":10,"name":"Саммит (ID: 10)"},
			{"id":11,"name":"Платиза (ID: 11)"},
			{"id":12,"name":"МигКредит (ID: 12)"},
			{"id":13,"name":"Соломоново решение (ID: 13)"},
			{"id":14,"name":"Займер (ID: 14)"},
			{"id":15,"name":"ФинТерра (ID: 15)"},
			{"id":16,"name":"Сберфонд (ID: 16)"},
			{"id":17,"name":"Мани Фанни (ID: 17)"},
			{"id":18,"name":"test (ID: 18)"},
			{"id":19,"name":"МИЛИ (ID: 19)"},
			{"id":20,"name":" Русмикрофинанс (ID: 20)"}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Rss', function($q) {
		var tags = [
			{id: 1, name: 'в ленту для Яндекс.Новости'},
			{id: 2, name: 'в ленту для Рамблера'},
			{id: 3, name: 'в ленту для @Mail.RU'},
			{id: 4, name: 'в информер @Mail.RU'}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Regions', function($q) {
		var tags = [
			{"id":"11912", "name":"1-е Иткулово"},
			{"id":"10663", "name":"1-е Мая"},
			{"id":"9515", "name":"1-е Новоспасское"},
			{"id":"11911", "name":"1-е Туркменево"},
			{"id":"11299", "name":"3-я Александровка"},
			{"id":"11970", "name":"Абабково"},
			{"id":"7367", "name":"Абага (Амгинский р-н)"},
			{"id":"7482", "name":"Абадзехская"},
			{"id":"2400", "name":"Абаза"},
			{"id":"691", "name":"Абакан"}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Insurance', function($q) {
		var tags = [
			{"id":1,"name":"Росгосстрах (ID: 1)"},
			{"id":2,"name":"СОГАЗ (ID: 2)"},
			{"id":3,"name":"Ингосстрах (ID: 3)"},
			{"id":4,"name":"РЕСО-Гарантия (ID: 4)"},
			{"id":5,"name":"Согласие (ID: 5)"},
			{"id":6,"name":"АльфаСтрахование (ID: 6)"},
			{"id":7,"name":"ВСК (ID: 7)"},
			{"id":8,"name":"Альянс (ID: 8)"},
			{"id":9,"name":"ВТБ Страхование (ID: 9)"},
			{"id":10,"name":"Ренессанс Жизнь (ID: 10)"},
			{"id":11,"name":"Группа Ренессанс Страхование (ID: 11)"},
			{"id":12,"name":"Страховая группа МСК (ID: 12)"},
			{"id":13,"name":"УралСиб (ID: 13)"},
			{"id":14,"name":"МАКС (ID: 14)"},
			{"id":15,"name":"ЖАСО (ID: 15)"},
			{"id":16,"name":"Росгосстрах-Жизнь (ID: 16)"},
			{"id":17,"name":"АльфаСтрахование-Жизнь (ID: 17)"},
			{"id":18,"name":"МетЛайф (ID: 18)"},
			{"id":19,"name":"Гута-Страхование (ID: 19)"},
			{"id":20,"name":"Транснефть (ID: 20)"},
			{"id":21,"name":"Сбербанк страхование жизни (ID: 21)"},
			{"id":22,"name":"Энергогарант (ID: 22)"},
			{"id":23,"name":"Цюрих  (ID: 23)"},
			{"id":24,"name":"ППФ Страхование жизни (ID: 24)"},
			{"id":25,"name":"Капитал Страхование (ID: 25)"},
			{"id":26,"name":"Русский Стандарт Страхование (ID: 26)"},
			{"id":27,"name":"Компаньон (ID: 27)"},
			{"id":28,"name":"Сургутнефтегаз (ID: 28)"},
			{"id":29,"name":"Открытие Страхование (ID: 29)"},
			{"id":30,"name":"Страховая компания Кардиф (ID: 30)"},
			{"id":31,"name":"Сосьете Женераль Страхование Жизни (ID: 31)"},
			{"id":32,"name":"Югория (ID: 32)"},
			{"id":33,"name":"Хоум Кредит Страхование (ID: 33)"},
			{"id":34,"name":"СиВ Лайф (ID: 34)"},
			{"id":35,"name":"Северная казна (ID: 35)"},
			{"id":36,"name":"Альянс Жизнь (ID: 36)"},
			{"id":37,"name":"Благосостояние (ID: 37)"},
			{"id":38,"name":"Русская страховая транспортная компания (РСТК) (ID: 38)"},
			{"id":39,"name":"ЭРГО Русь (ID: 39)"},
			{"id":40,"name":"Оранта (ID: 40)"},
			{"id":41,"name":"Респект-Полис (ID: 41)"},
			{"id":42,"name":"Райффайзен Лайф (ID: 42)"},
			{"id":43,"name":"Национальная страховая компания Татарстан (ID: 43)"},
			{"id":44,"name":"Национальная Страховая Группа (ID: 44)"},
			{"id":45,"name":"Компания Банковского Страхования (ID: 45)"},
			{"id":46,"name":"АИГ страховая компания (ID: 46)"},
			{"id":47,"name":"СК СОГАЗ-Жизнь (ID: 47)"},
			{"id":48,"name":"РСХБ-Страхование (ID: 48)"},
			{"id":49,"name":"Чрезвычайная страховая компания (ID: 49)"},
			{"id":50,"name":"Либерти Страхование (ID: 50)"}
		];

		this.search = function(query) {
			var items, deferred = $q.defer();

			items = _.chain(tags)
				.filter(function(x) {
					return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
				})
				.take(10)
				.value();

			deferred.resolve(items);
			return deferred.promise;
		};

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

    .controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'breadcrumbs', 'localizedMessages', 'notify', 'Products', 'Banks', 'BanksInfo', 'Mfo', 'Rss', 'Regions', 'Insurance',
        function($scope, $location, i18nNotifications, breadcrumbs, localizedMessages, $notify, Products, Banks, BanksInfo, Mfo, Rss, Regions, Insurance) {

            $scope.notifications = i18nNotifications;
			$scope.breadcrumbs = breadcrumbs;
			$scope.$notify = $notify;


			$scope.messages = {
				validation: {
					required: localizedMessages.get('errors.validation.required'),
					invalidEmail: localizedMessages.get('errors.validation.invalid.email'),
					invalidUrl: localizedMessages.get('errors.validation.invalid.url')
				}
			};

			$scope.$notify.config({
                startTop: 110,
				container: $('.page'),
                templateUrl: 'views/notify.tpl.html'
            });

			$scope.acceptImageTypes = 'image/*';

			$scope.isNavbarActive = function (navBarPath) {
				return navBarPath === breadcrumbs.getFirst().name;
			};

			$scope.hasPendingRequests = function () {
                return httpRequestTracker.hasPendingRequests();
			};

            $scope.removeNotification = function (notification) {
                i18nNotifications.remove(notification);
            };

            $scope.$on('$routeChangeSuccess', function(event, current) {
				$scope.showSidebar = false;
			});

            $scope.$on('$routeChangeError', function(event, current, previous, rejection) {
                i18nNotifications.push('errors.route.changeError', 'error', {}, {rejection: rejection});
            });

			// Toggle Sidebar
			$scope.showSidebar = false;
			$scope.toggleMenu = function() {
				$scope.showSidebar = !$scope.showSidebar;
			};

			$scope.home = function () {
				$location.path('/news');
			};

			$scope.openDatepicker = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Autocomplete
			$scope.getProducts = function(query) {
				return Products.search(query);
			};
			$scope.getBanks = function(query) {
				return Banks.search(query);
			};
			$scope.getBanksInfo = function(query) {
				return BanksInfo.search(query);
			};
			$scope.getMfo = function(query) {
				return Mfo.search(query);
			};
			$scope.getRss = function(query) {
				return Rss.search(query);
			};
			$scope.getRegions = function(query) {
				return Regions.search(query);
			};
			$scope.getInsurance = function(query) {
				return Insurance.search(query);
			};
			
			$scope.otherServices = '<ul class="services"><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li></ul>';
        }
    ])

    .controller('SidebarCtrl', ['$scope', '$location', '$route',
        function ($scope, $location, $route) {

			$scope.isActive = function(path) {
                return $location.path().substr(0, path.length) === path;
			};

			$scope.home = function () {
				$location.path('/news');
			};

        }
    ])

    .run(function ($rootScope, $timeout) {
        $rootScope.page = $('.page');
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function() {
                $rootScope.page.scrollTop(0, 0);
            }, 100);
        });
    });

angular.module('author', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Author', 'Author', ['Авторы', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsAuthorListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/author'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/author/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/author/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsAuthorEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/author');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/author');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('bankpress', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Bankpress', 'Bankpress', ['Мониторинг банковской прессы', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsBankpressListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/bankpress'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/bankpress/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/bankpress/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsBankpressEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/bankpress');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/bankpress');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('columnist', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Columnist', 'Columnist', ['Мнение', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsColumnistListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/columnist'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/columnist/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/columnist/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsColumnistEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/columnist');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/columnist');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('daytheme', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Daytheme', 'Daytheme', ['Тема дня', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsDaythemeListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/daytheme'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/daytheme/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/daytheme/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsDaythemeEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('history', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.history',

		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'History', '', ['История изменений', 'Истории изменений'])

			.when('/news/history/:itemId', {
				label: 'Просмотр истории',
				templateUrl:'views/history/list.tpl.html',
				controller:'NewsHistoryListCtrl',
				resolve:{
					items: ['$route', 'History', function ($route, History) {
						return History.all();
					}]
				}
			})
			.when('/news/:category/history/:itemId', {
				label: 'Просмотр истории',
				templateUrl:'views/history/list.tpl.html',
				controller:'NewsHistoryListCtrl',
				resolve:{
					items: ['$route', 'History', function ($route, History) {
						return History.all();
					}]
				}
			})
			.when('/news/history/:itemId/revert/:commitId', {
				label: 'Редактирование новости',
				templateUrl:'views/history/edit.tpl.html',
				controller:'NewsHistoryEditCtrl',
				resolve:{
					item: ['$route', 'History', function ($route, History) {
						return History.getById($route.current.params.commitId);
					}]
				}
			});

	}])

    .controller('NewsHistoryListCtrl', ['$scope', '$route', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout', '$modal',
		function ($scope, $route, $location, crudListMethods, items, i18nNotifications, $timeout, $modal) {
			$scope.items = $scope.filtered = items;

			angular.forEach($scope.items, function (item) {
				item.id = parseFloat(item.id);
			});

			angular.extend($scope, crudListMethods('/news/history'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.revert = function(id) {
				var itemId = $route.current.params.itemId;
				if (itemId) {
					$location.path('/news/history/' + itemId + '/revert/' + id);
				}
			};

			$scope.show = function(item, $index, $event) {
				var modalInstance = $modal.open({
					templateUrl: 'views/modals/history.tpl.html',
					controller: 'NewsHistoryModalCtrl',
					size: 'lg',
					resolve: {
						item: function () {
							return $scope.items[0];
						}
					}
				});
			};

		}
	])

	.controller('NewsHistoryEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications',
		function ($scope, $location, item, i18nNotifications) {

			$scope.item = item;

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

		}
	])

	.controller('NewsHistoryModalCtrl', ['$scope', '$modalInstance', 'item', 'i18nNotifications',
		function ($scope, $modalInstance, item, i18nNotifications) {

			$scope.item = item;

			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};

		}
	]);

angular.module('home', [
		'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Home', '', ['Новости', 'Новости'])
			.whenList({
                items: ['News', function(News) {
                    return News.all();
                }]
			})
			.when('/news/edit/:itemId', {
				label: 'Редактирование новости',
				templateUrl:'views/home/edit.tpl.html',
				controller:'NewsEditCtrl',
				resolve:{
					item: ['$route', 'News', function ($route, News) {
						return News.getById($route.current.params.itemId);
					}]
				}
			})

	}])

	.controller('NewsListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/edit'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = false;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/edit/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('interview', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Interview', 'Interview', ['Интервью', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsInterviewListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/interview'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/interview/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/interview/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsInterviewEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/interview');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/interview');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('lenta', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Lenta', 'Lenta', ['Лента новостей', 'новости'])

			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

	}])

    .controller('NewsLentaListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/lenta'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/lenta/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/lenta/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsLentaEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/lenta');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/lenta');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);

angular.module('settings', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

        'resources.settings'
    ])

    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Settings', 'Settings', '', ['Настройки', 'Настроек'])
            .when('/settings', {
                label: 'Редактирование настроек',
                templateUrl:'views/settings/edit.tpl.html',
                controller:'SettingsEditCtrl',
                resolve:{
                    item: ['$route', 'Settings', function ($route, Settings) {
                        return Settings.getById(1);
                    }]
                }
            })

    }])

    .controller('SettingsEditCtrl', ['$scope', '$location', 'crudListMethods', 'item', 'i18nNotifications',
        function ($scope, $location, crudListMethods, item, i18nNotifications) {
            $scope.item = item;

            angular.extend($scope, crudListMethods('/settings'));

            $scope.onSave = function (item) {
                i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
            };

            $scope.onError = function() {
                i18nNotifications.push('crud.news.save.error', 'error');
            };
        }
    ]);

angular.module('topic', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

        'resources.topic',

        'filters.pagination'
    ])

    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Topic', 'Topic', '', ['Сюжеты', 'Сюжета'])

            .whenList({
                items: ['Topic', function(Topic) {
                    return Topic.all();
                }]
            })
            .whenNew({
                item: ['Topic', function(Topic) {
                    return new Topic();
                }]
            })
            .whenEdit({
                item: ['$route', 'Topic', function ($route, News) {
                    return News.getById($route.current.params.itemId);
                }]
            });

    }])

    .controller('TopicListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
        function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
            $scope.items = $scope.filtered = items;

            angular.forEach($scope.items, function (item) {
                item.id = parseFloat(item.id);
            });

            angular.extend($scope, crudListMethods('/topic'));

            // pagination controls
            $scope.currentPage = 1;
            $scope.filteredItems = $scope.items.length;
            $scope.entryLimit = 20;
            $scope.totalItems = $scope.items.length;

            $scope.canCreateNew = true;

            // Sort logics
            $scope.orderBy = 'id';
            $scope.reverse = true;

            $scope.sort = function(orderBy) {
                $scope.orderBy = orderBy;
                $scope.reverse = !$scope.reverse;
            };

            $scope.isSortUp = function(fieldName) {
                return $scope.orderBy === fieldName && !$scope.reverse;
            };

            $scope.isSortDown = function(fieldName) {
                return $scope.orderBy === fieldName && $scope.reverse;
            };

            // Items logic
            $scope.toggleActive = function(item, $index, $event) {
                item.active = !(item.active);
                item.$update(function() {
                    i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
                });
            };

            $scope.toggleShowInBlock = function(item, $index, $event) {
                item.show_in_block = !(item.show_in_block);
                item.$update(function() {
                    i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
                });
            };

        }
    ])

    .controller('TopicEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications', 'upload',
        function ($scope, $location, item, i18nNotifications, upload) {

            $scope.item = item;

            $scope.redactorOptions = {
                buttons: ['formatting', '|', 'bold', 'italic']
            };

            $scope.onSave = function (item) {
                i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
                $location.path('/topic');
            };

            $scope.onError = function() {
                i18nNotifications.push('crud.news.save.error', 'error');
            };

            $scope.onRemove = function(item) {
                i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
                $location.path('/topic');
            };

            $scope.open = function($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.closeAll();
                $scope.datepickers[opened] = true;
            };
            $scope.closeAll = function() {
                $scope.datepickers = [];
            };

            // File uploader
            $scope.acceptTypes = 'image/*';
            $scope.removeImage = function() {
                $scope.item.image = undefined;
            };
            $scope.onError = function (response) {
                i18nNotifications.push('errors.upload.save.error', 'error');
            };
            $scope.onComplete = function (response) {
                i18nNotifications.push('errors.upload.save.success', 'success');
                $scope.item.image = response.data.file;
            };

        }
    ]);
angular.module('directives.crud', ['directives.crud.buttons', 'directives.crud.edit']);
angular.module('directives.crud.buttons', [])

    .directive('crudButtons', function () {
        return {
            restrict:'E',
            replace:true,
            template:
                '<div>' +
					'  <button type="button" class="btn btn-primary save" ng-click="save()" ng-disabled="!canSave()">Сохранить</button>' +
					'  <button type="button" class="btn btn-warning revert" ng-click="revertChanges()" ng-disabled="!canRevert()">Отменить</button>' +
					'  <button type="button" class="btn btn-danger remove" ng-click="remove()" ng-show="canRemove()">Удалить</button>' +
                '</div>'
        };
    });
angular.module('directives.crud.edit', [])

// Apply this directive to an element at or below a form that will manage CRUD operations on a resource.
// - The resource must expose the following instance methods: $saveOrUpdate(), $id() and $remove()
    .directive('crudEdit', ['$parse', function($parse) {
        return {
            // We ask this directive to create a new child scope so that when we add helper methods to the scope
            // it doesn't make a mess of the parent scope.
            // - Be aware that if you write to the scope from within the form then you must remember that there is a child scope at the point
            scope: true,
            // We need access to a form so we require a FormController from this element or a parent element
            require: '^form',
            // This directive can only appear as an attribute
            link: function(scope, element, attrs, form) {
                // We extract the value of the crudEdit attribute
                // - it should be an assignable expression evaluating to the model (resource) that is going to be edited
                var resourceGetter = $parse(attrs.crudEdit);
                var resourceSetter = resourceGetter.assign;
                // Store the resource object for easy access
                var resource = resourceGetter(scope);
                // Store a copy for reverting the changes
                var original = angular.copy(resource);

                var checkResourceMethod = function(methodName) {
                    if ( !angular.isFunction(resource[methodName]) ) {
                        throw new Error('crudEdit directive: The resource must expose the ' + methodName + '() instance method');
                    }
                };
                checkResourceMethod('$saveOrUpdate');
                checkResourceMethod('$id');
                checkResourceMethod('$remove');

                // This function helps us extract the callback functions from the directive attributes
                var makeFn = function(attrName) {
                    var fn = scope.$eval(attrs[attrName]);
                    if ( !angular.isFunction(fn) ) {
                        throw new Error('crudEdit directive: The attribute "' + attrName + '" must evaluate to a function');
                    }
                    return fn;
                };
                // Set up callbacks with fallback
                // onSave attribute -> onSave scope -> noop
                var userOnSave = attrs.onSave ? makeFn('onSave') : ( scope.onSave || angular.noop );
                var onSave = function(result, status, headers, config) {
                    // Reset the original to help with reverting and pristine checks
                    original = result;
                    userOnSave(result, status, headers, config);
                };
                // onRemove attribute -> onRemove scope -> onSave attribute -> onSave scope -> noop
                var onRemove = attrs.onRemove ? makeFn('onRemove') : ( scope.onRemove || onSave );
                // onError attribute -> onError scope -> noop
                var onError = attrs.onError ? makeFn('onError') : ( scope.onError || angular.noop );

                // The following functions should be triggered by elements on the form
                // - e.g. ng-click="save()"
                scope.save = function() {
                    resource.$saveOrUpdate(onSave, onSave, onError, onError);
                };
                scope.revertChanges = function() {
                    resource = angular.copy(original);
                    resourceSetter(scope, resource);
                    form.$setPristine();
                };
                scope.remove = function() {
                    if(resource.$id()) {
                        resource.$remove(onRemove, onError);
                    } else {
                        onRemove();
                    }
                };

                // The following functions can be called to modify the behaviour of elements in the form
                // - e.g. ng-disable="!canSave()"
                scope.canSave = function() {
                    return form.$valid && !angular.equals(resource, original);
                };
                scope.canRevert = function() {
                    return !angular.equals(resource, original);
                };
                scope.canRemove = function() {
                    return resource.$id();
                };
                /**
                 * Get the CSS classes for this item, to be used by the ng-class directive
                 * @param {string} fieldName The name of the field on the form, for which we want to get the CSS classes
                 * @return {object} A hash where each key is a CSS class and the corresponding value is true if the class is to be applied.
                 */
                scope.getCssClasses = function(fieldName) {
                    var ngModelController = form[fieldName];
                    return {
                        error: ngModelController.$invalid && !angular.equals(resource, original),
                        success: ngModelController.$valid && !angular.equals(resource, original)
                    };
                };
                /**
                 * Whether to show an error message for the specified error
                 * @param {string} fieldName The name of the field on the form, of which we want to know whether to show the error
                 * @param  {string} error - The name of the error as given by a validation directive
                 * @return {Boolean} true if the error should be shown
                 */
                scope.showError = function(fieldName, error) {
                    return form[fieldName].$error[error];
                };

                scope.isInvalid = function(fieldName) {
                    var ngModelController = form[fieldName];
                    return ngModelController.$invalid ? 'has-error' : '';
                };
            }
        };
    }]);
angular.module("ui.bankiru", [])

	.directive( 'popoverHtmlPopup', [ function() {
		return {
			restrict: 'EA',
			replace: true,
			scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
			templateUrl: 'views/directives/popover/popover-html.tpl.html'
		};
	}])

	.directive( 'popoverHtml', [ '$compile', '$timeout', '$parse', '$window', '$tooltip', function ( $compile, $timeout, $parse, $window, $tooltip ) {
		return $tooltip( 'popoverHtml', 'popover', 'click' );
	}]);
angular.module('show-errors', [])

    .directive('showErrors', [
        '$timeout', 'showErrorsConfig', function($timeout, showErrorsConfig) {
            var getShowSuccess, getTrigger, linkFn;
            getTrigger = function(options) {
                var trigger;
                trigger = showErrorsConfig.trigger;
                if (options && (options.trigger != null)) {
                    trigger = options.trigger;
                }
                return trigger;
            };
            getShowSuccess = function(options) {
                var showSuccess;
                showSuccess = showErrorsConfig.showSuccess;
                if (options && (options.showSuccess != null)) {
                    showSuccess = options.showSuccess;
                }
                return showSuccess;
            };
            linkFn = function(scope, el, attrs, formCtrl) {
                var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses, trigger;
                blurred = false;
                options = scope.$eval(attrs.showErrors);
                showSuccess = getShowSuccess(options);
                trigger = getTrigger(options);
                inputEl = el[0].querySelector('.form-control[name]');
                inputNgEl = angular.element(inputEl);
                inputName = inputNgEl.attr('name');
                if (!inputName) {
                    throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
                }
                inputNgEl.bind(trigger, function() {
                    blurred = true;
                    return toggleClasses(formCtrl[inputName].$invalid);
                });
                scope.$watch(function() {
                    return formCtrl[inputName] && formCtrl[inputName].$invalid;
                }, function(invalid) {
                    if (!blurred) {
                        return;
                    }
                    return toggleClasses(invalid);
                });
                scope.$on('show-errors-check-validity', function() {
                    return toggleClasses(formCtrl[inputName].$invalid);
                });
                scope.$on('show-errors-reset', function() {
                    return $timeout(function() {
                        el.removeClass('has-error');
                        el.removeClass('has-success');
                        return blurred = false;
                    }, 0, false);
                });
                return toggleClasses = function(invalid) {
                    el.toggleClass('has-error', invalid);
                    if (showSuccess) {
                        return el.toggleClass('has-success', !invalid);
                    }
                };
            };
            return {
                restrict: 'A',
                require: '^form',
                compile: function(elem, attrs) {
                    if (!elem.hasClass('form-group')) {
                        throw "show-errors element does not have the 'form-group' class";
                    }
                    return linkFn;
                }
            };
        }
    ])

    .provider('showErrorsConfig', function() {
        var _showSuccess, _trigger;
        _showSuccess = false;
        _trigger = 'blur';
        this.showSuccess = function(showSuccess) {
            return _showSuccess = showSuccess;
        };
        this.trigger = function(trigger) {
            return _trigger = trigger;
        };
        this.$get = function() {
            return {
                showSuccess: _showSuccess,
                trigger: _trigger
            };
        };
    });
'use strict';

angular.module('ngSwitcher', [])
    .directive('uiSwitch', ['$window', '$timeout','$log', '$parse', function($window, $timeout, $log, $parse) {

        /**
         * Initializes the HTML element as a Switchery switch.
         *
         * $timeout is in place as a workaround to work within angular-ui tabs.
         *
         * @param scope
         * @param elem
         * @param attrs
		 * @param ngModel
         */
        function linkSwitchery(scope, elem, attrs, ngModel) {
            if(!ngModel) return false;
            var options = {};
            try {
                options = $parse(attrs.uiSwitch)(scope);
            }
            catch (e) {}
            var switcher;
            var previousDisabledValue;
            // Watch for attribute changes to recreate the switch if the 'disabled' attribute changes
            attrs.$observe('disabled', function(value) {
                if (value == undefined || value == previousDisabledValue) {
                    return;
                } else {
                    previousDisabledValue = value;
                }
                initializeSwitch();
            });

            function initializeSwitch() {
                $timeout(function() {
                    // Remove any old switcher
                    if (switcher) {
                        angular.element(switcher.switcher).remove();
                    }

                    // (re)create switcher to reflect latest state of the checkbox element
                    switcher = new $window.Switchery(elem[0], options);
                    var element = switcher.element,
                        checked = !!(scope.initValue == 1 || scope.initValue == true);

                    switcher.setPosition(checked);

                    element.addEventListener('change',function(evt) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(element.checked);
                        })
                    })
                }, 0);
            }
            initializeSwitch();
          }

        return {
            require: 'ngModel',
            restrict: 'AE',
            scope : {initValue : '=ngModel'},
            link: linkSwitchery
        }
    }]);

angular.module('filters.dateStartRange', [])
	.filter('dateStartRangeFilter', function() {
		return function(items, startDate, endDate) {
			var filteredResult = [];

			// Parse from the filter format 'dd/mm/yyyy' (Turkish culture)
			function parseDateFromFilter(strDate) {
//				var parts = strDate.split(' ');
//				return new Date(parts[2], parts[1] - 1, parts[0]);
				return new Date(strDate);
			}

			// Parse the UTC time data from JSON source
			function parseDateFromUtc(utcStr) {
				return new Date(utcStr);
			}

			// Defaults
//			var parsedStartDate = startDate ? parseDateFromFilter(startDate) : new Date(1900, 1, 1);
//			var parsedEndDate = endDate ? parseDateFromFilter(endDate) : new Date();
			var parsedStartDate = startDate ? parseDateFromUtc(startDate) : new Date(1900, 1, 1);
			var parsedEndDate = endDate ? parseDateFromUtc(endDate) : new Date();

			// Take action if the filter elements are filled
			if (typeof startDate !== "undefined" || typeof endDate !== "undefined") {

				items.forEach(function(item) {
					if (parseDateFromUtc(item.date_start) >= parsedStartDate && parseDateFromUtc(item.date_finish) <= parsedEndDate) {
						filteredResult.push(item);
					}
				});

			} else {
				return items; // By default, show the regular table data
			}

			return filteredResult;
		}
	})
angular.module('filters.idRange', [])
	.filter('idRangeFilter', function() {
		return function(items, startId, endId) {
			var filteredResult = [];

			var idFrom = startId ? parseInt(startId,10) : 1;
			var idTo = endId ? parseInt(endId,10) : 4294967296;

			// Take action if the filter elements are filled
			if (startId || endId) {

				items.forEach(function(item) {
					if (parseInt(item.id,10) >= idFrom && parseInt(item.id,10) <= idTo) {
						filteredResult.push(item);
					}
				});

			} else {
				return items; // By default, show the regular table data
			}

			return filteredResult;
		}
	})
angular.module('filters.pagination', [])
	.filter('paginationFilter', function () {
		return function(input, start) {
			if (input) {
				start = +start; //parse to int
				return input.slice(start);
			}
			return [];
		};
	});
angular.module('filters.startsWithA', [])
	.filter('startsWithA', function () {
		return function (items) {
			var filteredResult = [];

			if (query) {

				items.forEach(function(item) {
					if (/a/i.test(item.name.substring(0, 1))) {
						filteredResult.push(item);
					}
				});

			} {
				return items;
			}

			return filteredResult;
		};
	});
'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "AM",
      "PM"
    ],
    "DAY": [
      "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
      "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
      "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
      "\u0441\u0440\u0435\u0434\u0430",
      "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
      "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
      "\u0441\u0443\u0431\u0431\u043e\u0442\u0430"
    ],
    "MONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044f",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044f",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440\u0435\u043b\u044f",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044f",
      "\u043d\u043e\u044f\u0431\u0440\u044f",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"
    ],
    "SHORTDAY": [
      "\u0432\u0441",
      "\u043f\u043d",
      "\u0432\u0442",
      "\u0441\u0440",
      "\u0447\u0442",
      "\u043f\u0442",
      "\u0441\u0431"
    ],
    "SHORTMONTH": [
      "\u044f\u043d\u0432.",
      "\u0444\u0435\u0432\u0440.",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440.",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433.",
      "\u0441\u0435\u043d\u0442.",
      "\u043e\u043a\u0442.",
      "\u043d\u043e\u044f\u0431.",
      "\u0434\u0435\u043a."
    ],
    "fullDate": "EEEE, d MMMM y '\u0433'.",
    "longDate": "d MMMM y '\u0433'.",
    "medium": "d MMM y '\u0433'. H:mm:ss",
    "mediumDate": "d MMM y '\u0433'.",
    "mediumTime": "H:mm:ss",
    "short": "dd.MM.yy H:mm",
    "shortDate": "dd.MM.yy",
    "shortTime": "H:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u0440\u0443\u0431.",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "ru-ru",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

angular.module('dataResource', [])
    .factory('dataResource', ['CONFIG', '$http', '$q',
        function(CONFIG, $http, $q) {

            function DataResourceFactory(collectionName) {

                var url = CONFIG.baseUrl + '/' + collectionName;
                var defaultParams = {};

                var thenFactoryMethod = function(httpPromise, successcb, errorcb, isArray) {
                    var scb = successcb || angular.noop;
                    var ecb = errorcb || angular.noop;

                    return httpPromise.then(function(response) {
                        var result;
                        if (isArray) {
                            result = [];
                            for (var i = 0; i < response.data.length; i++) {
                                result.push(new Resource(response.data[i]));
                            }
                        } else {
                            if (response.data === " null ") {
                                return $q.reject({
                                    code: 'resource.notfound',
                                    collection: collectionName
                                });
                            } else {
                                result = new Resource(response.data);
                            }
                        }
                        scb(result, response.status, response.headers, response.config);
                        return result;
                    }, function(response) {
                        ecb(undefined, response.status, response.headers, response.config);
                        return undefined;
                    });
                };

                var Resource = function(data) {
                    angular.extend(this, data);
                };

                Resource.all = function(cb, errorcb) {
                    return Resource.query({}, cb, errorcb);
                };

                Resource.query = function(queryJson, successcb, errorcb) {
                    var q = [],
                        params = angular.isObject(queryJson) ?
                        (angular.extend({}, defaultParams, queryJson))
                        : {};

                    angular.forEach(params, function(value, key) {
                        q.push(key);
                        q.push(value);
                    });

                    var httpPromise = $http.get(url + '/' + q.join('/'));
                    return thenFactoryMethod(httpPromise, successcb, errorcb, true);
                };

                Resource.getById = function(id, successcb, errorcb) {
                    var httpPromise = $http.get(url + '/' + id, {
                        params: defaultParams
                    });
                    return thenFactoryMethod(httpPromise, successcb, errorcb);
                };

                Resource.getByIds = function(ids, successcb, errorcb) {
                    var qin = [];
                    angular.forEach(ids, function(id) {
                        qin.push({
                            $oid: id
                        });
                    });
                    return Resource.query({
                        id: {
                            $in: qin
                        }
                    }, successcb, errorcb);
                };

                //instance methods

                Resource.prototype.$id = function() {
//                    if (this.id && this.id.$oid) {
                    if (this.id) {
                        return this.id;
                    }
                };

                Resource.prototype.$save = function(successcb, errorcb) {
                    var httpPromise = $http.post(url, this, {
                        params: defaultParams
                    });
                    return thenFactoryMethod(httpPromise, successcb, errorcb);
                };

                Resource.prototype.$update = function(successcb, errorcb) {
                    var httpPromise = $http.put(url + "/" + this.$id(), angular.extend({}, this, {
//                        id: undefined
                    }), {
                        params: defaultParams
                    });
                    return thenFactoryMethod(httpPromise, successcb, errorcb);
                };

                Resource.prototype.$remove = function(successcb, errorcb) {
                    var httpPromise = $http['delete'](url + "/" + this.$id(), {
                        params: defaultParams
                    });
                    return thenFactoryMethod(httpPromise, successcb, errorcb);
                };

                Resource.prototype.$saveOrUpdate = function(savecb, updatecb, errorSavecb, errorUpdatecb) {
                    if (this.$id()) {
                        return this.$update(updatecb, errorUpdatecb);
                    } else {
                        return this.$save(savecb, errorSavecb);
                    }
                };

                return Resource;
            }
            return DataResourceFactory;
        }
    ]);
angular.module('resources.history', [])
	.factory('History', ['dataResource',
		function ($dataResource) {

			var History = $dataResource('news');

			return History;
		}
	]);
angular.module('resources.news', [])
	.factory('News', ['dataResource',
		function ($dataResource) {

			var News = $dataResource('news');

			News.prototype.isActive = function () {
                return (this.active && (this.active == true || this.active == 1));
            };
			News.prototype.isBlocked = function () {
                return (this.block && (this.block == true || this.block == 1));
            };
			News.prototype.isNeedCorrection = function () {
                return (this.correction && (this.correction == true || this.correction == 1));
            };

			return News;
		}
	]);
angular.module('resources.products', [])
	.factory('Products', ['ngResource',
		function ($resource) {

			var data = [
				{name: '������'},
				{name: '��������� �������'},
				{name: '��������������� �������'},
				{name: '��������� �����'},
				{name: '��������� �����'},
				{name: '�����������'},
				{name: '������������ ������ � �������� �������'},
				{name: '������������ �����'},
				{name: '������'},
				{name: '������������� ������������'},
				{name: '���������� �����������'},
				{name: '���������������� ��������'},
				{name: '���'},
				{name: '����������'},
				{name: '�����������'}
			];

			var Products = $resource(data);

			return Products;
		}
	]);
angular.module('resources.settings', [])
	.factory('Settings', ['dataResource',
		function ($dataResource) {

			var Settings = $dataResource('settings');

			return Settings;
		}
	]);
angular.module('resources.topic', [])
	.factory('Topic', ['dataResource',
		function ($dataResource) {

			var Topic = $dataResource('topic');

			return Topic;
		}
	]);
angular.module('services.crud', ['services.crudRouteProvider']);
angular.module('services.crud').factory('crudEditMethods', function() {

    return function(itemName, item, formName, successcb, errorcb) {

        var mixin = {};

        mixin[itemName] = item;
        mixin[itemName + 'Copy'] = angular.copy(item);

        mixin.save = function() {
            this[itemName].$saveOrUpdate(successcb, successcb, errorcb, errorcb);
        };

        mixin.canSave = function() {
            return this[formName].$valid && !angular.equals(this[itemName], this[itemName + 'Copy']);
        };

        mixin.revertChanges = function() {
            this[itemName] = angular.copy(this[itemName + 'Copy']);
        };

        mixin.canRevert = function() {
            return !angular.equals(this[itemName], this[itemName + 'Copy']);
        };

        mixin.remove = function() {
            if (this[itemName].$id()) {
                this[itemName].$remove(successcb, errorcb);
            } else {
                successcb();
            }
        };

        mixin.canRemove = function() {
            return item.$id();
        };

        /**
         * Get the CSS classes for this item, to be used by the ng-class directive
         * @param {string} fieldName The name of the field on the form, for which we want to get the CSS classes
         * @return {object} A hash where each key is a CSS class and the corresponding value is true if the class is to be applied.
         */
        mixin.getCssClasses = function(fieldName) {
            var ngModelController = this[formName][fieldName];
            return {
                error: ngModelController.$invalid && ngModelController.$dirty,
                success: ngModelController.$valid && ngModelController.$dirty
            };
        };

        /**
         * Whether to show an error message for the specified error
         * @param {string} fieldName The name of the field on the form, of which we want to know whether to show the error
         * @param  {string} error - The name of the error as given by a validation directive
         * @return {Boolean} true if the error should be shown
         */
        mixin.showError = function(fieldName, error) {
            return this[formName][fieldName].$error[error];
        };

        return mixin;
    };
});

angular.module('services.crud').factory('crudListMethods', ['$location',
    function($location) {

        return function(pathPrefix) {

            var mixin = {};

            mixin['new'] = function() {
                $location.path(pathPrefix + '/new');
            };

            mixin['edit'] = function(itemId) {
                $location.path(pathPrefix + '/' + itemId);
            };

            return mixin;
        };
    }
]);

function crudRouteProvider($routeProvider) {

    this.$get = angular.noop;

    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider.routesFor('MyBook', '/myApp');
    // });
    // ```
    //
    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider('MyBook', '/myApp');
    // });
    // ```
    //
    // In any case, the point is that this function is the key part of this "provider helper".
    // We use it to create routes for CRUD operations.  We give it some basic information about
    // the resource and the urls then it it returns our own special routeProvider.
    this.routesFor = function(resourceName, moduleName, routePrefix, labels) {
        var baseUrl = resourceName.toLowerCase();
        var baseRoute = '/' + resourceName.toLowerCase();
        var baseTplUrl = baseUrl;
        var routeLabels = [];
        //routePrefix = routePrefix || moduleName;

        // Prepend the urlPrefix if available.
        //if (angular.isString(urlPrefix) && urlPrefix !== '') {
        //    baseUrl = baseUrl + '/' + urlPrefix.toLowerCase();
			//baseTplUrl = baseTplUrl + '/' + urlPrefix.toLowerCase();
        //}

        // Prepend the routePrefix if it was provided;
        if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
            baseRoute = baseRoute + '/' + routePrefix.toLowerCase();
        }

		// Labels for breadcrumbs
		// ['Разделы', 'Раздела']
		if (labels !== null && labels !== undefined && labels !== '' && angular.isArray(labels) && labels.length === 2) {
			routeLabels[0] = labels[0];
			routeLabels[1] = 'Добавление ' + labels[1].toLowerCase();
			routeLabels[2] = 'Редактирование ' + labels[1].toLowerCase();
			routeLabels[3] = 'Просмотр ' + labels[1].toLowerCase();
		}

        // Create the templateUrl for a route to our resource that does the specified operation.
        var templateUrl = function(operation) {
            return 'views' + '/' + moduleName.toLowerCase() + '/' + operation.toLowerCase() + '.tpl.html';
        };
        // Create the controller name for a route to our resource that does the specified operation.
        var controllerName = function(operation) {
            return resourceName + routePrefix + operation + 'Ctrl';
        };

        // This is the object that our `routesFor()` function returns.  It decorates `$routeProvider`,
        // delegating the `when()` and `otherwise()` functions but also exposing some new functions for
        // creating CRUD routes.  Specifically we have `whenList(), `whenNew()` and `whenEdit()`.
        var routeBuilder = {
            // Create a route that will handle showing a list of items
            whenList: function(resolveFns) {
                routeBuilder.when(baseRoute, {
					label: routeLabels[0] || '',
                    templateUrl: templateUrl('List'),
                    controller: controllerName('List'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle creating a new item
            whenNew: function(resolveFns) {
                routeBuilder.when(baseRoute + '/new', {
					label: routeLabels[1] || '',
                    templateUrl: templateUrl('Edit'),
                    controller: controllerName('Edit'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle editing an existing item
            whenEdit: function(resolveFns) {
                routeBuilder.when(baseRoute + '/:itemId', {
					label: routeLabels[2] || '',
                    templateUrl: templateUrl('Edit'),
                    controller: controllerName('Edit'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle viewing an existing item
            whenView: function(resolveFns) {
                routeBuilder.when(baseRoute + '/:itemId', {
					label: routeLabels[3] || '',
                    templateUrl: templateUrl('View'),
                    controller: controllerName('View'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Pass-through to `$routeProvider.when()`
            when: function(path, route) {
                $routeProvider.when(path, route);
                return routeBuilder;
            },
            // Pass-through to `$routeProvider.otherwise()`
            otherwise: function(params) {
                $routeProvider.otherwise(params);
                return routeBuilder;
            },
            // Access to the core $routeProvider.
            $routeProvider: $routeProvider
        };
        return routeBuilder;
    };
}

crudRouteProvider.$inject = ['$routeProvider'];

// Create our provider - it would be nice to be able to do something like this instead:
//
// ```
// angular.module('services.crudRouteProvider', [])
//   .configHelper('crudRouteProvider', ['$routeProvider, crudRouteProvider]);
// ```
// Then we could dispense with the $get, the $inject and the closure wrapper around all this.
angular.module('services.crudRouteProvider', ['ngRoute']).provider('crudRoute', crudRouteProvider);
angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

    var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
        return angular.extend({
            message: localizedMessages.get(msgKey, interpolateParams),
            type: type,
            classes: type
        }, otherProperties);
    };

    var I18nNotifications = {
        push:function (msgKey, type, interpolateParams, otherProperties) {
            return notifications.push(prepareNotification(msgKey, type, interpolateParams, otherProperties));
        },
        remove:function (notification) {
            return notifications.remove(notification);
        }
    };

    return I18nNotifications;
}]);
angular.module('services.localizedMessages', []).factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

    var handleNotFound = function (msg, msgKey) {
        return msg || '?' + msgKey + '?';
    };

    return {
        get : function (msgKey, interpolateParams) {
            var msg =  i18nmessages[msgKey];
            if (msg) {
                return $interpolate(msg)(interpolateParams);
            } else {
                return handleNotFound(msg, msgKey);
            }
        }
    };
}]);
angular.module('services.notifications', ['cgNotify'])
	.factory('notifications', ['$rootScope', 'notify', function ($rootScope, $notify) {

		var notifications = {
			'STICKY' : [],
			'ROUTE_CURRENT' : [],
			'ROUTE_NEXT' : []
		};
		var notificationsService = {};

		var addNotification = function (notificationsArray, notificationObj) {
			if (!angular.isObject(notificationObj)) {
				throw new Error("Only object can be added to the notification service");
			}
			$notify(notificationObj);
		};

		$rootScope.$on('$routeChangeSuccess', function () {

		});

		notificationsService.push = function(notification) {
			return addNotification(notifications.STICKY, notification);
		};

		notificationsService.remove = function(){

		};

		return notificationsService;
	}]);

angular.module('users', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',
        'show-errors',
        'users-edit-validateEmails'
    ])

//    .config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.when('/users', {
//            templateUrl:'js/app/users/users-list.tpl.html',
//            controller:'UsersViewCtrl',
//            resolve:{
//                users:['Users', function (Users) {
//                    return Users.all();
//                }]
//            }
//        });
//    }])
//
//    .controller('UsersViewCtrl', ['$scope', '$location', 'users',
//        function ($scope, $location, users) {
//            $scope.users = users;
//        }
//    ])
//
//    .factory('Users', ['dataResource',
//        function ($dataResource) {
//
//            var Users = $dataResource('users');
//
//            Users.forUser = function(userId, successcb, errorcb) {
//                //TODO: get projects for this user only (!)
//                return Projects.query({}, successcb, errorcb);
//            };
//
//            Users.prototype.isProductOwner = function (userId) {
//                return this.productOwner === userId;
//            };
//            Users.prototype.canActAsProductOwner = function (userId) {
//                return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
//            };
//            Users.prototype.isScrumMaster = function (userId) {
//                return this.scrumMaster === userId;
//            };
//            Users.prototype.canActAsScrumMaster = function (userId) {
//                return !this.isProductOwner(userId);
//            };
//            Users.prototype.isDevTeamMember = function (userId) {
//                return this.teamMembers.indexOf(userId) >= 0;
//            };
//            Users.prototype.canActAsDevTeamMember = function (userId) {
//                return !this.isProductOwner(userId);
//            };
//
//            Users.prototype.getRoles = function (userId) {
//                var roles = [];
//                if (this.isProductOwner(userId)) {
//                    roles.push('PO');
//                } else {
//                    if (this.isScrumMaster(userId)){
//                        roles.push('SM');
//                    }
//                    if (this.isDevTeamMember(userId)){
//                        roles.push('DEV');
//                    }
//                }
//                return roles;
//            };
//
//            return Users;
//        }
//    ]);



    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Users', '', '', 'js/app')
            .whenList({
                users: ['Users', function(Users) { return Users.all(); }]
            })
            .when('/users/page/:page', {
                templateUrl:'js/app/users/users-list.tpl.html',
                controller:'UsersListCtrl',
                resolve:{
                    users: ['$route', 'Users', function($route, Users) {
                        console.log($route.current.params.page);
                        return Users.query({page: 1});
                    }]
                }
            })
//            .whenList({
////                users: ['Users', function(Users) { return Users.all(); }]
//                users: ['$route', 'Users', function($route, Users) {
//                    console.log($route.current.params.page);
//                    return Users.query({page: 1});
//                }]
//            })
            .whenNew({
                user: ['Users', function(Users) { return new Users(); }]
            })
            .whenEdit({
                user:['$route', 'Users', function ($route, Users) {
                    return Users.getById($route.current.params.itemId);
                }]
            });
    }])

    .filter('startsWithLetter', function () {
        return function (items, search) {
            var filtered = [];

            if (items) {
                var searchMatch = new RegExp(search, 'i');

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    if (searchMatch.test(item.name) || searchMatch.test(item.email) ) {
                        filtered.push(item);
                    }
                }
                return filtered;
            }
            return filtered;
        };
    })

    .factory('Users', ['dataResource', function (dataResource) {

        var userResource = dataResource('users');

        userResource.prototype.getFullName = function () {
            return this.lastName + " " + this.firstName + " (" + this.email + ")";
        };

        return userResource;
    }])

    .controller('UsersListCtrl', ['$scope', 'crudListMethods', 'users', 'i18nNotifications',
        function ($scope, crudListMethods, users, i18nNotifications) {
            $scope.users = users;

            angular.extend($scope, crudListMethods('/users'));

            $scope.remove = function(user, $index, $event) {
                // Don't let the click bubble up to the ng-click on the enclosing div, which will try to trigger
                // an edit of this item.
                $event.stopPropagation();

                // Remove this user
                user.$remove(function() {
                    // It is gone from the DB so we can remove it from the local list too
                    $scope.users.splice($index,1);
                    i18nNotifications.pushForCurrentRoute('crud.user.remove.success', 'success', {id : user.$id()});
                }, function() {
                    i18nNotifications.pushForCurrentRoute('crud.user.remove.error', 'error', {id : user.$id()});
                });
            };

            $scope.sortField = undefined;
            $scope.reverse = false;

            $scope.sort = function(fieldName) {
                if($scope.sortField === fieldName) {
                    $scope.reverse = true;
                } else {
                    $scope.sortField = fieldName;
                    $scope.reverse = false;
                }
            };

            $scope.isSortUp = function(fieldName) {
                return $scope.sortField === fieldName && !$scope.reverse;
            };

            $scope.isSortDown = function(fieldName) {
                return $scope.sortField === fieldName && $scope.reverse;
            };
        }
    ])

    .controller('UsersEditCtrl', ['$scope', '$location', 'user', 'i18nNotifications',
        function ($scope, $location, user, i18nNotifications) {

            $scope.user = user;
//            $scope.password = user.password;

            $scope.onSave = function (user) {
                i18nNotifications.pushForNextRoute('crud.user.save.success', 'success', {id : user.$id()});
                $location.path('/users');
            };

            $scope.onError = function() {
                i18nNotifications.pushForCurrentRoute('crud.user.save.error', 'error');
            };

            $scope.onRemove = function(user) {
                i18nNotifications.pushForNextRoute('crud.user.remove.success', 'success', {id : user.$id()});
                $location.path('/users');
            };

        }
    ]);
angular.module('users-edit-validateEmails', [])

    /**
 * A validation directive to ensure that this model has the same value as some other
 */
    .directive('validateEmail', function() {
        return {
            require:'ngModel',
            restrict:'A',
            link: function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (re.test(viewValue)) {
                            ctrl.$setValidity('validateEmail', true);
                        } else {
                            ctrl.$setValidity('validateEmail', false);
                        }

                        return viewValue;
                    }
                });
            }
        };
    });