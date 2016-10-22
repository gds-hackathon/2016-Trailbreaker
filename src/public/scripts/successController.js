function SuccessController($scope, $http) {

        var wid = getQueryVariable("wechat_id");
        console.log(wid);
        var url = location.href;
        console.log(url);
        $scope.src = url.replace('pages/transaction','api/transaction/qrcode') ;


}

