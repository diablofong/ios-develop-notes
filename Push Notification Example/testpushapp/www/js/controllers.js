angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaPush, $cordovaDialogs, $cordovaMedia) {
  $ionicPlatform.ready(function() {
    $scope.register();
  });

  //register devicetoken
  $scope.register = function() {
    var config = null;

    config = {
      "badge": "true",
      "sound": "true",
      "alert": "true"
    }

    $cordovaPush.register(config).then(
      function(result) {
        console.log("Register success " + result);
        $scope.regId = result;
      },
      function(error) {
        console.log("Register error " + error)
      })
  };

  // Notification Received
  $scope.$on('$cordovaPush:notificationReceived', function(event, notification) {
    console.log(notification);
    
    if (ionic.Platform.isIOS()) {
      handleIOS(notification);
      $scope.$apply(function () {
          $scope.notifications = notification.alert;
      })
    }
  });

  // IOS Notification Received Handler
  function handleIOS(notification) {
    if (notification.foreground == "1") {

      if (notification.alert) {
        $cordovaDialogs.alert(notification.alert, "Push Notification Received");
      }

    }else {
      $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
    }
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});