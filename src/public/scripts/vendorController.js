// VendorController.$inject = ['$scope','$http'];
// function VendorController($scope, $http) {
app.controller('VendorController', function ($scope, $http) {
    //Request vendor list
    $http.get("/api/vendor")
        .then(function (response) {
            $scope.vendors = response.data;
            $scope.vendors.selected = {};
        });

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (row) {
        if (row.vendor_key === $scope.vendors.selected.vendor_key) return 'edit';
        else return 'display';
    };

    $scope.editVendor = function (vendor) {
        $scope.vendors.selected = angular.copy(vendor);
    };

    $scope.saveVendor = function (idx) {
        console.log("index: " + idx);
        $scope.vendors[idx] = angular.copy($scope.vendors.selected);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.vendors.selected = {};
    };

});

