function RegistrationContorller($scope,$http) {
    $scope.title = "User Registration";
  
    $scope.submit=function(){
 
        
        
        $http.post("/api/employee/register/"+$scope.registration.wechat_id,$scope.registration )
        .then(function (response) {
            alert(response);
        });

    };
}