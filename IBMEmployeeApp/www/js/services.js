
//application services for employee, employee details, and authetication service.

ibmApp.factory("EmployeeService", function($http){
    console.log( ">> in EmployeeService ...");
    var employees = [];
    var resourceRequest = new WLResourceRequest(
        "/adapters/EmployeeAdapter/services/list", WLResourceRequest.GET
    );
    return {
        getEmployeeList: function(){
            return resourceRequest.send().then(function(response){
                employees = response.responseJSON;
                return employees;
            }, function(error){
                console.log("error: ", error);
                return error;
            });
        },
        getEmployee: function(index){
            return employees[index];
        },
        getEmployeeById: function(id){
            var _emp;
            angular.forEach(employees, function(emp) {
              console.log(">> getEmployeeById :" + id + " ==  " + emp.id );
              if(emp.id == id){ _emp = emp; }
            });
            return _emp;
        }
    };
})

/* will be used to validate the username and password */
ibmApp.factory("AuthenticateUserService", function ($http, $q) {
    console.log(">> in AuthenticateUserService ...");
    return {
        authenticatUser: function (user) {
            // Perform some asynchronous operation, resolve or reject the promise when appropriate.
            /* Will be replace with MFP WLResource Request to autenticate using back end*/
            // set the deferred
            var deferred = $q.defer();
            setTimeout(function() {
                if(user.username == "demo" && user.password == "demo"){
                   deferred.resolve(true);
                }else{
                   deferred.reject(false);
                }
            });
            // return the deferred promise
            return deferred.promise;
        }
    };
})
