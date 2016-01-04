/* globals Dropbox, MessageOverlay, DropboxHistory, PDFViewerApplication */

var dropbox = new Dropbox.Client({ key: 'uvc3d21d69j51qv' });
var dropboxAppPath = '/Apps/Chimp';

window.onload = function() {
  MessageOverlay.open('Loading', true);

  dropbox.authenticate(function(err) {
    if (err || !dropbox.isAuthenticated()) {
      MessageOverlay.open('Unable to authenticate: ' + err);
    } else {
      DropboxHistory.list().then(function(files) {
        var file = files[0];

        if (!PDFViewerApplication.pdfDocument && file) {
          PDFViewerApplication.openDropboxFile(file);
        }
      });

      MessageOverlay.close();
    }
  });
};
