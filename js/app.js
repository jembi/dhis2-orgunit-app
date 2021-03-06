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
    .when('/hierarchy', {
      templateUrl: 'views/hierarchy.html',
      controller: 'hierarchyCtrl'
    })
    .when('/add-site', {
      templateUrl: 'views/add-site.html',
      controller: 'AddSiteCtrl'
    })
    .when('/match', {
      templateUrl: 'views/match.html',
      controller: 'MatchCtrl'
    })
    .otherwise({
      redirectTo: '/hierarchy'
    })
})
