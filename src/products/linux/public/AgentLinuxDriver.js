angular.module('qlip')

    .factory('AgentLinuxDriver', function ($q, Drivers) {
        var service;

        return service = _.extend({}, Drivers.getDriver(), {

            getConfigController: function () {
                return 'AgentLinuxDriverConfigCtrl';
            }

        });
    })

    .controller('AgentLinuxDriverConfigCtrl',  function ($q, $rootScope, $scope, $modalInstance, User, AgentLinuxDriver, thing, product) {

        if (!thing) {
            thing = {
                nickname: 'My ' + product.name,
                access_token: null
            };

            generateAccessToken().then(function (token) {
                thing.access_token = token;
            });
        }

        $scope.title = 'app.drivers.AGENT_LINUX_CONFIG_MODAL';
        $scope.form = 'products/linux/public/form.tpl.html';
        $scope.thing = thing;

        $scope.save = function () {
            $modalInstance.close(thing);
        };

        $scope.getNewAccessToken = function () {
            thing.access_token = Math.random();
            generateAccessToken().then(function (token) {
                thing.access_token = token;
            });
        };

        function generateAccessToken() {
            return $q.when(User.id + ':' + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2));
        }
    })

;