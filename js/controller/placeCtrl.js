app.controller('placeCtrl', function ($scope, $http) {
    var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&';
    var credenciales = '&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    var urlPhotos = 'https://api.foursquare.com/v2/venues/';
    var credencialesPhot = 'photos?v=20161016&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    $scope.results
    var index = 0;

    var onSearchData = function (response) {
        $scope.results = response.data.response.venues;
        $scope.results.photo = [];

        console.log($scope.results[0]);

        //$http.get(urlPhotos+$scope.results[0].id+"/"+credencialesPhot).then(onPhoto, onError);

        // angular.forEach($scope.results, function(value, key) {
        //     $http.get(urlPhotos+value.id+"/"+credencialesPhot).then(onPhoto, onError);
        // });
    }

    var onError = function () {
        $scope.error = "No se encontro ningun dato";
    }

    var onPhoto = function(response){
        // console.log(response.data.response.photos);
        var photo = {
            photoUrlG: ""
        };
        var data = response.data.response.photos;
        if(data.count){
            var width = data.items[0].width;
            var heigth = data.items[0].height;
            var prefix = data.items[0].prefix;
            var suffix = data.items[0].suffix;
            photo.photoUrlG = prefix+width+"x"+heigth+suffix;
            //  $scope.results.get(index).push(photo);
             console.log( $scope.results);
             index = index + 1;
        }else{
            var url = 'http://mxcdn.ar-cdn.com/recipes/xlarge/nophoto.svg';
            index = index + 1;
            // $scope.results.photo.push({"photoUrlG": url});
        }
         
    }

    $scope.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    //   ll=25.556867399999998%2C%20-103.415072&query=coffee&intent=checkin&

    $scope.citySearch = function (query) {
        if (query.match(/_(\d)+$/)) {
            query = "ll=" + query;
        } else {
            query = "near=" + query;
        }
        // console.log(query);
        $http.get(url + query + credenciales).then(onSearchData, onError);
    }
});