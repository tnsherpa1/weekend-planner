var app = angular.module('wodApp', ['ui.router', 'ngResource']);
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
  return $resource('../api/events/:id', { id: '@_id' },
  {
    'update': { method:'PUT' }
  });

}

// CONTROLLER
HomeController.$inject = ['Event'];
function HomeController(Event) {
	console.log("controller called!")
	var vm = this;
  vm.events = Event.query();
  vm.event = {};
  console.log('hey',vm);
	vm.addEvent = function(){
		console.log("adding...");
		var newEvent = Event.save(vm.event);
    console.log("neweventshowinghere", newEvent);
		vm.event = {};
		vm.events.unshift(newEvent);
	}
}
