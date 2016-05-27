'use strict'
/* global window */

var angular = require('angular')
require('angular-material')
require('angular-route')
require('angular-resource')

var deps = [ 'ngRoute', 'ngMaterial', 'ngResource' ]
// if this is running in dhis2
if (window.location.href.indexOf('api/apps') >= 0) {
  deps.push('d2HeaderBar')
}
// setup app
var app = angular.module('dhisOrgUnitApp', deps)

// register modules - see {module}/index.js
require('./controllers')
require('./directives')
require('./services')

app.config(function ($routeProvider) {
  $routeProvider
    .when('/one', {
      templateUrl: 'views/one.html',
      controller: 'oneCtrl'
    })
    .when('/two', {
      templateUrl: 'views/two.html',
      controller: 'twoCtrl'
    })
    .when('/hierarchy', {
      templateUrl: 'views/hierarchy.html',
      controller: 'hierarchyCtrl'
    })
    .otherwise({
      redirectTo: '/one'
    })
})
