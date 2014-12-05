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