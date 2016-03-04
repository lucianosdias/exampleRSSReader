// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'xml', 'angularMoment'])

    .run(function ($ionicPlatform, amMoment) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }            
        });
        
        amMoment.changeLocale('pt-br');
    })
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');

        $stateProvider
            .state('lista', {
                url: '/',
                templateUrl: 'templates/lista.html',
                controller: 'FeedsController'
            });

        $urlRouterProvider.otherwise('/');
    })
    .controller('FeedsController', function ($scope, $http, $ionicLoading) {
        function init() {
            $ionicLoading.show();
            $http.get("http://baguete.com.br/rss/noticias/feed")
                .then(function (data) {
                    $scope.entries = data.data.rss.channel.item;
                    window.localStorage["entries"] = JSON.stringify(data.data.rss.channel.item);
                    $ionicLoading.hide();
                }, function (error) {
                    console.log(error);
                    if (window.localStorage["entries"] !== undefined) {
                        $scope.entries = JSON.parse(window.localStorage["entries"]);
                    }
                });
        };

        $scope.browse = function (v) {
            window.open(v, "_system", "location=yes");
        };

        init();
    });
