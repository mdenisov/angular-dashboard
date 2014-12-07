angular.module('resources.topic', [])
	.factory('Topic', ['dataResource',
		function ($dataResource) {

			var Topic = $dataResource('topic');

			return Topic;
		}
	]);