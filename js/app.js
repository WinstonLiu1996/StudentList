//In Webstorm: alt+cmd+L for auto indentation
//Step1 App
var myApp = angular.module('student', []);

//Step2 API
var host = 'http://student.webdxd.com/api/';

//Step3 Controller
//1 app can have multiple controllers

/* Controller inject two services:
 $http
 $scope(TODO scope范围：整个controller；此处写完后，可以直接在html里access 其所直属的Belongings (functions & variables))
 */

/* $http作用:
 Restful call: get/put/post/del
 */

/* $scope作用：
 $scope is an application object
 All FUNCTIONS and VARIABLES are belongings of $scope
 e.g. $scope.getStudentInDetail (function); $scope.students (variable)
 */

/* TODO notice: Write AngularJS function 语法格式
 $scope.getStudentInDetail = function(var){...}
 */

myApp.controller('studentController', function ($http, $scope) {

    $scope.students = [];

    //function1 show all students
    $http.get(host + 'student/').success(function (response) {

        //TODO Notice: GET response: student fields + _id
        console.log(response);

        $scope.students = response;
    });

    //function2 show detail of clicked student (GET)
    $scope.getStudentInDetail = function (sid) {
        $http.get(host + 'student/' + sid).success(function (response) {
            $scope.clickedStudent = response;
        });
    };

    //function3 go to add
    $scope.addStudent = function () {
        $scope.clickedStudent = undefined;
        $scope.newStudent = undefined;
    };

    //function4 add (POST)
    $scope.createNewStudent = function () {

        console.log($scope.newStudent);

        //TODO Notice: this is API (cloud) side: Data structure between newStudent (no id) and POST response[i] (has id) are different.

        //TODO Question ???: why Array: students can automatically update an existing element???
        $http.post(host + 'student/', $scope.newStudent).success(function (response) {

            //TODO Notice: POST response: data: {student fields + _id}, isNew: boolean
            console.log(response);

            //judge whether the student already exist; if exist (edit) => update, else push
            if (response.isNew) {
                //TODO Notice: this is $scope (local) side
                $scope.students.push(response.data);
            }

            $scope.clickedStudent = response.data;
            $scope.newStudent = undefined;
        });
    };

    //function5 edit (PUT)
    $scope.editStudent = function () {
        //Angular double-binding
        $scope.newStudent = $scope.clickedStudent;
        $scope.clickedStudent = undefined;
    };

    //function6 delete (DEL)
    $scope.deleteStudent = function (sid) {
        $http.delete(host + 'student/' + sid).success(function(response){
            //TODO Notice: DEL response: student fields + _id
            console.log(response);

            for (var i=0; i<$scope.students.length; i++){
                if ($scope.students[i]._id === response._id) {
                    //slice function (start pos, delete amount)
                    $scope.students.splice(i, 1);
                    $scope.clickedStudent = undefined;
                }
            }
        });
    }

});



