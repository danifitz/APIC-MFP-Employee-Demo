// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var ibmApp = angular.module('ibmApp', ['ionic'])

// Add support for Cordova.
ibmApp.run(function($ionicPlatform) {
  console.log('>> ibmApp.run ...');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the access
    //ory bar above the keyboard
    // for form inputs)
    console.log('>> ibmApp.ready ...');
    if (window.cordova &&
      window.cordova.plugins &&
      window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// application config.
ibmApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // $urlRouterProvider - letting us specifsy the default route when loading the module
    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'partials/employee.html',
        controller: 'mainCtrl',
        resolve: {
          employees: function(EmployeeService) {
            return EmployeeService.getEmployeeList();
          }
        }
      })

    .state('splash', {
      url: '/',
      /* default url */
      templateUrl: 'pages/splash.html',
      controller: 'splashCtrl'
    })

    .state('detail', {
      url: '/detail/:empId',
      templateUrl: 'partials/details.html',
      controller: 'employeeDetailCtrl',
      resolve: {
        employeeDetailList: function($stateParams, EmployeeService) {
          return EmployeeService.getEmployeeById($stateParams.empId);
        },
        empId: function($stateParams) {
          return $stateParams.empId;
        }
      }
    })
  }) // end of app config.
  // Add MobileFirst configuration stuff.
var Messages = {
  // Add here your messages for the default language.
  // Generate a similar file with a language suffix containing the translated messages.
  // key1 : message1,
};

var wlInitOptions = {
  // Options to initialize with the WL.Client object.
  // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

function wlCommonInit() {
  console.log(">> wlCommonInit() ...");
  var serverUrl = WL.App.getServerUrl(function(success) {
    console.log(success);
  }, function(fail) {
    console.log(fail);
  })

  //Calling to the MobileFirst Server
  WLAuthorizationManager.obtainAccessToken().then(
    function(accessToken) {
      console.log(">> Success - Connected to MobileFirst Server");
    },
    function(error) {
      console.log(">> Failed to connect to MobileFirst Server");
    }
  );

  WL.Analytics.send();
}
