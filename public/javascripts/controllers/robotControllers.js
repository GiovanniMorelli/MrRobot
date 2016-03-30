mrRobot.controller('manageRobot', function ($scope, $timeout,$log) {
    $scope.onlyNumbers = /^\d+$/;
    $scope.onlyCoord = /^[l|r|f]*$/i;

    var model = this;
    model.submit = function(isValid) {

        //dimension Grid
        if (isValid) {
            var iterator=0;
            $scope.compass = ['N','E','S','W'];
            //reset check position
            $scope.checkPosition=true;
            console.log("Start==>"+$scope.gridXPosition+","+$scope.gridYPosition+$scope.lastHeading,$scope.checkPosition==false?"LOST":"");
            for(iterator=0;iterator<$scope.instructions.length;iterator++){
                addMove($scope.instructions[iterator],$scope);
                checkPosition($scope);
                if($scope.checkPosition==false){
                    break;
                }
            }
            //print last position
            console.log("End==>"+$scope.gridXPosition+","+$scope.gridYPosition+$scope.lastHeading,$scope.checkPosition==false?"LOST":"");
            $("#resultMrRobot").text($scope.gridXPosition+","+$scope.gridYPosition+$scope.lastHeading);
            if($scope.checkPosition==false){
                $("#resultLostMrRobot").text("LOST");
            }

        } else {
            console.log("invalid")
        }
    };
});
//this method add move to Robot
function addMove(instruction,$scope){
        var currentHeading = $.inArray($scope.lastHeading,$scope.compass);
    if(instruction.match(/l/i)){
        turn(-1,currentHeading,$scope);
    }else if(instruction.match(/r/i)){
        turn(1,currentHeading,$scope);
    }else if(instruction.match(/f/i)){
        move($scope);
    }
    console.log($scope.gridXPosition+","+$scope.gridYPosition+$scope.lastHeading,$scope.checkPosition==false?"LOST":"");
}
//this method turn the robot
function turn(dir,currentHeading,$scope){
    var currentHeadingNumber = currentHeading + dir;
    if (currentHeadingNumber < 0){
        currentHeadingNumber= 3;
    }
    else if (currentHeadingNumber > 3){
        currentHeadingNumber = 0;
    }
    $scope.lastHeading = $scope.compass[currentHeadingNumber];
}
//this method check if the Robot is out of grid
function checkPosition($scope){

    if(parseInt($scope.gridXPosition)>parseInt($scope.gridX) || parseInt($scope.gridXPosition)<0 || parseInt($scope.gridYPosition)>parseInt($scope.gridY) || parseInt($scope.gridYPosition)<0){
        $scope.checkPosition=false;
    }
}
//this method move the Robot on the grid
function move($scope){
    if($scope.lastHeading.match(/n/i)){
        $scope.gridYPosition=parseInt($scope.gridYPosition);
        $scope.gridYPosition++;
        $scope.gridYPosition=$scope.gridYPosition+"";

    }else if($scope.lastHeading.match(/e/i)){
        $scope.gridXPosition= parseInt($scope.gridXPosition);
        $scope.gridXPosition++;
        $scope.gridXPosition= $scope.gridXPosition+"";

    }else if($scope.lastHeading.match(/s/i)){
        $scope.gridYPosition=parseInt($scope.gridYPosition);
        $scope.gridYPosition--;
        $scope.gridYPosition=$scope.gridYPosition+"";
    }else if($scope.lastHeading.match(/w/i)){
        $scope.gridXPosition=parseInt($scope.gridXPosition);
        $scope.gridXPosition--;
        $scope.gridXPosition=$scope.gridXPosition+"";
    }
}