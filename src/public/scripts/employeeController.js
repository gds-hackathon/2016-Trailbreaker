
//function EmployeeContorller($scope, $http) {
app.controller('EmployeeContorller', function ($scope, $http) {

    $scope.load = function () {
        $http.get("/api/employee")
            .then(function (response) {
                $scope.employees = response.data;
            });
    }

    $scope.approve = function (employee) {
        var data = employee;
        data.is_approved = 1;
        data.is_enabled = 1;
        console.log(data);
        $http.post("/api/employee/updatestatus", data)
            .then(function (res) {
                if (res.data.status == 0) {
                    console.log(res.data);
                    alert('Approve successfully');
                    $scope.load();
                }
                else {
                    console.log(res);
                    console.log("Approve failed");
                }
            });
    }

});