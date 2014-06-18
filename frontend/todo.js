function TodoCtrl($scope, $http) {
  $http.get('http://localhost:3333/todos').success(function(data) {
    $scope.todos = data;
  });

  $scope.addTodo = function() {
    var newTodo = {text:$scope.todoText, done:false};
    $http.post('http://localhost:3333/todos', newTodo, {headers: {'Content-Type': 'application/json'}}).success(function() {
      $scope.todos.push(newTodo);
      $scope.todoText = '';
    });
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}
