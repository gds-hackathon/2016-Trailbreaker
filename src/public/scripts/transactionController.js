function TransactionContorller($scope,$http) {
    $scope.title = "Transaction";
        $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });
}