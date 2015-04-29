/* globals _ */

/**
 * This manages a history of the recently-read PDFs from Dropbox.
 *
 * An item has the following structure:
 *
 *   {
 *     bytes: int,
 *     icon: string,
 *     is_dir: boolean,
 *     link: string, // Full path
 *     name: string, // File name
 *     path: string  // Path relative to Dropbox root
 *   }
 */
var DropboxHistory = {
  storageKey: 'dropboxHistory',
  maxItems: 10,
  listeners: null,

  initialize: function dropboxHistoryInitialize(options) {
    if (!DropboxHistory.isSupported()) {
      return;
    }

    _.extend(DropboxHistory, options);

    DropboxHistory._listeners = [];
  },

  isSupported: function dropboxHistoryIsSupported() {
    return typeof localStorage !== 'undefined';
  },

  listen: function dropboxHistoryListen(callback) {
    DropboxHistory._listeners.push(callback);
  },

  unlisten: function dropboxHistoryListen(callback) {
    var index = DropboxHistory._listeners.indexOf(callback);

    if (index >= 0) {
      DropboxHistory._listeners.splice(index, 1);
    }
  },

  add: function dropboxHistoryAdd(item) {
    if (!DropboxHistory.isSupported()) {
      return;
    }

    var list = DropboxHistory.list();
    var currentIndex = _.findIndex(list, function(searchItem) {
      return searchItem.path === item.path;
    });

    if (currentIndex >= 0) {
      list.splice(currentIndex, 1);
    }

    list.unshift(item);
    list = list.slice(0, DropboxHistory.maxItems);
    localStorage.setItem(DropboxHistory.storageKey, JSON.stringify(list));

    DropboxHistory._listeners.forEach(function(listener) {
      listener(list);
    });
  },

  list: function dropboxHistoryList() {
    if (!this.isSupported()) {
      return [];
    } else {
      var list = localStorage.getItem(DropboxHistory.storageKey);
      list = list && JSON.parse(list);
      return list || [];
    }
  }
};
