app.controller('placeCtrl', function ($scope, $http, $sce) {
    var urlNew = 'https://api.foursquare.com/v2/venues/search?v=20161016&';
    var search = '&intent=checkin&radius=7000&categoryId=';
    var credential = '&limit=20&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    //No sirve porque las imagenes que saca son fotos que no muestran el lugar en si porque los mexicanos no nos tomamos fotos del lugar pero si funcionaba
    var urlPhotos = 'https://api.foursquare.com/v2/venues/';
    var credencialesPhot = 'photos?v=20161016&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';

    //Metodo para obtener los lugares por una ubicacion lat-lng o nombre de la ciudad atravez de una categoria
    $scope.citySearch = function (query, category) {
        console.log(query, category)
        if (query.match(/_(\d)+$/)) {
            query = "ll=" + query;
        } else {
            query = "near=" + query;
        }
        $http.get(urlNew + query + search + category + credential).then(onSearchData, onError);
    };

    //Sirve para mantener el tipo de orden de los resultados
    $scope.resultSortBy = "+name";
    //Las categorias con los id que me da foursquare para cada categoria
    $scope.categories = [{
        name: 'Todos',
        value: '4bf58dd8d48988d111941735,4bf58dd8d48988d16a941735,4bf58dd8d48988d1e0931735,52e81612bcbc57f1066b79f4,4bf58dd8d48988d16c941735,4bf58dd8d48988d16c941735,4bf58dd8d48988d1c1941735,4bf58dd8d48988d1ca941735,4bf58dd8d48988d1ce941735'
    }, {
        name: 'Restaurante japonés',
        value: '4bf58dd8d48988d111941735'
    }, {
        name: 'Panadería',
        value: '4bf58dd8d48988d16a941735'
    }, {
        name: 'Cafetería',
        value: '4bf58dd8d48988d1e0931735'
    }, {
        name: 'Buffet',
        value: '52e81612bcbc57f1066b79f4'
    }, {
        name: 'Hamburguesería',
        value: '4bf58dd8d48988d16c941735'
    }, {
        name: 'Restaurante mexicano',
        value: '4bf58dd8d48988d1c1941735'
    }, {
        name: 'Pizzería',
        value: '4bf58dd8d48988d1ca941735'
    }
        , {
        name: 'Marisquería',
        value: '4bf58dd8d48988d1ce941735'
    }];

    //Callback para comenzar a meter los resultados de la busqueda en el scope
    var onSearchData = function (response) {
        $scope.results = response.data.response.venues;
        $scope.results.photo = [];
        $scope.results.googleUrl = [];
        angular.forEach($scope.results, function (value, key) {
           // $http.get(urlPhotos + value.id + "/" + credencialesPhot).then(onPhoto, onError);
            var google = 'https://www.google.com/maps/embed/v1/place?q=' + value.location.lat + ',' + value.location.lng + '&key=AIzaSyAWGcEIE20vKJ3HfeZgSAiWHfsFFocOtk8';
            $scope.results.googleUrl.push({ "urlGoogle": google });
        });
    }

    var onError = function () {
        $scope.error = "No se encontro ningun dato";
    }

    //DEPRECIADO
    //Callback que obtenia las fotos de los lugares que obtenia de su base de datos
    var onPhoto = function (response) {
        var data = response.data.response.photos;
        if (data.count) {
            var width = data.items[0].width;
            var heigth = data.items[0].height;
            var prefix = data.items[0].prefix;
            var suffix = data.items[0].suffix;
            var url = prefix + width + "x" + heigth + suffix;
            $scope.results.photo.push({ "photoUrlG": url });
        } else {
            var url = 'https://csmmemoriahistorica.files.wordpress.com/2014/09/default-no-image.png';
            $scope.results.photo.push({ "photoUrlG": url });
        }
    }

    //Hacia que la url que pasaba al iframe de google maps fuera segura y bien "parseada"
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    //Metodo que me dejaba saber si el objeto del scope estaba vacio antes de mostrar los resultados
    $scope.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
});