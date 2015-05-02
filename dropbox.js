/* globals Dropbox, MessageOverlay, PDFViewerApplication, DEFAULT_DROPBOX_PATH */

var dropbox = new Dropbox.Client({ key: 'uvc3d21d69j51qv' });
var dropboxAppPath = '/Apps/Chimp';

window.onload = function() {
  MessageOverlay.open('Loading', true);

  dropbox.authenticate(function(err) {
    if (err || !dropbox.isAuthenticated()) {
      MessageOverlay.open('Unable to authenticate: ' + err);
    } else {
      MessageOverlay.close();

      if (DEFAULT_DROPBOX_PATH) {
        PDFViewerApplication.openDropboxPath(DEFAULT_DROPBOX_PATH);
      }
    }
  });
};
