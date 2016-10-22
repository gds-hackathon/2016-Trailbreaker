function TransactionContorller($scope, $http) {
    $scope.title = "Transaction";
    $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });

    $scope.submit = function () {
        var wid = getQueryVariable("wechat_id");
        $http.post("/api/transaction/wechat_id/" + wid + location.search, $scope.transaction)
            .then(function (res) {
                console.log(res);
                if (res.data.transaction_key > 0) {
                    location.href = "/pages/transaction/wechat_id/" + wid + "/" +
                        res.data.transaction_key + location.search;
                }
                else
                    location.href = "/error";
            });

    };

    $scope.count = function (a, b, c) {
        return a * b + c;
    }

}