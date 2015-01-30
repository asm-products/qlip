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
            }],
            User: ['$http', function ($http) {
                return $http.get(window.location.pathname + 'api/user');
            }]
        },
        onError: function (error) {
            alert('Could not bootstrap, error: ' + error);
        }
    }).then(function () {
        // TODO Sometimes our app will not bootstrap when user is coming back from Google OAuth,
        // TODO we should fix this work around in future.
        if (window.location.hash == '') {
            window.location.hash = '#/things/list';
            window.location.reload();
        }
    });
});
