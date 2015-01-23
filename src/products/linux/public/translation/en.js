angular.module('qlip')

// Configuring $translateProvider
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('en', {
        'linux': 'Linux Computer',
        'app.drivers.AGENT_LINUX_CONFIG_MODAL': 'Integrate Linux'
    });

}])

;
