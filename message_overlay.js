/* globals PDFJS, mozL10n, OverlayManager */

'use strict';

var MessageOverlay = {
  overlayName: null,
  message: null,
  spinner: null,

  initialize: function(options) {
    this.overlayName = options.overlayName;
    this.message = options.message;
    this.spinner = options.spinner;

    OverlayManager.register(this.overlayName, this.close.bind(this), true);
  },

  open: function passwordPromptOpen(content, showSpinner) {
    return OverlayManager.open(this.overlayName).then(function () {
      this.message.innerHTML = content;
      this.spinner.style.display = showSpinner ? 'block' : 'none';
    }.bind(this));
  },

  close: function passwordPromptClose() {
    return OverlayManager.close(this.overlayName);
  },

};
