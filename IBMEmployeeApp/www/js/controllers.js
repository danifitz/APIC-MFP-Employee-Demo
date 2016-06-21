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

ibmApp.controller('jobsCtrl', function($scope, jobs) {
  console.log('in jobsCtrl')
  $scope.jobs = jobs;
});

ibmApp.controller('MapCtrl', function($scope, job) {

  console.log('in map ctrl');

  $scope.initialise = function() {
    console.log('google maps init')
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.map = map;
  }
  google.maps.event.addDomListener(document.getElementById('map'), 'load', $scope.initialise());
})

ibmApp.controller('jobDetailCtrl', function($scope, $ionicLoading, $compile,
  jobId, JobService, $ionicPopup) {

  $scope.job = JobService.getJobById(jobId)

  $scope.sendNotification = function() {
    $ionicPopup.alert({
      title: 'Notification sent',
      template: 'The customer has been notified you are on your way using ' +
      'preferred contact method'
    });
    alertPopup.then(function(res) {
      console.log('>> Alert dismissed');
    });
  }
})

ibmApp.controller('SignatureCtrl', function($scope, JobService, jobId, $state) {
  console.log('sigpad ready');
  $scope.jobId = jobId;
  console.log('job id is ', $scope.jobId)
  //User Variables
  var canvasWidth = 400; //canvas width
  var canvasHeight = 60; //canvas height
  var canvas = document.getElementById('canvas'); //canvas element
  var context = canvas.getContext("2d"); //context element
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var paint;

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseXY, false);
  document.body.addEventListener("mouseup", mouseUp, false);

  //For mobile
  canvas.addEventListener("touchstart", mouseDown, false);
  canvas.addEventListener("touchmove", mouseXY, true);
  canvas.addEventListener("touchend", mouseUp, false);
  document.body.addEventListener("touchcancel", mouseUp, false);

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas

    context.strokeStyle = "#000000"; //set the "ink" color
    context.lineJoin = "miter"; //line join
    context.lineWidth = 2; //"ink" width

    for (var i = 0; i < clickX.length; i++) {
      context.beginPath(); //create a path
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]); //move to
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]); //move to
      }
      context.lineTo(clickX[i], clickY[i]); //draw a line
      context.stroke(); //filled with "ink"
      context.closePath(); //close path
    }
  }

  //Save the Sig
  $("#saveSig").click(function saveSig() {
    var sigData = canvas.toDataURL("image/png");
    $("#imgData").text(sigData);
  });

  //Clear the Sig
  $('#clearSig').click(
    function clearSig() {
      clickX = new Array();
      clickY = new Array();
      clickDrag = new Array();
      context.clearRect(0, 0, canvas.width, canvas.height);
      $("#imgData").html('');
    });

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  function mouseXY(e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      draw();
    }
  }

  function mouseUp() {
    paint = false;
  }

  function mouseDown(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    draw();
  }

  $scope.finishJob = function() {
    JobService.removeJob($scope.jobId)
    $state.go('jobs')
  }
})

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
  'employeeDetailList', 'empId', '$ionicHistory',
  function($scope,
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

  }
])

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
      console.log(">> loginCtrl - $scope.user: " + $scope.user.username);
      /* Validation service of user name and password
         Having auth is slowing me down!!!
       */
      // AuthenticateUserService.authenticatUser($scope.user).then(function(success) {
      //   console.log(">> AuthenticateUserService.authenticatUser -> success: " + success);
      //   $state.transitionTo('main');
      // }, function(failed) {
      //   console.log(">> AuthenticateUserService.authenticatUser -> failed: " + failed);
      //   //Notify user wrong username and password.
      //   $scope.showLoginError();
      // });
      $state.transitionTo('jobs')
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
