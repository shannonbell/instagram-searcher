angular.module('myApp',['ngAnimate'])
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })

    .controller('MyCtrl', function($scope, $http) {


        $scope.showSearchTerm = false;
        $scope.showResultCount = false;
        $scope.showError = false;

        $scope.submit = function() {

            var searchTerm = $scope.searchTerm;

            if( $scope.instagramSearcherForm.$valid ) {


                $scope.searchTermText =  $scope.searchTerm;
                $scope.searchTerm = '';
                $scope.showSearchTerm = true;
                $scope.showError = false;

                var url = "https://api.instagram.com/v1/tags/"+searchTerm+"/media/recent";
                var request = {
                    callback: 'JSON_CALLBACK',
                    client_id: '0be06bb38dbb47618fdbb3a646b6bb96'
                };

                $http({
                    method: 'JSONP',
                    url: url,
                    params: request
                })
                .success(function(result) {
                    $scope.instagrams = result;
                    $scope.showSearchTerm = false;
                    $scope.showResultCount = true;
                })
                .error(function() {
                    $scope.showSearchTerm = false;
                    $scope.showResultCount = false;
                    $scope.showError = true;
                });
            }
        }

    });