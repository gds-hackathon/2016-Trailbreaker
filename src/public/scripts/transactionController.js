function TransactionContorller($scope, $http) {
    $scope.title = "Transaction";
    $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });

    $scope.submit = function () {
        var wid = getQueryVariable("wechat_id");
        $http.post("/api/transaction/wechat_id/"+wid+location.search, $scope.transaction)
            .then(function (response) {
                console.log(response);
            });

    };

    $scope.count = function (a, b, c) {
        return a*b +c;
    }

}