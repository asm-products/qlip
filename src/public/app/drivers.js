angular.module('qlip')

    .factory('StandardDriver', function ($q) {
        return {

            setup: function () {
                return $q.when();
            },

            getConfigController: function () {
                return 'StandardDriverConfigCtrl';
            }

        };
    })

    .controller('StandardDriverConfigCtrl', function ($rootScope, $scope, $q, $modalInstance, thing, product) {

        if (!thing) {
            thing = {
                nickname: 'My ' + product.name
            };
        }

        $scope.title = 'Settings';
        $scope.thing = thing;

        $scope.save = function () {
            $modalInstance.close(thing);
        };

    })

    .factory('Drivers', function ($injector, $modal, $q, StandardDriver, Products) {
        var service;

        return service = {

            getDriver: function (subject) {
                var driver;

                if (typeof subject === 'object') {

                    // If it's a Product instance
                    if (typeof subject.driver === 'string') {
                        subject =  subject.driver;
                    }

                    // If it's Thing instance
                    else if (typeof subject.product === 'object' && typeof subject.product.driver === 'string') {
                        subject = subject.product.driver;
                    }
                }

                if ($injector.has(subject)) {
                    driver = $injector.get(subject);
                }

                if (!driver) {
                    driver = StandardDriver;
                }

                return driver;
            },

            modalConfig: function (driverName, resolveArray) {
                var deferred = $q.defer(),
                    driver = $injector.get(driverName);

                if (!driver) {
                    driver = StandardDriver;
                }

                driver.setup().then(function () {

                    var modalInstance = $modal.open({
                        templateUrl: 'app/partials/product-config.tpl.html',
                        controller: driver.getConfigController(),
                        size: 'lg',
                        resolve: resolveArray
                    });

                    modalInstance.result.then(function (config) {
                        deferred.resolve(config);
                    }, function () {
                        deferred.reject();
                    });

                });

                return deferred.promise;
            },

            createConfig: function (product) {

                return service.modalConfig(service.findDriver(product), {
                    thing: _.noop,
                    product: function () { return product; }
                });

            },

            changeConfig: function (thing) {

                return service.modalConfig(service.findDriver(thing), {
                    thing: function () { return thing; },
                    product: function () { return thing.product; }
                });

            },
            
            findDriver: function (subject) {
                var i = 0, c;

                if (subject) {
                    if (typeof subject === 'string') {
                        for (i = 0, c = Products.length; i < c; i++) {
                            if (Products[i].name === subject) {
                                if (Products[i].driver) {
                                    return Products[i].driver;
                                } else {
                                    return 'StandardDriver';
                                }
                            }
                        }
                    }

                    if (typeof subject === 'object') {
                        if (subject.product) {
                            return service.findDriver(subject.product);
                        }

                        if (subject.driver) {
                            return subject.driver;
                        }
                    }
                }

                return 'StandardDriver';
            }
        };
    })

;