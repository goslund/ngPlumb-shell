// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['ngResource', 'ngRoute'])
.controller('appController', function($scope) {
})
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);
	console.log("config");
	io.emit("routes");
	io.on("routes", function(data) {
		console.log(app._router);
	})
	$routeProvider
	  	.when('/', {
	    	templateUrl: 'html/views/home/home.html', 
	    	controller: 'HomeController'
	  	})
	  	.when('/about', {
		  	templateUrl: 'html/views/about/about.html',
		  	controller: 'AboutController'
		})
	  	.otherwise({redirectTo: '/'});
	}
]);
