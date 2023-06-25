# AngularJS

## Change Detection

### $scope.$digest()
```javascript
$scope.$digest();
```
- manually trigger a digest cycle for a specific scope
- checks for changes in the scope and its child scopes, updating the view accordingly

### $scope.$apply():
```javascript
$scope.$apply(function() {
    // Update model or perform other operations
});
```
- manually trigger the AngularJS digest cycle, forcing change detection.
- useful whenupdating the model from outside of AngularJS


## $scope.$watch():
```javascript
$scope.$watch('property', function(newVal, oldVal) {
    // Watch for changes in property
});
```
- monitor changes in a specific property

### ng-model
```html
<input ng-model="propertyName">
{{ propertyName }}
```
- binds an input element to a property in the model

### One-time binding:
```html
{{::propertyName}}
```
- bind a value to the view that won't be updated after its initial assignment

### $timeout():
```javascript
$timeout(function() {
    // Update model or perform other operations
});
```
- schedule code execution on the next digest cycle



## Directives

### Built in directives

| Directive         | Description                                                        | Example Usage                                                               |
| ----------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| ng-app            | Defines the root element of an AngularJS application               | `<html ng-app="myApp">`                                                     |
| ng-controller     | Binds a controller to a view or an element                         | `<div ng-controller="myController">`                                        |
| ng-model          | Binds the value of an HTML control to a variable                   | `<input type="text" ng-model="name">`                                       |
| ng-bind           | Binds the content of an HTML element to an expression              | `<span ng-bind="name"></span>`                                              |
| ng-repeat         | Loops over a collection and creates a copy of a template           | `<li ng-repeat="item in items">{{ item }}</li>`                             |
| ng-show / ng-hide | Shows or hides an element based on a condition                     | `<div ng-show="isVisible">Visible content</div>`                            |
| ng-if             | Conditionally renders or removes an element                        | `<div ng-if="condition">Rendered if condition is true</div>`                |
| ng-click          | Executes a function on element click                               | `<button ng-click="doSomething()">Click me</button>`                        |
| ng-disabled       | Disables an element based on a condition                           | `<input type="text" ng-disabled="isDisabled">`                              |
| ng-class          | Dynamically applies CSS classes based on a condition               | `<div ng-class="{ 'highlight': isActive }">`                                |
| ng-form           | Creates a form and attaches validation behavior                    | `<form ng-submit="submitForm()" name="myForm">`                             |
| ng-submit         | Specifies the function to be executed on form submission           | `<form ng-submit="submitForm()">`                                           |
| ng-options        | Populates a dropdown/select element with options from a collection | `<select ng-model="selectedItem" ng-options="item.name for item in items">` |
| ng-init           | Initializes a variable or property with a value                    | `<div ng-init="count = 0">`                                                 |
| ng-include        | Includes an external HTML file or template                         | `<div ng-include="'template.html'">`                                        |

### Custom Directives

Directive Definition Object (DDO)
   ```javascript
   app.directive('directiveName', function() {
     return {
       restrict: 'E', // Directive restriction (E: Element, A: Attribute, C: Class, M: Comment)
       scope: {
         // Isolated scope properties
       },
       templateUrl: 'template.html', // Path to the template file
       link: function(scope, element, attrs) {
         // Link function
       }
     };
   });
   ```

Restricting Directive Usage
   - Element Directive:
     ```html
     <directive-name></directive-name>
     ```
   - Attribute Directive:
     ```html
     <div directive-name></div>
     ```
   - Class Directive:
     ```html
     <div class="directive-name"></div>
     ```
   - Comment Directive:
     ```html
     <!-- directive: directive-name -->
     ```

Isolated Scope
   - '@': One-way binding (string)
   - '=': Two-way binding (object)
   - '&': Expression execution

Link Function
   ```javascript
   link: function(scope, element, attrs) {
     // Manipulate the DOM, register event listeners, etc.
   }
   ```

Controller
   ```javascript
   controller: function($scope) {
     // Directive controller logic
   }
   ```

Pre-Link and Post-Link Functions
   ```javascript
   link: {
     pre: function(scope, element, attrs) {
       // Executed before child elements are linked
     },
     post: function(scope, element, attrs) {
       // Executed after child elements are linked
     }
   }
   ```

Transclusion
Allows to include arbitrary content within a directive's template (pass content from the parent scope into the template).
   ```html
   <div ng-transclude></div>
   ```

```html
<directive-name>
<!-- Transcluded content here -->
</directive-name>
```

Include the 'app' module name with the `directive()` function if you're defining the directives in a separate file.

## Routing

### State Definition
```javascript
$stateProvider.state('stateName', {
    url: '/stateUrl',
    templateUrl: 'path/to/template.html',
    controller: 'ControllerName',
    resolve: {
        // Resolve dependencies before transitioning to state
        dependencyName: function(dependencyService) {
            return dependencyService.getData();
        }
    },
    params: {
        // Define optional parameters
        paramName: null
    }
});
```

### State Transitions
```javascript
$state.go('stateName', { paramName: value }); // Transition to a state with optional parameters
$state.transitionTo('stateName', { paramName: value }); // Alternative syntax for transitioning to a state
$state.reload(); // Reload the current state
$state.includes('stateName'); // Check if the current state includes a specific state
```

### State Events
```javascript
$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // Handle state change start event
});

$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    // Handle state change success event
});

$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
    // Handle state not found event
});

$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // Handle state change error event
});
```

### URL Routing
```javascript
$urlRouterProvider.otherwise('/defaultRoute'); // Define a default route if no matching state is found
$urlRouterProvider.when('/oldUrl', '/newUrl'); // Redirect from old URL to new URL
```

### Accessing Parameters
```javascript
$stateParams.paramName; // Access parameter value in the controller
```