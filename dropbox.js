/* globals Dropbox, MessageOverlay */

var dropbox = new Dropbox.Client({ key: 'uvc3d21d69j51qv' });

window.onload = function() {
  MessageOverlay.open('Loading', true);

  dropbox.authenticate(function(err) {
    if (err || !dropbox.isAuthenticated()) {
      MessageOverlay.open('Unable to authenticate: ' + err);
    } else {
      MessageOverlay.close();
    }
  });
};
