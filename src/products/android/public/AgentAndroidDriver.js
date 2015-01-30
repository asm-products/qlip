angular.module('qlip')

    .factory('AgentAndroidDriver', function ($q, Drivers) {
        var service;

        return service = _.extend({}, Drivers.getDriver(), {

            getConfigController: function () {
                return 'AgentAndroidDriverConfigCtrl';
            }

        });
    })

    .controller('AgentAndroidDriverConfigCtrl',  function ($q, $rootScope, $scope, $modalInstance, User, AgentLinuxDriver, thing, product) {

        if (!thing) {
            thing = {
                nickname: 'My ' + product.name,
                access_token: null
            };

            generateAccessToken().then(function (token) {
                thing.access_token = token;
            });
        }

        $scope.title = 'app.drivers.AGENT_ANDROID_CONFIG_MODAL';
        $scope.form = 'products/android/public/form.tpl.html';
        $scope.thing = thing;

        $scope.save = function () {
            $modalInstance.close(thing);
        };

        $scope.getNewAccessToken = function () {
            generateAccessToken().then(function (token) {
                thing.access_token = token;
            });
        };

        function generateAccessToken() {
            return $q.when(User.id + ':' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2));
        }
    })

;