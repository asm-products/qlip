angular.module('qlip')

// Configuring $translateProvider
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('en', {
        'app.product.android': 'Android Device',
        'app.drivers.AGENT_ANDROID_CONFIG_MODAL': 'Integrate Android Device'
    });

}])

;
