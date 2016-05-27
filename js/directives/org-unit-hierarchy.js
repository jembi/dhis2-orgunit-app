'use strict'

module.exports = function() {
  return{
    restrict: 'EA',
    //scope: {
      //selectedOrgUnit: '='
    //},
    templateUrl: 'views/partials/org-unit-hierarchy.html',
    link: function(scope) {
      scope.hello = 'hello!'
    }
  }
}
