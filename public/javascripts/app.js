var app = angular.module('weekendApp', ['ui.router', 'ngResource']);
app.config(config);
app.factory('Event', EventFactory);
app.controller('HomeController', HomeController);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
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
	templateUrl: 'templates/home.html',
	controller: 'HomeController',
	controllerAs: 'Home'
});
}

// FACTORY
EventFactory.$inject = ['$resource'];
function EventFactory($resource) {
  // $resource gives you built in CRUDy functions like: save, query, remove, update
  return $resource('api/events/:id', { id: '@_id' },
  {
    'update': { method:'PUT' }
  });

}

// CONTROLLER
HomeController.$inject = ['Event'];
function HomeController(Event) {
	console.log("controller called!")
	vm = this;
	vm.test = "Welcome to my test page";
}
