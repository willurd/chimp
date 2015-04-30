/* globals _, Promise, dropbox, dropboxAppPath */

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
  historyFile: dropboxAppPath + '/history.json',
  maxItems: 100,
  listeners: null,

  initialize: function dropboxHistoryInitialize(options) {
    _.extend(DropboxHistory, options);

    DropboxHistory._listeners = [];
  },

  listen: function dropboxHistoryListen(callback) {
    var index = DropboxHistory._listeners.indexOf(callback);

    if (index === -1) {
      DropboxHistory._listeners.push(callback);
    }
  },

  unlisten: function dropboxHistoryListen(callback) {
    var index = DropboxHistory._listeners.indexOf(callback);

    if (index >= 0) {
      DropboxHistory._listeners.splice(index, 1);
    }
  },

  add: function dropboxHistoryAdd(item) {
    return DropboxHistory.list().then(function(list) {
      var currentIndex = _.findIndex(list, function(searchItem) {
        return searchItem.path === item.path;
      });

      if (currentIndex >= 0) {
        list.splice(currentIndex, 1);
      }

      list.unshift(item);
      list = list.slice(0, DropboxHistory.maxItems);

      return new Promise(function(resolve, reject) {
        dropbox.writeFile(DropboxHistory.historyFile, JSON.stringify(list), function(err, data) {
          if (err) {
            console.error('Error writing history file:', err);
            reject(err);
          } else {
            DropboxHistory._listeners.forEach(function(listener) {
              listener(list);
            });
            resolve();
          }
        });
      });
    });
  },

  list: function dropboxHistoryList() {
    return new Promise(function(resolve, reject) {
      dropbox.readFile(DropboxHistory.historyFile, function(err, data) {
        if (err) {
          if (err.response.error === 'File not found') {
            resolve([]);
          } else {
            console.error('Error reading history file:', err);
            reject(err);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }
};
