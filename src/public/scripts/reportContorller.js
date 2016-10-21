
var app = angular.module('HelloApp', ["ng-fusioncharts"])
app.controller('ReportContorller', function ($scope) {
    $scope.type = "column2d";
    $scope.width = 600;
    $scope.chartoptions = {
        "containerBackgroundColor": "#FF0000",
        "containerBackgroundOpacity": "0"
    };
    $scope.dataSource = {
    "chart": {
        "caption": "Monthly",
        "xaxisname": "Month",
        "yaxisname": "Revenue",
        "numberprefix": "$",
        "showvalues": "1",
        "theme": "fint"
    },
    "data": [
        {
            "label": "Jan",
            "value": "420000"
        },
        {
            "label": "Feb",
            "value": "910000"
        },
        {
            "label": "Mar",
            "value": "720000"
        },
        {
            "label": "Apr",
            "value": "550000"
        },
        {
            "label": "May",
            "value": "810000"
        },
        {
            "label": "Jun",
            "value": "510000"
        },
        {
            "label": "Jul",
            "value": "680000"
        },
        {
            "label": "Aug",
            "value": "620000"
        },
        {
            "label": "Sep",
            "value": "610000"
        },
        {
            "label": "Oct",
            "value": "490000"
        },
        {
            "label": "Nov",
            "value": "530000"
        },
        {
            "label": "Dec",
            "value": "330000"
        }
    ],
    "trendlines": [
        {
            "line": [
                {
                    "startvalue": "700000",
                    "istrendzone": "1",
                    "valueonright": "1",
                    "tooltext": "AYAN",
                    "endvalue": "900000",
                    "color": "009933",
                    "displayvalue": "Target",
                    "showontop": "1",
                    "thickness": "5"
                }
            ]
        }
    ],
    "styles": {
        "definition": [
            {
                "name": "CanvasAnim",
                "type": "animation",
                "param": "_xScale",
                "start": "0",
                "duration": "1"
            }
        ],
        "application": [
            {
                "toobject": "Canvas",
                "styles": "CanvasAnim"
            }
        ]
    }
};
  
$scope.changeOpacity = function () {
        $scope.chartoptions.containerBackgroundOpacity = "" + (Math.round(Math.random() * 10) / 10);
    };
    $scope.changeWidth = function () {
        $scope.width = 300;
    }

});