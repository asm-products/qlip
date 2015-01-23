angular.module('qlip')

    .factory('AgentAndroidDriver', function ($q, Drivers) {
        var service;

        return service = _.extend({}, Drivers.getDriver(), {

            getConfigController: function () {
                return 'AgentAndroidDriverConfigCtrl';
            }

        });
    })

    .controller('AgentAndroidDriverConfigCtrl',  function ($q, $rootScope, $scope, $modalInstance, AgentLinuxDriver, thing, product) {

        if (!thing) {
            thing = {
                nickname: 'My ' + product.name,
                config: {
                    token: null
                }
            };

            generateToken().then(function (token) {
                thing.config.token = token;
            });
        }

        $scope.title = 'app.drivers.AGENT_ANDROID_CONFIG_MODAL';
        $scope.form = 'products/android/public/form.tpl.html';
        $scope.thing = thing;

        $scope.save = function () {
            $modalInstance.close(thing);
        };

        $scope.getNewToken = function () {
            generateToken().then(function (token) {
                thing.config.token = token;
            });
        };

        function generateToken() {
            return $q.when(Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2));
        }
    })

;