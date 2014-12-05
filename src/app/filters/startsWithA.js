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