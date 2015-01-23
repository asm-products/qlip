angular.module('qlip', [
    'ui.router',
    'restangular',
    'toaster',
    'ui.bootstrap',
    'pascalprecht.translate',
    'monospaced.qrcode'
])
    .config(function ($locationProvider, $urlRouterProvider, $translateProvider, RestangularProvider) {
        // By default go to things list
        $urlRouterProvider.otherwise('/things/list');

        // Set current url as API base url
        RestangularProvider.setBaseUrl(window.location.pathname + 'api');

        $translateProvider.preferredLanguage('en');

        $locationProvider.html5Mode(false);
    })

;