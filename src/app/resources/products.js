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