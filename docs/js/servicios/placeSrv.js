app.service('placeService', function ($http) {
    var urlNew = 'https://api.foursquare.com/v2/venues/search?v=20161016&';
    var search = '&intent=checkin&radius=7000&categoryId=';
    var credential = '&limit=20&client_id=YR1ALEYFHABZHNQMPN0IPR1GCHT0BLHH1UIAEYNINF41EIX3&client_secret=02WWTLZWCOKS4YYPZM23MX5Z14YMI5CATH0NG4G4YRF5TFI3';


    this.getPlaces = function (query, category, onSearchData, onError) {
        // $http.get('/js/models/actividades.json').then(callback);
        $http.get(urlNew + query + search + category + credential).then(onSearchData, onError);
    }
});