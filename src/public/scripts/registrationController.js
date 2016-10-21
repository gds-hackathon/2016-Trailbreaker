function RegistrationContorller($scope,$http,$window) {
    
    console.log("test2");
    $scope.submitForm=function(){
        var url = "/api/employee/register/wechat_id/"+getQueryVariable("wechat_id")+location.search;
        $http.post(url, $scope.registration )
        .success(function (response) {
            console.log(response);
            if(response.employee_key)
            {
                // var landingUrl = "/pages/transaction/wechat_id/"+getQueryVariable("wechat_id") + location.search;
                // $window.location.href = landingUrl;

                alert('Register successfully. Please wait HR to approve it. \r\n After approval, you can pay with discout.');
            }else if(response.status === 1){
                alert("You've already register, please go to message history and send 'discout' to get discount");
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

