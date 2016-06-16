// Application controllers.

ibmApp.controller('appCtrl', function($scope) {
  $scope.logout = function() {
    console.log(">> in appCtrl >> logout ... ");
    $scope.user = {
      username: "",
      password: ""
    };
  }
})

ibmApp.controller('jobCtrl', ['$scope', function($scope) {
}])

ibmApp.controller('mainCtrl', ['$scope', 'employees', '$ionicPopup', function(
  $scope, employees, $ionicPopup) {
  console.log(">> in mainCtrl ... ");

  //display an error popup
  $scope.showErrorPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: '401 Unauthorised',
      template: employees.moreInformation
    });
    alertPopup.then(function(res) {
      console.log('>> Thank you for trying ...');
    });
  }

  /*
     we've had an unauthorised HTTP response due to app being disabled
     in APIC
   */
  if (employees.httpCode == 401) {
    $scope.showErrorPopup();
  } else {
    $scope.employees = employees;
  }

  var event = {
    viewLoad: 'Employee List View'
  };
  WL.Analytics.log(event, 'Employee List View - Loaded');

}])


/* controller.js */
ibmApp.controller('employeeDetailCtrl', ['$scope', 'EmployeeService',
'employeeDetailList', 'empId', '$ionicHistory', function($scope,
  EmployeeService, employeeDetailList, empId, $ionicHistory) {

  $scope.employee = {
    "first_name": "",
    "last_name": "",
    "id": ""
  }
  $scope.employeeDetails = {}
  console.log(">> in - employeeDetailCtrl:" + employeeDetailList);
  //Employee service cached the list of employee
  $scope.employee = EmployeeService.getEmployeeById(empId);

  var event = {
    viewLoad: 'Employee detail View'
  };
  WL.Analytics.log(event, 'Employee detail View - Loaded');
  WL.Analytics.send();

}])

ibmApp.controller('splashCtrl', ['$scope', '$stateParams', '$timeout', '$state',
  'AuthenticateUserService', '$ionicPopup',
  function($scope, $stateParams,
    $timeout, $state, AuthenticateUserService, $ionicPopup) {
    console.log(">> splashCtrl - ... ");
    $scope.user = {
      username: "",
      password: ""
    }
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
      code[i].addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }

    $scope.doLogin = function() {
      console.log(">> loginCtrl - $scope.user:" + $scope.user);
      /* Validation service of user name and password */
      AuthenticateUserService.authenticatUser($scope.user).then(function(success) {
        console.log(">> AuthenticateUserService.authenticatUser -> success: " + success);
        $state.transitionTo('main');
      }, function(failed) {
        console.log(">> AuthenticateUserService.authenticatUser -> failed: " + failed);
        //Notify user wrong username and password.
        $scope.showLoginError();
      });
    }

    //show alert login error ...
    $scope.showLoginError = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Error!',
        template: 'Please check your username and password and try again'
      });
      alertPopup.then(function(res) {
        console.log('>> Thank you for trying ...');
      });
    };

    $scope.doShowLogin = function() {
      console.log(">> SplashCtrl - doShowLogin() ... ");
      $scope.hideSplashBox();
    }

    $scope.moveSplashBox = function() {
      var splashNextBox = document.getElementById('splash-next-box');
      move(splashNextBox).ease('in-out').y(-415).duration('0.5s').end();
    };

    $scope.hideSplashBox = function() {
      var splashNextBox = document.getElementById('splash-next-box');
      move(splashNextBox).ease('in-out').y(415).duration('0.5s').end(
        function() {
          console.log(">>> showLogin ... ");
          var loginBox = document.getElementById('login-box');
          move(loginBox).ease('in-out').y(-415).duration('0.5s').end();
        }
      );
    };

    $timeout(function() {
      //fix android bug where render splash screen incorrect.
      var splashNextBox = document.getElementById('splash-next-box');
      var loginBox = document.getElementById('login-box');
      splashNextBox.style.display = 'block';
      loginBox.style.display = 'block';
      var event = {
        viewLoad: 'Splash view'
      };
      if (WL != null && WL != undefined) {
        WL.Analytics.log(event, 'Splash view loaded!');
      }
    }, 415);

    $timeout(function() {
      $scope.moveSplashBox();
    }, 3000);

  }
])
