angular.module('resources.settings', [])
	.factory('Settings', ['dataResource',
		function ($dataResource) {

			var Settings = $dataResource('settings');

			return Settings;
		}
	]);