
function EmployeeContorller($scope,employeeService) {
    $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
        });
    $scope.name =employeeService.myFunc(15);
}