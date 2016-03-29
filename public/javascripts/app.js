var app = angular.module('wodApp', ['ui.router', 'ngResource']);
app.config(config);
app.factory('Wod', WodFactory);
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
WodFactory.$inject = ['$resource'];
function WodFactory($resource) {
  // $resource gives you built in CRUDy functions like: save, query, remove, update
  return $resource('../api/Wods/:id', { id: '@_id' },
  {
    'update': { method:'PUT' }
  });

}

// CONTROLLER
HomeController.$inject = ['Wod'];
function HomeController(Wod) {
	console.log("controller called!")
	var vm = this;
  vm.wods = Wod.query();
  vm.wod = {};
  console.log('hey',vm);
	vm.addWod = function(){
		console.log("adding...");
		var newWod = Wod.save(vm.wod);
    console.log("newWodshowinghere", newWod);
		vm.wod = {};
		vm.wods.unshift(newWod);
	}
	vm.removeWod = function(wod){
		console.log("removing...");
		Wod.remove({ id: wod._id });
		var WodIndex = vm.wods.indexOf(wod);
		console.log(WodIndex);
		vm.wods.splice(WodIndex, 1);

	}
}
