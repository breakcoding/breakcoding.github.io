app.controller('placeCtrl', function ($scope, $http, $sce) {
    var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&';
    var credenciales = '&limit=10&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    var urlPhotos = 'https://api.foursquare.com/v2/venues/';
    var credencialesPhot = 'photos?v=20161016&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    $scope.results
    var index = 0;

    var onSearchData = function (response) {
        $scope.results = response.data.response.venues;
        $scope.results.photo = [];
        $scope.results.googleUrl = [];
        angular.forEach($scope.results, function(value, key) {
            $http.get(urlPhotos+value.id+"/"+credencialesPhot).then(onPhoto, onError);
            var google = 'https://www.google.com/maps/embed/v1/place?q='+ value.location.lat+','+ value.location.lng +'&key=AIzaSyAWGcEIE20vKJ3HfeZgSAiWHfsFFocOtk8';
            $scope.results.googleUrl.push({"urlGoogle": google});
        });
    }

    var onError = function () {
        $scope.error = "No se encontro ningun dato";
    }

    var onPhoto = function(response){
        var data = response.data.response.photos;
        if(data.count){
            var width = data.items[0].width;
            var heigth = data.items[0].height;
            var prefix = data.items[0].prefix;
            var suffix = data.items[0].suffix;
            var url = prefix+width+"x"+heigth+suffix;
            $scope.results.photo.push({"photoUrlG":url});
        }else{
            var url = 'https://csmmemoriahistorica.files.wordpress.com/2014/09/default-no-image.png';
            $scope.results.photo.push({"photoUrlG":url});
        }
    }

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }

    $scope.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    $scope.citySearch = function (query) {
        if (query.match(/_(\d)+$/)) {
            query = "ll=" + query;
        } else {
            query = "near=" + query;
        }
        $http.get(url + query + credenciales).then(onSearchData, onError);
    }
});