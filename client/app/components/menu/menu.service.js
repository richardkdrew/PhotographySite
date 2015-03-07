(function () {
  'use strict';
  angular
    .module('app.menu')
    .factory('menuService', menuService);

  menuService.$inject = ['$q', 'dataService'];

  function menuService($q, dataService) {

    var self = this;
    self.menuItems = [{"name": "About", "link": "/about"}];

    var service = {
      getMenuItems: getMenuItems

    };
    return service;

    function getMenuItems() {
      var deferred = $q.defer();

      dataService.getTags().then(getTagsComplete, getTagsFailed);

      function getTagsComplete(data) {
        addMenuItems(data);
        deferred.resolve(self.menuItems);
      }

      function getTagsFailed(data, code) {
        console.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function addMenuItems(tags) {
      // Add the all tags menu item
      var allItem = {"name": "All", "link": "/pictures/all"};
      self.menuItems.push(allItem);

      for (var i = 0; i < tags.length; i++) {
        var item = {"name": tags[i].name, "link": "/pictures/" + tags[i].name};
        self.menuItems.push(item);
      }
    }
  }
})();
