'use strict'

module.exports = function ($scope) {
  console.log("I'm controller one")
  $scope.text = ''

  $scope.click = function () {
    console.log('Ah, yeah! Here is you text: ' + $scope.text)
  }

  $scope.clear = function () {
    $scope.text = ''
  }
}
