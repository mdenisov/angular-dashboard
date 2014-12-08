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