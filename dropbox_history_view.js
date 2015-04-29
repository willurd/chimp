/* globals DropboxHistory, PDFViewerApplication */

var DropboxHistoryView = {
  initialize: function dropboxHistoryViewInitialize(options) {
    DropboxHistoryView.container = options.container;
    DropboxHistory.listen(DropboxHistoryView.onHistoryChange);
  },

  reset: function dropboxHistoryViewReset() {
    var container = DropboxHistoryView.container;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  },

  render: function dropboxHistoryViewRender() {
    var container = DropboxHistoryView.container;

    DropboxHistory.list().then(function(files) {
      DropboxHistoryView.reset();

      files.forEach(function(file) {
        var div = document.createElement('div');
        div.className = 'dropboxHistoryItem';
        var element = document.createElement('a');
        element.href = '#';

        element.onclick = function openPdfFile(e) {
          PDFViewerApplication.openDropboxFile(file);
          return false;
        };

        element.textContent = file.name;
        div.appendChild(element);
        container.appendChild(div);
      });
    });
  },

  onHistoryChange: function dropboxHistoryViewOnHistoryChange(list) {
    DropboxHistoryView.render();
  }
};
