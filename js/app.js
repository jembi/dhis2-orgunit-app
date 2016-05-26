'use strict'
/* global window */

var angular = require('angular')
require('angular-material')
require('angular-route')

var deps = [ 'ngRoute', 'ngMaterial' ]
// if this is running in dhis2
if (window.location.href.indexOf('api/apps') >= 0) {
  deps.push('d2HeaderBar')
}
// setup app
var app = angular.module('dhisOrgUnitApp', deps)

// register controllers - see controllers/index.js
require('./controllers')

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
    .otherwise({
      redirectTo: '/one'
    })
})
