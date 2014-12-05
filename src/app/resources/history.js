angular.module('resources.history', [])
	.factory('History', ['dataResource',
		function ($dataResource) {

			var History = $dataResource('news');

			return History;
		}
	]);