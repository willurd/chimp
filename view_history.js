/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals PDFJS, VIEW_HISTORY_MEMORY, Promise */

'use strict';

function extend(target /*, ...sources */) {
  var sources = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];

    if (source) {
      for (var key in source) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

/**
 * View History - This is a utility for saving various view parameters for
 *                recently opened files.
 *
 * The way that the view parameters are stored depends on how PDF.js is built,
 * for 'node make <flag>' the following cases exist:
 *  - FIREFOX or MOZCENTRAL - uses sessionStorage.
 *  - B2G                   - uses asyncStorage.
 *  - GENERIC or CHROME     - uses localStorage, if it is available.
 */
var ViewHistory = (function ViewHistoryClosure() {
  function ViewHistory(fingerprint) {
    this.fingerprint = fingerprint;
    this.path = '/Apps/pdf-viewer/' + fingerprint + '.json';
    this.cache = null;
    this.debouncedWrite = _.debounce(this._write.bind(this), 500);
  }

  ViewHistory.prototype = {
    _write: function() {
      if (!this.cache) {
        return;
      }

      dropbox.writeFile(this.path, JSON.stringify(this.cache), function(error, data) {
        if (error) {
          console.error('Error writing file:', error);
          return;
        }

        console.debug('Wrote file:', this.path, this.cache);
      }.bind(this));

      this.cache = null;
    },

    set: function ViewHistory_set(name, val) {
      this.cache = this.cache || {};
      this.cache[name] = val;

      return Promise.resolve();
    },

    setMultiple: function ViewHistory_setMultiple(properties) {
      this.cache = this.cache || {};
      extend(this.cache, properties);
      // for (var name in properties) {
      //   this.cache[name] = properties[name];
      // }
      this.debouncedWrite();

      return Promise.resolve();
    },

    get: function ViewHistory_get(defaults) {
      return new Promise(function(resolve, reject) {
        dropbox.readFile(this.path, function(error, data) {
          if (error) {
            if (error.response.responseText === 'File not found') {
              resolve(defaults);
            } else {
              console.error('Error reading file:', error);
              reject(error);
            }
          } else {
            console.debug('Read file:', this.path, JSON.parse(data));
            resolve(extend({}, defaults, JSON.parse(data)));
          }
        }.bind(this));
      }.bind(this));
    }
  };

  return ViewHistory;
})();
