
//function EmployeeContorller($scope, $http) {
app.controller('EmployeeContorller', function($scope, $http) {
    // chart data source
    $scope.dataSource = {
        "chart": {
            "caption": "Column Chart Built in Angular!",
            "captionFontSize": "30"
            // more chart properties - explained later
        },
        "data": [{
            "label": "CornflowerBlue",
            "value": "42"
        }, //more chart data
        ]
    };

    $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });



});