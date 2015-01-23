angular.module('qlip')

    .config(function ($stateProvider) {
        $stateProvider

            // Things parent state
            .state('things', {
                abstract: true,
                url: '/things',
                template: '<ui-view />'
            })

            // Sub-states
            .state('things.list', {
                url: '/list',
                templateUrl: 'app/partials/things-list.tpl.html',
                controller: 'ThingsListCtrl'
            })

            .state('things.add', {
                url: '/add',
                templateUrl: 'app/partials/things-add.tpl.html',
                controller: 'ThingsAddCtrl'
            })

        ;
    })

    .controller('ThingsAddCtrl', function ($scope, $state, Restangular, toaster, Drivers) {
        var ProductsResource = Restangular.all('products');

        $scope.active = {
            category: null
        };

        $scope.products = [];
        $scope.categories = [];

        $scope.$watch('active.category', function (category) {
            $scope.busy = true;

            if (category && category.id) {
                ProductsResource.getList({category: category.id}).then(function (products) {
                    $scope.busy = false;
                    $scope.products = products;
                }, function (reason) {
                    $scope.busy = false;
                    toaster.pop('error', "Error", reason.statusText);
                });
            } else {
                ProductsResource.getList().then(function (products) {
                    $scope.busy = false;
                    $scope.products = products;
                }, function (reason) {
                    $scope.busy = false;
                    toaster.pop('error', "Error", reason.statusText);
                });
            }

        });

        $scope.addThing = function (product) {

            Drivers
                .createConfig(product)
                .then(function (thing) {
                    var things = Restangular.all('things');

                    $scope.busy = true;

                    things.post({
                        nickname: thing.nickname,
                        product: product.name,
                        config: thing.config
                    }).then(

                        // Successfully saved
                        function () {
                            $scope.busy = false;
                            toaster.pop('success', "Saved", "A new Thing has been added to Your things.");
                        },

                        // Failed to save
                        function () {
                            $scope.busy = false;
                            toaster.pop('error', "Failed", "Could not add a new Thing.");
                        }
                    );
                })
            ;
        };
    })

    .controller('ThingsListCtrl', function ($rootScope, $scope, Restangular, toaster, Drivers) {
        var ThingsResource = Restangular.all('things');

        $scope.busy = true;

        ThingsResource.getList().then(function(things){
            $scope.things = things;
            $scope.busy = false;
        }, function (reason) {
            $scope.busy = false;
            toaster.pop('error', "Error", reason.statusText);
        });

        $scope.remove = function (thing) {
            $scope.busy = true;

            thing.remove().then(function () {
                $scope.busy = false;
                $scope.things = _.without($scope.things, thing);
            });
        };

        $scope.settings = function (thing) {
            Drivers
                .changeConfig(thing)
                .then(function (newThingSettings) {
                    $scope.busy = true;

                    thing.patch({
                        nickname: newThingSettings.nickname,
                        config: newThingSettings.config
                    }).then(
                        // Successfully saved
                        function () {
                            $scope.busy = false;
                            toaster.pop('success', "Saved", "Thing settings has been saved.");
                        },

                        // Failed to save
                        function () {
                            $scope.busy = false;
                            toaster.pop('error', "Failed", "Could not save Thing settings.");
                        }
                    );
                })
            ;
        };
    })
;