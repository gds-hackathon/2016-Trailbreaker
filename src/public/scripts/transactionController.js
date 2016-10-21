function TransactionContorller($scope,$http) {
    $scope.title = "Transaction";
        $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });

   $scope.submit=function(){
        $http.post("/api/transaction",$scope.transaction )
        .then(function (response) {
            console.log(response);
        });

    };
}