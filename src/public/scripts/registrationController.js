function RegistrationContorller($scope,$http,$window) {
    
    console.log("test2");
    $scope.submitForm=function(){
       
        $http.post("/api/employee/register/"+getQueryVariable("wechat_id")+location.search,$scope.registration )
        .success(function (response) {
            console.log(response);
            if(response.employee_key!=0)
            {
            var landingUrl="/pages/transaction/wechat_id/"+getQueryVariable("wechat_id")+"/"+response.employee_key+location.search;
            $window.location.href = landingUrl
            }
            else{
                alert("please retry");
            }
        }).error(function(message)
        {
            alert("please retry")
             console.log(response);
        });

    };
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return "";
}

