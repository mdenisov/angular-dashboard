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