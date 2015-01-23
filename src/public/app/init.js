angular.element(document).ready(function () {
    window.deferredBootstrapper.bootstrap({
        element: document.getElementById('qlip'),
        module: 'qlip',
        resolve: {
            CONFIG: ['$http', function ($http) {
                return $http.get(window.location.pathname + 'api/config');
            }],
            Products: ['$http', function ($http) {
                return $http.get(window.location.pathname + 'api/products');
            }]
        }
    });
});
