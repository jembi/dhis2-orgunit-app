'use strict'

var angular = require('angular')
require('angular-material')
require('angular-route')

// setup app
var app = angular.module('dhisOrgUnitApp', [ 'ngRoute', 'ngMaterial' ])

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
