
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