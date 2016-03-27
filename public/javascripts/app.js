var app = angular.module('weekendPlanner', ['ui.router']);

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, urlRouterProvider, locationProvider) {
	console.log('config');
	//this allows us to use routes without hash params
$locationProvider.html5Mode ({
	enabled: true,
	requireBase: false
});

$urlRouterProvider.otherwise('/');

$stateProvider
.state ('home',{
	url: "/",
	controller: "HomeController",
	controllerAs: 'Home',
	template: 'home!'
});

app.controller('HomeController', HomeController);
function HomeController(){
	vm = this;
	vm.test = "Welcome to my test page";
}

}
