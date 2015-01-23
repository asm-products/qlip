angular.module('qlip')

    .directive('uiButterbar', function() {
        return {
            restrict: 'AC',
            template:'<span class="bar"></span>',
            link: function(scope, el, attrs) {
                el.addClass('butterbar hide');

                if (attrs.uiButterbar) {
                    scope.$watch(attrs.uiButterbar, function (newValue) {
                        if (newValue) {
                            el.removeClass('hide').addClass('active');
                        } else {
                            el.addClass('hide').removeClass('active');
                        }
                    });
                }
            }
        };
    })

;