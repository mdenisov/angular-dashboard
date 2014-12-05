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